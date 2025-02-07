import type { Route } from "./+types/weekly-leaderboard-page";
import type { MetaFunction } from "react-router";

export function meta({ params }: Route.MetaArgs): ReturnType<MetaFunction> {
  return [
    { title: "Weekly Leaderboard | Product Hunt Clone" },
    { name: "description", content: "Top products of the week" },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  const { year, week } = params;
  return {
    year,
    week,
    products: [],
  };
}

export default function WeeklyLeaderboardPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Top Products of Week</h1>
    </div>
  );
}
