import Image from "next/image";
import { ProjectType } from "@/types/Project";
import { getTechnologyIcon } from "@/libs/technology-icon";

interface UsedTechnologySectionProps {
    project: ProjectType;
}

export default function UsedTechnologySection({ project }: UsedTechnologySectionProps) {
    return (
      <div className="my-4">
        <h2 className="font-bold text-2xl palt lg:divide-effect">
          <p className="font-mono text-sm opacity-60">Technologies</p>
          使用技術
        </h2>
        <div className="flex gap-4 items-center py-4">
          {(project.technologies ?? []).map((tech, index) => {
            // CMS のリピーターフィールドからオブジェクトが来る場合に対応
            const name = typeof tech === "string" ? tech : (tech as { name: string }).name;
            const iconPath = getTechnologyIcon(name);
            return iconPath ? (
              <>
              <Image
                key={index}
                src={iconPath}
                alt={name}
                width={64}
                height={64}
                className="h-12 w-fit"
              />
              <span key={index} className="text-sm font-mono px-2 py-1 border border-foreground/20 rounded">
                {name}
              </span>
                </>
            
            ) : (
              <span key={index} className="text-sm font-mono px-2 py-1 border border-foreground/20 rounded">
                {name}
              </span>
            );
          })}
        </div>
      </div>
    );
}
