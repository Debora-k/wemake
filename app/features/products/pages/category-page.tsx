import type { Route } from "./+types/category-page";
import type { MetaFunction } from "react-router";

export function meta({ params }: Route.MetaArgs): ReturnType<MetaFunction> {
  return [
    { title: "Category | Product Hunt Clone" },
    { name: "description", content: "Products in this category" },
  ];
}

export function loader({ request, params }: Route.LoaderArgs) {
  const { category } = params;
  return {
    category,
    products: [],
  };
}

export default function CategoryPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6"></h1>
    </div>
  );
}
