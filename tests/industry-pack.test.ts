// Regression coverage for the RFID source markup: card titles must win over CTA labels,
// and rendered dates must win over unsupported epoch attributes.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { fromHtml } from "@aihot/backend/sources/web-list";
import { assertSupportedConfig } from "@aihot/backend/sources/config-keys";
import type { SourceRow } from "@aihot/backend/sources/types";
import { ENTITIES, CATEGORY_TAGS, TOPIC_TAGS, ENTITY_TAGS } from "@aihot/industry/taxonomy";

const sources = JSON.parse(readFileSync(new URL("../industry/sources.json", import.meta.url), "utf8")).sources as SourceRow[];
const source = (id: string) => sources.find((s) => s.id === id)!;

test("RFID directory resolves its entities, tags and supported source configs", () => {
  const topics = JSON.parse(readFileSync(new URL("../industry/topics.json", import.meta.url), "utf8")).topics;
  const tags = new Set<string>([...CATEGORY_TAGS, ...TOPIC_TAGS, ...ENTITY_TAGS]);
  for (const topic of topics) {
    if (topic.entityId) assert.ok(ENTITIES[topic.entityId], topic.slug);
    for (const tag of topic.tags) {
      if (tag.startsWith("entity:")) assert.ok(ENTITIES[tag.slice(7)], topic.slug);
      else assert.ok(tags.has(tag), `${topic.slug}: ${tag}`);
    }
  }
  for (const s of sources) assertSupportedConfig(s.kind, s.config);
});

test("Avery cards retain the headline and date rather than Read more", () => {
  const s = source("web-avery-rfid");
  const rows = fromHtml('<div class="text parbase"><h5>New RAIN RFID inlay</h5><p>Company — September 15, 2026</p><div class="cta"><a href="/content/rfid/na/en/home/news-insights/press-releases/new-inlay.html">Read more</a></div></div>', s.config.url, s);
  assert.equal(rows.length, 1);
  assert.equal(rows[0]!.title, "New RAIN RFID inlay");
  assert.equal(rows[0]!.publishedAt?.toISOString(), "2026-09-15T00:00:00.000Z");
});

test("Tageos cards parse rendered date instead of Unix epoch datetime", () => {
  const s = source("web-tageos-news");
  const rows = fromHtml('<div class="textteaser-icon-textwrapper"><h3>New food packaging inlay</h3><time datetime="1789477247">September 15, 2026</time><div class="textteaser-icon-text"><a href="/en/why-tageos/news/news-details/new-inlay.html">Read more</a></div></div>', s.config.url, s);
  assert.equal(rows[0]!.title, "New food packaging inlay");
  assert.equal(rows[0]!.publishedAt?.toISOString(), "2026-09-15T00:00:00.000Z");
});

test("Zebra lists accept h5 card titles and ignore navigation links", () => {
  const s = source("web-zebra-press");
  const rows = fromHtml('<a href="/us/en/about-zebra/newsroom/press-releases/2026/nav.html">Navigation</a><a href="/us/en/about-zebra/newsroom/press-releases/2026/reader.html"><h5 class="result-card-title">New RFID reader</h5></a>', s.config.url, s);
  assert.deepEqual(rows.map((r) => r.title), ["New RFID reader"]);
});
