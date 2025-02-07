import type { Route } from "./+types/yearly-leaderboard-page";
import type { MetaFunction } from "react-router";

export function meta({ params }: Route.MetaArgs): ReturnType<MetaFunction> {
  return [
    { title: "Yearly Leaderboard | Product Hunt Clone" },
    { name: "description", content: "Top products of the year" },
  ];
}

export function loader({ request, params }: Route.LoaderArgs) {
  const { year } = params;
  return {
    year,
    products: [],
  };
}

export function YearlyLeaderboardPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Top Products of </h1>
    </div>
  );
}
