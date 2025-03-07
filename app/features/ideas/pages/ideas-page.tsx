import type { Route } from "./+types/ideas-page";
import { Hero } from "~/common/components/hero";
import { IdeaCard } from "../components/idea-card";
import { getGptIdeas } from "../queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "IdeasGPT | wemake" },
    { name: "description", content: "Browse and manage feature ideas" },
  ];
};

export const loader = async () => {
  const ideas = await getGptIdeas({
    limit: 20,
  });
  return { ideas };
};

export default function IdeasPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero title="IdeasGPT" subtitle="Find ideas for your next project" />
      <div className="grid grid-cols-3 gap-4">
        {loaderData.ideas.map((idea) => (
          <IdeaCard
            key={idea.gpt_idea_id}
            id={idea.gpt_idea_id}
            title={idea.idea}
            viewsCount={idea.views}
            likesCount={idea.likes}
            createdAt={idea.created_at}
            claimed={idea.has_claimed}
          />
        ))}
      </div>
    </div>
  );
}
