import assert from "node:assert/strict";
import { test } from "node:test";
import { getAllPosts } from "./rss.ts";

const rssUrl = "https://note.com/winc/m/magazine/rss";
const feed = (items = "") => `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
    <channel><title>WINCのブログ</title>${items}</channel>
  </rss>`;

function configureRss(t) {
  const original = process.env.NOTE_MAGAZINE_RSS_URL;
  process.env.NOTE_MAGAZINE_RSS_URL = rssUrl;
  t.after(() => {
    if (original === undefined) delete process.env.NOTE_MAGAZINE_RSS_URL;
    else process.env.NOTE_MAGAZINE_RSS_URL = original;
  });
}

test("loads the configured RSS and lists note articles newest first", async (t) => {
  configureRss(t);
  const fetch = t.mock.method(globalThis, "fetch", async () => new Response(feed(`
    <item>
      <title>以前の記事</title>
      <link>https://note.com/winc/n/older</link>
      <pubDate>Mon, 02 Nov 2026 12:00:00 +0900</pubDate>
    </item>
    <item>
      <title><![CDATA[技術 & 活動レポート]]></title>
      <link>https://note.com/winc/n/newer?foo=1&amp;bar=2</link>
      <guid isPermaLink="false">newer-article</guid>
      <pubDate>Tue, 03 Nov 2026 12:00:00 +0900</pubDate>
      <description><![CDATA[<p>開発 &amp; 交流の記録</p>\n<p>続きをみる</p>]]></description>
      <category>活動報告</category>
      <category>技術</category>
      <media:thumbnail>https://example.com/image.png</media:thumbnail>
    </item>
  `)));

  const posts = await getAllPosts();
  assert.equal(fetch.mock.calls[0].arguments[0], rssUrl);
  assert.equal(posts.length, 2);
  assert.equal(posts[0].id, "newer-article");
  assert.equal(posts[0].title, "技術 & 活動レポート");
  assert.equal(posts[0].url, "https://note.com/winc/n/newer?foo=1&bar=2");
  assert.equal(posts[0].date, "2026-11-03T03:00:00.000Z");
  assert.equal(posts[0].excerpt, "開発 & 交流の記録 続きをみる");
  assert.deepEqual(posts[0].tags.map((tag) => tag.name), ["活動報告", "技術"]);
  assert.equal(posts[1].id, "https://note.com/winc/n/older");
  assert.equal(posts[1].excerpt, "");
  assert.deepEqual(posts[1].tags, []);
});

test("accepts a note magazine with no articles", async (t) => {
  configureRss(t);
  t.mock.method(globalThis, "fetch", async () => new Response(feed()));
  assert.deepEqual(await getAllPosts(), []);
});

test("omits broken entries and unsafe article links", async (t) => {
  configureRss(t);
  const item = (title, link, date) => `
    <item><title>${title}</title><link>${link}</link><pubDate>${date}</pubDate></item>`;
  const date = "Tue, 03 Nov 2026 12:00:00 +0900";
  t.mock.method(globalThis, "fetch", async () => new Response(feed(
    item("Unsafe", "javascript:alert(1)", date) +
    item("Relative", "/article", date) +
    item("Missing link", "", date) +
    item("", "https://note.com/winc/n/no-title", date) +
    item("Bad date", "https://note.com/winc/n/bad-date", "invalid") +
    item("Valid", "https://note.com/winc/n/valid", date)
  )));

  const posts = await getAllPosts();
  assert.deepEqual(posts.map((post) => post.title), ["Valid"]);
});

test("reports an HTTP error instead of treating it as an empty magazine", async (t) => {
  configureRss(t);
  t.mock.method(globalThis, "fetch", async () => new Response("Unavailable", { status: 503 }));
  await assert.rejects(getAllPosts, /Failed to fetch note RSS: 503/);
});

test("reports malformed RSS", async (t) => {
  configureRss(t);
  t.mock.method(globalThis, "fetch", async () => new Response("<rss><broken>"));
  await assert.rejects(getAllPosts);
});

test("reports missing RSS configuration without making a request", async (t) => {
  configureRss(t);
  delete process.env.NOTE_MAGAZINE_RSS_URL;
  const fetch = t.mock.method(globalThis, "fetch", async () => new Response(feed()));
  await assert.rejects(getAllPosts, /NOTE_MAGAZINE_RSS_URL is not defined/);
  assert.equal(fetch.mock.callCount(), 0);
});
