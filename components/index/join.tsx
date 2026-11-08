"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import SectionHeading from "./section-heading";
import { PrimaryButton } from "../buttons/PrimaryButton";
import ShinkanCalendar from "./shinkan-calendar";

export default function Join({ heading, body }: { heading: string; body: string }) {
  gsap.registerPlugin(TextPlugin);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(SplitText);
  const scope = useRef(null);

  useGSAP(
    () => {
      const splitChars = SplitText.create(".gsap-chars", { type: "chars" });
      const tlChars = gsap.timeline({
        scrollTrigger: {
          trigger: ".gsap-chars",
          start: "top bottom",
          end: "+=66.6%", // end after scrolling 500px beyond the start
          scrub: true,
        },
      });
      tlChars.from(splitChars.chars, {
        duration: 0.8,
        y: 100,
        autoAlpha: 0,
        stagger: 0.05,
      });

      const splitLines = SplitText.create(".gsap-lines", {
        type: "lines",
        mask: "lines",
      });
      const tlLines = gsap.timeline({
        scrollTrigger: {
          trigger: ".gsap-lines",
          start: "top bottom",
          end: "+=50%", // end after scrolling 500px beyond the start
          scrub: true,
        },
      });
      tlLines.from(splitLines.lines, {
        duration: 1,
        y: 100,
        autoAlpha: 0,
        stagger: 0.05,
      });
    },
    { scope: scope }
  );

  return (
    <div className="divide-effect flex flex-col" ref={scope}>
      <section className="gsap-trigger border-t border-b border-foreground/10 w-full max-w-7xl py-16 lg:py-32 relative">
        <SectionHeading titleEn="join us" titleJa="新歓情報" />
        <h2 className="overflow-hidden text-[42px] lg:text-7xl font-light w-full divide-effect">
          <div className="gsap gsap-chars ">
            you{" "}
            <span className="to-text-gradient-child **:bg-linear-to-r **:from-rose-600 **:to-fuchsia-600">
              =
            </span>{" "}
            <p className="lg:inline">
              <span className="to-text-gradient-child **:bg-linear-to-r **:from-yellow-400 **:to-orange-400">
                new
              </span>{" "}
              Member
              <span className="to-text-gradient-child **:bg-linear-to-b **:from-cyan-600 **:to-indigo-600">
                ()
              </span>
              ;
            </p>
          </div>
        </h2>
        <div className="overflow-hidden text-lg text-foreground my-8 divide-effect">
          <div className="gsap gsap-lines text-sm/8 lg:text-base/12">
            <p className="text-3xl/12 lg:text-4xl/16 font-light">
              {heading}
            </p>
            <p dangerouslySetInnerHTML={{ __html: body.replace(/\n/g, "<br />") }} />
          </div>
        </div>
        {/*
        <div className="my-8">
          <ShinkanCalendar />
        </div>
        */}
        <div className="p-2 flex flex-col sm:flex-row gap-4 mt-12">
          <Link href="/join">
            <PrimaryButton>
              新入生向け情報
              <ArrowRight />
            </PrimaryButton>
          </Link>
          {/*
          <Link href="https://forms.gle/mEZfW1Rr7CSi5Q5h9">
            <PrimaryButton>
              新歓参加FORM
              <ArrowRight />
            </PrimaryButton>
          </Link>
          */}
        </div>
      </section>
    </div>
  );
}
