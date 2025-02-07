import type { Route } from "./+types/products-page";
import type { MetaFunction } from "react-router";

export function meta({ params }: Route.MetaArgs): ReturnType<MetaFunction> {
  return [
    { title: "Products | Product Hunt Clone" },
    { name: "description", content: "Browse all products" },
  ];
}

export function loader({ request }: Route.LoaderArgs) {
  return {
    products: [],
  };
}

export default function ProductsPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
    </div>
  );
}
