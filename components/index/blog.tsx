import { getAllPosts } from "@/lib/blog/rss";
import BlogArticle from "@/components/index/blog-article";
import { Plus } from "lucide-react";
import Link from "next/link";
import SectionHeading from "./section-heading";
import { PrimaryButton } from "../buttons/PrimaryButton";

export default async function Blog() {
  const posts = await getAllPosts();

  return (
    <>
      <div className="divide-effect flex flex-col justify-center">
        <section className="border-t border-b border-foreground/10 w-full max-w-7xl py-16 lg:py-32 flex flex-col gap-12 lg:gap-20">
          <SectionHeading titleEn="BLOG" titleJa="ブログ" />
          <div className="min-h-[80vh] divide-effect flex flex-col items-center">
            {posts.map((post, i) => {
              if (i < 3)
                return (
                  <BlogArticle post={post} key={post.id} />
                );
            })}
            <Link href="/blog/">
              <PrimaryButton>
                もっと見る
                <Plus />
              </PrimaryButton>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
