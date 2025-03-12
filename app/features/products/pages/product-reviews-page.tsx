import { Button } from "~/common/components/ui/button";
import { ReviewCard } from "../components/review-card";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
import CreateReviewDialog from "../components/create-review-dialog";
import { useOutletContext } from "react-router";
import type { Route } from "./+types/product-reviews-page";
import { getReviews } from "../queries";
import { makeSSRClient } from "~/supa-client";
export function meta() {
  return [
    { title: "Product Reviews | wemake" },
    { name: "description", content: "Product reviews and ratings" },
  ];
}

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const reviews = await getReviews(client, params.productId);
  return { reviews };
};

export default function ProductReviewsPage({
  loaderData,
}: Route.ComponentProps) {
  const { review_count } = useOutletContext<{ review_count: string }>();
  return (
    <Dialog>
      <div className="space-y-10 max-w-xl">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">
            {review_count} {review_count === "1" ? "Review" : "Reviews"}
          </h3>
          <DialogTrigger>
            <Button variant="secondary">Write a review</Button>
          </DialogTrigger>
        </div>
        <div className="space-y-20">
          {loaderData.reviews?.map((review) => (
            <ReviewCard
              key={review.review_id}
              avatarUrl={review.user.avatar ?? ""}
              avatarFallback={review.user.username.charAt(0)}
              authorName={review.user.name}
              username={review.user.username}
              rating={review.rating}
              content={review.review}
              postedAt={review.created_at}
            />
          ))}
        </div>
      </div>
      <CreateReviewDialog />
    </Dialog>
  );
}
