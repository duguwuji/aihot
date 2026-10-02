#!/usr/bin/env bash
# Compute Engine startup script for a dedicated Debian 13 VM. No secrets in metadata.
set -euo pipefail
umask 077

if [[ -f /opt/rfidhot/.gcp-ready ]]; then
  exit 0
fi

export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y ca-certificates curl git python3

metadata() {
  curl --fail --silent --show-error --retry 5 \
    -H 'Metadata-Flavor: Google' \
    "http://metadata.google.internal/computeMetadata/v1/instance/attributes/$1"
}
domain=$(metadata rfidhot-domain)
revision=$(metadata rfidhot-revision)
[[ "$domain" =~ ^[a-z0-9]([a-z0-9.-]*[a-z0-9])?$ ]] || exit 1
[[ "$revision" =~ ^[0-9a-f]{40}$ ]] || exit 1

install -m 0755 -d /etc/apt/keyrings
curl --fail --silent --show-error --retry 5 \
  https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
chmod 0644 /etc/apt/keyrings/docker.asc
. /etc/os-release
cat > /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/debian
Suites: ${VERSION_CODENAME}
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
systemctl enable --now docker

# Bound container logs on the small persistent disk.
if [[ ! -f /etc/docker/daemon.json ]]; then
  printf '%s\n' '{"log-driver":"local","log-opts":{"max-size":"10m","max-file":"3"}}' > /etc/docker/daemon.json
  systemctl restart docker
fi

# Swap gives image builds headroom; it is not a replacement for VM memory.
if [[ ! -f /swapfile ]]; then
  fallocate -l 2G /swapfile
  chmod 0600 /swapfile
  mkswap /swapfile
fi
if ! swapon --show=NAME --noheadings | grep -qx /swapfile; then
  swapon /swapfile
fi
if ! grep -q '^/swapfile ' /etc/fstab; then
  printf '%s\n' '/swapfile none swap sw 0 0' >> /etc/fstab
fi

if [[ ! -d /opt/rfidhot/.git ]]; then
  git clone https://github.com/duguwuji/rfidhot.git /opt/rfidhot
fi
cd /opt/rfidhot
git fetch origin "$revision"
git checkout --detach "$revision"

if [[ ! -f .env ]]; then
  python3 - "$domain" <<'PY'
import os
import secrets
import sys
from pathlib import Path

values = {
    "SITE_URL": f"https://{sys.argv[1]}",
    "ADMIN_PASSWORD": secrets.token_urlsafe(18),
    "SESSION_SECRET": secrets.token_hex(32),
    "IMG_PROXY_SIGN_SECRET": secrets.token_hex(32),
    "POSTGRES_PASSWORD": secrets.token_hex(24),
    "TRUST_PROXY": "true",
    "COLLECT_ENABLED": "false",
    "MODEL_CALLS_ENABLED": "false",
    "FEISHU_CONTENT_PUSH_ENABLED": "false",
    "FEISHU_INTERNAL_ENABLED": "false",
    "INDEXNOW_SUBMIT_ENABLED": "false",
}
lines = Path(".env.example").read_text().splitlines()
for i, line in enumerate(lines):
    key = line.partition("=")[0]
    if key in values:
        lines[i] = f"{key}={values[key]}"
lines += [f"SITE_DOMAIN={sys.argv[1]}", "PORT=127.0.0.1:3000"]
with open(".env", "x") as env:
    os.chmod(".env", 0o600)
    env.write("\n".join(lines) + "\n")
PY
fi

docker compose --profile https up -d --build
for attempt in $(seq 1 60); do
  if curl --fail --silent http://127.0.0.1:3000/api/health >/dev/null; then
    docker compose exec -T web node scripts/smoke.ts --base http://127.0.0.1:3000
    touch .gcp-ready
    printf '%s\n' 'RFID Hot is running. Collection and model calls remain disabled until configured.'
    exit 0
  fi
  sleep 5
done
printf '%s\n' 'RFID Hot health check failed; inspect docker compose logs.' >&2
exit 1
