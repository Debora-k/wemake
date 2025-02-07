import type { Route } from "./+types/daily-leaderboard-page";
import type { MetaFunction } from "react-router";

export function meta({ params }: Route.MetaArgs): ReturnType<MetaFunction> {
  return [
    { title: "Daily Leaderboard | Product Hunt Clone" },
    { name: "description", content: "Top products of the day" },
  ];
}

export function loader({ request, params }: Route.LoaderArgs) {
  const { year, month, day } = params;
  return {
    year,
    month,
    day,
    products: [],
  };
}

export default function DailyLeaderboardPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Top Products of</h1>
      {/* Daily leaderboard content will go here */}
    </div>
  );
}
