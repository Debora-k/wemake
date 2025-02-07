import type { Route } from "./+types/submit-page";
import type { MetaFunction } from "react-router";

export function meta({ params }: Route.MetaArgs): ReturnType<MetaFunction> {
  return [
    { title: "Submit Product | Product Hunt Clone" },
    { name: "description", content: "Submit your product" },
  ];
}

export function loader({ request }: Route.LoaderArgs) {
  return {
    categories: [],
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export default function SubmitPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Submit Your Product</h1>
    </div>
  );
}
