import Parser from "rss-parser";
import type { BlogPost } from "./types";

const parser = new Parser<Record<string, never>, Record<string, never>>();

export async function getAllPosts(): Promise<BlogPost[]> {
  const rssUrl = process.env.NOTE_MAGAZINE_RSS_URL;
  if (!rssUrl) {
    throw new Error("NOTE_MAGAZINE_RSS_URL is not defined");
  }

  const response = await fetch(rssUrl, {
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
