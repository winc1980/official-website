"use client";
import { ProjectType } from "@/types/Project";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const ProjectCard = ({ project, className }: { project: ProjectType, className?: string }) => {
  gsap.registerPlugin(ScrollTrigger);
  const scope = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const textArea = scope.current?.querySelector(".card-text-area");
      if (textArea) {
        gsap.from(textArea, {
          y: 40,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    },
    { scope: scope }
  );

  return (
    <Link href={`/projects/${project.id}`} className={className} ref={scope}>
      <article className="bg-foreground/10 border border-foreground/10 w-full @container p-2  transition-all duration-300 h-full">
        <div className="flex flex-col items-start bg-background hover:bg-foreground/80 hover:backdrop-blur hover:text-background transition-all duration-300 rounded-2xl gap-4 p-4 h-full">
          <Image
            src={project.images[0].url ?? ""}
            alt={project.title}
            className="h-auto w-full aspect-video object-cover transition-all duration-300 rounded-xl"
            width={800}
            height={450}
          />
          <div className="w-full card-text-area">
            <span className="font-mono text-sm opacity-60 block">
              {project.completeDate != null ? "Released" : "In development"}
              {project.technologies[0]?` / ${typeof project.technologies[0] === "string" ? project.technologies[0] : (project.technologies[0] as { name: string }).name}`:''}
            </span>
            <h3 className="text-3xl font-bold">
              {project.title}
            </h3>
            <p className="text-md py-4 line-clamp-3">
              {project.description.replace(/<[^>]*>/g, '')}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
};
