"use client";
import { NewsType } from "@/types/News";
import { useRef } from "react";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";

export default function NewsArticle({
  newsContent,
}: {
  newsContent: NewsType;
}) {
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
    <article
      ref={scope}
      className="bg-foreground/10 mb-8 divide-effect w-full max-w-7xl"
    >
      <div className="bg-background rounded-2xl p-4 m-2 gsap-trigger">
        <h3 className="text-3xl font-bold w-full divide-effect gsap-lines">
          <p className="font-mono text-sm opacity-60 px-1">
            {newsContent.createdAt}
          </p>
          {newsContent.title}
        </h3>
        <p className="text-md text-foreground py-8 reveal-on-scroll">
          {newsContent.description
            .split("\n")
            .map((line: string, index: number) => (
              <span key={index} className="text-md text-foreground">
                {line}
              </span>
            ))}
        </p>
      </div>
    </article>
  );
}
