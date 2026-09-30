// Worker process: queues and schedules for collection, processing, events, reports, monitors and ops.
import { assertProductionSecrets } from "@rfidhot/backend/config";
import { FEATURES } from "@rfidhot/industry/features";
import { closeDb, sql } from "@rfidhot/backend/db";
import { getBoss, stopBoss } from "@rfidhot/backend/jobs/queue";
import { registerContentJobs } from "@rfidhot/backend/jobs/content";
import { registerSourceJobs } from "@rfidhot/backend/jobs/sources";
import { registerEventJobs } from "@rfidhot/backend/jobs/events";
import { registerNotifyJobs } from "@rfidhot/backend/jobs/notify";
import { registerPublicationJobs } from "@rfidhot/backend/jobs/publication";
import { registerSchedules } from "./schedules.ts";
import { ensureContentTargets } from "@rfidhot/backend/notify/deliver";
import { startHeartbeat } from "@rfidhot/backend/operations/heartbeat";

assertProductionSecrets([["auth", "IMG_PROXY_SIGN_SECRET"]]);

await ensureContentTargets();
const boss = await getBoss();
await registerContentJobs(boss);
if (process.env.COLLECT_ENABLED !== "false") await registerSourceJobs(boss);
await registerEventJobs(boss);
await registerNotifyJobs(boss);
await registerPublicationJobs(boss);
await registerSchedules(boss);
// A new site has no leaderboard until the first scheduled round: compute one now.
if (FEATURES.leaderboard) {
  const [published] = await sql`SELECT 1 FROM lb_runs WHERE status = 'published' LIMIT 1`;
  if (!published) await boss.send("cron.leaderboard.round", {}, { singletonKey: "first-round" });
}
const heartbeat = startHeartbeat("worker");
console.log(JSON.stringify({ level: "info", msg: "worker started", pid: process.pid }));

let stopping = false;
const shutdown = async () => {
  if (stopping) return;
  stopping = true;
  console.log(JSON.stringify({ level: "info", msg: "worker stopping" }));
  clearInterval(heartbeat);
  await stopBoss();
  await closeDb();
  process.exit(0);
};
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
