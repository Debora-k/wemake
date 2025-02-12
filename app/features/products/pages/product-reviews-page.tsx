import type { Route } from "../../../+types";

export function loader({ params }: Route.LoaderArgs) {
  return {
    productId: params.productId,
  };
}

export function meta({ params }: Route.MetaFunction) {
  return [
    { title: `Reviews for Product ${params.productId}` },
    { name: "description", content: "Product reviews and ratings" },
  ];
}

export default function ProductReviewsPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Product Reviews</h1>
      <div className="grid gap-6">
        {/* Reviews list will be implemented here */}
      </div>
    </div>
  );
}
