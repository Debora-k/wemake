import { IdeaCard } from "~/features/ideas/components/idea-card";
import type { Route } from "./+types/dashboard-ideas-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "My Ideas | wemake" }];
};

export default function DashboardIdeasPage() {
  return (
    <div className="space-y-5 h-full">
      <h1 className="text-2xl font-semibold mb-6">Claimed Ideas</h1>
      <div className="grid grid-cols-4 gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <IdeaCard
            key={`idea-${index}`}
            id={`idea-${index}`}
            title="A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and tracking of progress using a mobile app to track workouts and progress as well as a website to manage for user's advanced experience."
            description="Find ideas for your next project."
            viewsCount={123}
            likesCount={12}
            createdAt="12 hours ago"
            claimed={false}
          />
        ))}
      </div>
    </div>
  );
}
