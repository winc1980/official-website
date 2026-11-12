import PageHeader from "@/components/page-header";
import PostCard from "@/components/blog/PostCard";
import { getAllPosts } from "@/lib/blog/rss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - WINC",
  description: "早稲田コンピューター研究会（WINC）のブログ記事一覧",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="flex flex-col items-center">
      <PageHeader
        titleJa="ブログ"
        titleEn="Blog"
        desc="部員が書いた技術記事やイベントレポートをお届けします。"
      />
      <section className="w-full flex flex-col items-center divide-effect bg-background">
        <div className="w-full max-w-[1440px] flex flex-row items-stretch relative">
          <div className="grow-[1] border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-lg:hidden [--pattern-fg:var(--foreground)]/10"></div>
          <div className="w-full max-w-7xl">
            <div className="min-h-[80vh] flex flex-col justify-start">
              {posts.length > 0 ? (
                posts.map((post) => <PostCard key={post.id} post={post} />)
              ) : (
                <div className="flex items-center justify-center py-20">
                  <p className="text-muted-foreground">
                    まだ記事がありません。
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="grow-[1] border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-lg:hidden [--pattern-fg:var(--foreground)]/10"></div>
        </div>
      </section>
    </main>
  );
}
