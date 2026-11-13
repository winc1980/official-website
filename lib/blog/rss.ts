import Parser from "rss-parser";
import type { BlogFeed, BlogPost } from "./types";

const parser = new Parser<Record<string, never>, Record<string, never>>();

// 設定ミス（URL未設定・不正）は例外にしてビルドを止め、本番で気づかず空のブログになるのを防ぐ。
// note側の障害（HTTPエラー・タイムアウト・不正なRSS）はログを出して空の一覧を返し、
// サイト全体のビルドを止めない。失敗時もページの再検証間隔（5分）は登録されるため自然に回復する。
export async function getBlogFeed(): Promise<BlogFeed> {
  const rssUrl = getRssUrl();
  const magazineUrl = rssUrl.href.replace(/\/rss\/?$/, "");

  try {
    return { posts: await fetchPosts(rssUrl), failed: false, magazineUrl };
  } catch (error) {
    console.error("Failed to load note RSS:", error);
    return { posts: [], failed: true, magazineUrl };
  }
}

function getRssUrl(): URL {
  const value = process.env.NOTE_MAGAZINE_RSS_URL;
  if (!value) {
    throw new Error("NOTE_MAGAZINE_RSS_URL is not defined");
  }
  try {
    return new URL(value);
  } catch {
    throw new Error(`NOTE_MAGAZINE_RSS_URL is not a valid URL: ${value}`);
  }
}

async function fetchPosts(rssUrl: URL): Promise<BlogPost[]> {
  const response = await fetch(rssUrl.href, {
    next: { revalidate: 300 },
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch note RSS: ${response.status}`);
  }

  const feed = await parser.parseString(await response.text());
  const posts = feed.items.flatMap((item): BlogPost[] => {
    const title = item.title?.trim();
    const date = item.isoDate;
    if (!title || !item.link || !date) return [];

    let url: URL;
    try {
      url = new URL(item.link);
    } catch {
      return [];
    }
    if (url.protocol !== "https:" && url.protocol !== "http:") return [];

    return [{
      id: item.guid || url.href,
      title,
      url: url.href,
      date,
      tags: (item.categories ?? [])
        .filter((name) => typeof name === "string" && name.trim())
        .map((name) => ({ id: name, name, color: "default" })),
      excerpt: item.contentSnippet?.replace(/\s+/g, " ").trim() ?? "",
    }];
  });

  return posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}
