"use client";
import { useRef } from "react";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";

export default function SectionHeading({
  titleEn,
  titleJa,
}: {
  titleEn: string;
  titleJa: string;
}) {
  gsap.registerPlugin(TextPlugin);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(SplitText);
  const scope = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const lineTarget = scope.current?.querySelector(".section-heading-line");
      if (lineTarget) {
        const splitLines = SplitText.create(lineTarget, {
          type: "lines",
          mask: "lines",
        });
        const tlLines = gsap.timeline({
          scrollTrigger: {
            trigger: scope.current,
            start: "top bottom",
            end: "+=50%",
            toggleActions: "play none none reverse",
          },
        });
        tlLines.from(splitLines.lines, {
          duration: 0.8,
          y: 100,
          autoAlpha: 0,
          stagger: 0.05,
        });
      }

      const typingTarget = scope.current?.querySelector(".section-heading-typing");
      if (typingTarget) {
        const typingTl = gsap.timeline({
          scrollTrigger: {
            trigger: scope.current,
            start: "top bottom",
            end: "+=50%",
            toggleActions: "play none none reset",
          },
        });
        typingTl.to(typingTarget, {
          autoAlpha: 1,
          text: titleEn,
          duration: titleEn.length * 0.1,
        });

        gsap.fromTo(
          typingTarget,
          1,
          {
            "border-right-color": "rgba(0,0,0,0.8)",
          },
          {
            "border-right-color": "rgba(255,255,255,0)",
            repeat: -1,
            ease: "steps(1)",
          },
        );
      }
    },
    { scope: scope }
  );

  return (
    <div className="divide-effect">
      <h2 ref={scope} className="text-4xl lg:text-5xl font-bold w-full overflow-y-hidden">
        <p className="font-extrabold text-sm px-1 section-heading-line">{titleJa}</p>
        <span className="section-heading-typing overflow-hidden border-r-4 uppercase font-bold"></span>
      </h2>
    </div>
  );
}

