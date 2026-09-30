import "./setup.ts";
import assert from "node:assert/strict";
import http from "node:http";
import { readFileSync } from "node:fs";
import { after, test } from "node:test";
import { config } from "@rfidhot/backend/config";
import { closeDb, sql } from "@rfidhot/backend/db";
import { stopBoss } from "@rfidhot/backend/jobs/queue";
import { collectSource, scheduleDueSources } from "@rfidhot/backend/sources/collect";
import { tag } from "./setup.ts";

const T = tag();
const migration = readFileSync(new URL("../database/migrations/0039_six_hour_collection.sql", import.meta.url), "utf8");
const server = http.createServer((_req, res) => {
  res.writeHead(200, { "content-type": "application/rss+xml" });
  res.end('<?xml version="1.0"?><rss version="2.0"><channel><title>Quiet source</title></channel></rss>');
});
await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
const feedUrl = `http://127.0.0.1:${(server.address() as { port: number }).port}/feed.xml`;
config.allowPrivateNetworkFetch = true;

after(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
  await stopBoss();
  await closeDb();
});

test("the interval migration reschedules existing collectors without changing external sources", async () => {
  const rollback = new Error("rollback migration fixtures");
  await assert.rejects(sql.begin(async (tx) => {
    const recent = new Date(Date.now() - 3600_000);
    const old = new Date(Date.now() - 8 * 3600_000);
    const pending = new Date(Date.now() + 60_000);
    const ids = ["rss", "web_list", "json_list", "x_search", "mp_account"];
    for (const kind of ids) {
      await tx`INSERT INTO sources (id, name, kind, interval_minutes, last_fetch_at, next_fetch_at)
        VALUES (${`${kind}-${T}`}, ${kind}, ${kind}, 30, ${kind === "rss" ? old : kind === "mp_account" ? null : recent}, ${pending})`;
    }
    await tx`INSERT INTO sources (id, name, kind, interval_minutes, next_fetch_at)
      VALUES (${`external-${T}`}, 'External', 'external', 90, ${pending})`;
    await tx.unsafe(migration);
    const fixtureIds = [...ids.map((kind) => `${kind}-${T}`), `external-${T}`];
    const rows = await tx<{ id: string; kind: string; interval_minutes: number; next_fetch_at: Date }[]>`
      SELECT id, kind, interval_minutes, next_fetch_at FROM sources WHERE id = ANY(${fixtureIds}::text[])`;
    assert.equal(rows.length, 6);
    for (const row of rows) {
      assert.equal(row.interval_minutes, row.kind === "external" ? 90 : 360);
      if (row.kind === "external" || row.kind === "mp_account") assert.equal(row.next_fetch_at.getTime(), pending.getTime());
      else if (row.kind === "rss") assert.ok(Math.abs(row.next_fetch_at.getTime() - Date.now()) < 5000, "overdue sources remain due");
      else assert.equal(row.next_fetch_at.getTime(), recent.getTime() + 6 * 3600_000);
    }
    throw rollback;
  }), (error) => error === rollback);
});

test("a successful collection waits six hours and the minute scheduler does not fetch it early", async () => {
  const id = `rss-six-hour-${T}`;
  const [created] = await sql<{ interval_minutes: number }[]>`
    INSERT INTO sources (id, name, kind, config, cursor)
    VALUES (${id}, 'Six-hour RSS', 'rss', ${sql.json({ feedUrl })}, ${sql.json({ initializedAt: new Date().toISOString() })})
    RETURNING interval_minutes`;
  assert.equal(created!.interval_minutes, 360, "new rows default to six hours");
  const result = await collectSource(id);
  assert.equal(result.status, "ok");
  const [before] = await sql<{ last_fetch_at: Date; next_fetch_at: Date }[]>`SELECT last_fetch_at, next_fetch_at FROM sources WHERE id = ${id}`;
  assert.equal(before!.next_fetch_at.getTime() - before!.last_fetch_at.getTime(), 6 * 3600_000);
  await scheduleDueSources();
  const [after] = await sql<{ next_fetch_at: Date }[]>`SELECT next_fetch_at FROM sources WHERE id = ${id}`;
  assert.equal(after!.next_fetch_at.getTime(), before!.next_fetch_at.getTime());
});
