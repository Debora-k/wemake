import { Button } from "~/common/components/ui/button";
import { ReviewCard } from "../components/review-card";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
import CreateReviewDialog from "../components/create-review-dialog";
import { useOutletContext } from "react-router";
import type { Route } from "./+types/product-reviews-page";
import { getReviews } from "../queries";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { z } from "zod";
import { createProductReview } from "../mutations";
import { useEffect, useState } from "react";
export function meta() {
  return [
    { title: "Product Reviews | wemake" },
    { name: "description", content: "Product reviews and ratings" },
  ];
}

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const reviews = await getReviews(client, params.productId);
  return { reviews };
};

export const formSchema = z.object({
  review: z.string().min(1),
  rating: z.coerce.number().min(1).max(5),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return { formErrors: error.flatten().fieldErrors };
  }
  await createProductReview(client, {
    productId: Number(params.productId),
    review: data.review,
    rating: data.rating,
    userId,
  });
  return { ok: true };
};

export default function ProductReviewsPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { review_count } = useOutletContext<{ review_count: string }>();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (actionData?.ok) {
      setOpen(false);
    }
  }, [actionData]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="space-y-10 max-w-xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {review_count} {review_count === "1" ? "Review" : "Reviews"}
          </h2>
          <DialogTrigger asChild>
            <Button variant={"secondary"}>Write a review</Button>
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
