import { Button, buttonVariants } from "~/common/components/ui/button";
import { Link, NavLink, Outlet } from "react-router";
import { StarIcon } from "lucide-react";
import { ChevronUpIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/product-overview-layout";
import { getProductById } from "../queries";
import { makeSSRClient } from "~/supa-client";

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `${data.product.name} Overview | wemake` },
    { name: "description", content: data.product.description },
  ];
}

export const loader = async ({
  params,
  request,
}: Route.LoaderArgs & { params: { productId: string } }) => {
  const { client, headers } = makeSSRClient(request);
  const product = await getProductById(client, params.productId);
  return { product };
};

export default function ProductOverviewLayout({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <div className="flex justify-between">
        <div className="flex gap-10">
          <div className="size-40 rounded-xl shadow-xl bg-primary/50"></div>
          <div>
            <h1 className="text-5xl font-bold">{loaderData.product.name}</h1>
            <p className="text-2xl font-light">
              {loaderData.product.description}
            </p>
            <div className="mt-5 flex items-center gap-2">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon
                    className="size-4"
                    fill={
                      index < Math.floor(loaderData.product.average_rating)
                        ? "currentColor"
                        : "none"
                    }
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                {loaderData.product.reviews} reviews
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <Button
            variant="secondary"
            size="lg"
            asChild
            className="text-sm h-14 px-10"
          >
            <Link to={`/products/${loaderData.product.product_id}/visit`}>
              Visit Website
            </Link>
          </Button>
          <Button size="lg" className="text-sm h-14 px-10">
            <ChevronUpIcon className="size-4" />
            Upvote ({loaderData.product.upvotes})
          </Button>
        </div>
      </div>
      <div className="flex gap-2.5">
        <NavLink
          end
          className={({ isActive }) =>
            cn([
              buttonVariants({ variant: "outline" }),
              isActive && "bg-accent text-foreground",
            ])
          }
          to={`/products/${loaderData.product.product_id}/overview`}
        >
          Overview
        </NavLink>
        <NavLink
          end
          className={({ isActive }) =>
            cn([
              buttonVariants({ variant: "outline" }),
              isActive && "bg-accent text-foreground",
            ])
          }
          to={`/products/${loaderData.product.product_id}/reviews`}
        >
          Reviews
        </NavLink>
      </div>
      <div>
        <Outlet
          context={{
            product_id: loaderData.product.product_id,
            description: loaderData.product.description,
            how_it_works: loaderData.product.how_it_works,
            review_count: loaderData.product.reviews,
          }}
        />
      </div>
    </div>
  );
}
