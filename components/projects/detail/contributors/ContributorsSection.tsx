import ContributorCell from "./contributorCell";
import { ProjectType } from "@/types/Project";

interface ContributorsSectionProps {
  project: ProjectType;
}

export default function ContributorsSection({
  project,
}: ContributorsSectionProps) {
  return (
    <div className="my-4">
      <h2 className="font-bold text-2xl palt lg:divide-effect">
        <p className="font-mono text-sm opacity-60">Contributors</p>
        貢献者
      </h2>
      <div className="w-full gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 py-4">
        {(project.members ?? []).map((member) => (
          <ContributorCell key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}
