import type { Route } from "./+types/home-page";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: "Home | Product Hunt Clone" },
    { name: "description", content: "Discover the best new products" },
  ];
}

export function loader({ request }: Route.LoaderArgs) {
  return {
    featuredProducts: [],
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export default function HomePage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { featuredProducts } = loaderData;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">
        Discover the best new products
      </h1>
      {/* Featured products will go here */}
    </div>
  );
}
