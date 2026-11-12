"use client";
import type { BlogPost } from "@/lib/blog/types";
import { formatDate, getTagColorClass } from "@/lib/blog/utils";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";

export default function BlogArticle({ post }: { post: BlogPost }) {
  gsap.registerPlugin(TextPlugin);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(SplitText);
  const scope = useRef(null);

  useGSAP(
    () => {
      const splitLines = SplitText.create(".gsap-lines", {
        type: "lines",
        mask: "lines",
      });
      const tlLines = gsap.timeline({
        scrollTrigger: {
          trigger: ".gsap-trigger",
          start: "top bottom",
          end: "+=50%",
          toggleActions: "play none none reset",
        },
      });
      tlLines.from(splitLines.lines, {
        duration: 0.5,
        y: 100,
        autoAlpha: 0,
        stagger: 0.05,
      });

      const tlObjects = gsap.timeline({
        scrollTrigger: {
          trigger: ".gsap-trigger",
          start: "top bottom",
          end: "+=50%",
          toggleActions: "play none none reset",
        },
      });
      tlObjects.from(".reveal-on-scroll", {
        duration: 0.5,
        y: 50,
        autoAlpha: 0,
      });
    },
    { scope: scope }
  );

  return (
    <Link href={post.url} className="w-full">
      <article
        ref={scope}
        className="bg-foreground/10 mb-8 divide-effect w-full max-w-7xl"
      >
        <div className="bg-background rounded-2xl p-4 m-2 gsap-trigger hover:bg-foreground/80 hover:backdrop-blur hover:text-background transition-all duration-300">
          <h3 className="text-3xl font-light w-full divide-effect gsap-lines">
            <div className="flex items-center gap-3 px-1">
              <p className="font-mono text-sm opacity-60">
                {formatDate(post.date)}
              </p>
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
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-md text-foreground py-8 reveal-on-scroll">
              {post.excerpt}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
