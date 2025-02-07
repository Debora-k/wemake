import type { Route } from "./+types/promote-page";
import type { MetaFunction } from "react-router";

export function meta({ params }: Route.MetaArgs): ReturnType<MetaFunction> {
  return [
    { title: "Promote Product | Product Hunt Clone" },
    { name: "description", content: "Promote your product" },
  ];
}

export function loader({ request }: Route.LoaderArgs) {
  return {
    promotionPlans: [],
  };
}

export default function PromotePage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Promote Your Product</h1>
    </div>
  );
}
