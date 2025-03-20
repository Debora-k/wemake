import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "~/common/components/ui/dialog";
import { Form, useActionData } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import { Label } from "~/common/components/ui/label";
import { StarIcon } from "lucide-react";
import { useState } from "react";
import type { action } from "../pages/product-reviews-page";

export default function CreateReviewDialog() {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const actionData = useActionData<typeof action>();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-2xl">
          What do you think about this product?
        </DialogTitle>
        <DialogDescription>
          Share your thoughts with other users and help them make a decision.
        </DialogDescription>
      </DialogHeader>
      <Form className="space-y-10" method="post">
        <div>
          <Label className="flex flex-col gap-1">
            Rating{" "}
            <small className="text-muted-foreground">
              Please select the rating you would give this product.
            </small>
          </Label>
          <div className="flex gap-2 mt-5">
            {[1, 2, 3, 4, 5].map((star) => (
              <label
                key={star}
                className="relative cursor-pointer"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <StarIcon
                  className="size-5 text-yellow-400"
                  fill={
                    hoverRating >= star || rating >= star
                      ? "currentColor"
                      : "none"
                  }
                />
                <input
                  type="radio"
                  name="rating"
                  value={star}
                  required
                  className="opacity-0 h-px w-px absolute"
                  onChange={() => setRating(star)}
                />
              </label>
            ))}
          </div>
          {actionData?.formErrors?.rating && (
            <small className="text-red-500">
              {actionData.formErrors.rating.join(", ")}
            </small>
          )}
        </div>
        <InputPair
          required
          textArea
          name="review"
          label="Review"
          description="Max 1000 characters"
          placeholder="Write your review here..."
        />
        {actionData?.formErrors?.review && (
          <small className="text-red-500">
            {actionData.formErrors.review.join(", ")}
          </small>
        )}
        <DialogFooter>
          <Button type="submit">Submit Review</Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}
