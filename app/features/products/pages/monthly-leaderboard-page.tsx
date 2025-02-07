import type { Route } from "./+types/monthly-leaderboard-page";
import type { MetaFunction } from "react-router";

export function meta({ params }: Route.MetaArgs): ReturnType<MetaFunction> {
  return [
    { title: "Monthly Leaderboard | Product Hunt Clone" },
    { name: "description", content: "Top products of the month" },
  ];
}

export function loader({ request, params }: Route.LoaderArgs) {
  const { year, month } = params;
  return {
    year,
    month,
    products: [],
  };
}

export default function MonthlyLeaderboardPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Top Products of</h1>
    </div>
  );
}
