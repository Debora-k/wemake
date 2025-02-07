import type { Route } from "./+types/leaderboards-page";
import type { MetaFunction } from "react-router";

export function meta({ params }: Route.MetaArgs): ReturnType<MetaFunction> {
  return [
    { title: "Leaderboards | Product Hunt Clone" },
    { name: "description", content: "Product leaderboards and rankings" },
  ];
}

export function loader({ request }: Route.LoaderArgs) {
  return {
    topProducts: [],
  };
}

export default function LeaderboardsPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Leaderboards</h1>
    </div>
  );
}
