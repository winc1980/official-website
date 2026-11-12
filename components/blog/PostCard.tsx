import Link from "next/link";
import type { BlogPost } from "@/lib/blog/types";
import { formatDate, getTagColorClass } from "@/lib/blog/utils";

export default function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={post.url}
      className="group block border-b border-foreground/10 py-6 px-8 hover:bg-muted/30 transition-colors"
    >
      <article>
        <div className="flex items-center gap-3 mb-2">
          <time className="text-sm text-muted-foreground font-mono">
            {formatDate(post.date)}
          </time>
          {post.tags.length > 0 && (
            <div className="flex gap-1.5 flex-wrap">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className={`text-xs px-2 py-0.5 rounded-full ${getTagColorClass(tag.color)}`}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold group-hover:text-secondary transition-colors">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {post.excerpt}
          </p>
        )}
      </article>
    </Link>
  );
}
