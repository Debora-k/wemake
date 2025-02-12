import { Button } from "~/common/components/ui/button";
import { Textarea } from "~/common/components/ui/textarea";
import type { Route } from "./+types/new-product-review-page";

export function loader({ params }: Route.LoaderArgs) {
  return {
    productId: params.productId,
  };
}

export function action({ request, params }: Route.ActionArgs) {
  // Handle form submission
  return {};
}

export function meta({ params }: Route.MetaFunction) {
  return [
    { title: `Write a Review - Product ${params.productId}` },
    { name: "description", content: "Submit a new product review" },
  ];
}

export default function NewProductReviewPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Write a Review</h1>
      <form method="post" className="space-y-6 max-w-2xl">
        <div className="space-y-2">
          <label htmlFor="review" className="text-sm font-medium">
            Your Review
          </label>
          <Textarea
            id="review"
            name="review"
            placeholder="Share your thoughts about this product..."
            className="min-h-[150px]"
          />
        </div>
        <Button type="submit">Submit Review</Button>
      </form>
    </div>
  );
}
