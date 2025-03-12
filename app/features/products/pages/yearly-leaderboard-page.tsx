import type { Route } from "./+types/yearly-leaderboard-page";
import { DateTime } from "luxon";
import { data, isRouteErrorResponse } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "~/features/products/components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import { ProductPagination } from "~/common/components/product-pagination";
import { getProductPagesByDateRange, getProductsByDateRange } from "../queries";
import { makeSSRClient } from "~/supa-client";
const paramsSchema = z.object({
  year: z.coerce.number(),
});

export const meta: Route.MetaFunction = ({ params }) => {
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  let title = "Yearly Leaderboard";
  if (success) {
    const date = DateTime.fromObject({
      year: parsedData.year,
    })
      .setZone("Canada/Mountain")
      .setLocale("en-CA");
    title = `Best of ${date.toLocaleString({ year: "numeric" })} | wemake`;
  }
  return [
    {
      title,
    },
  ];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  if (!success) {
    throw data(
      {
        error_code: "INVALID_PARAMS",
        error_message: "Invalid params",
      },
      {
        status: 400,
      }
    );
  }
  const date = DateTime.fromObject({
    year: parsedData.year,
  }).setZone("Canada/Mountain");

  if (!date.isValid) {
    throw data(
      {
        error_code: "INVALID_DATE",
        error_message: "Invalid date",
      },
      {
        status: 400,
      }
    );
  }
  const today = DateTime.now().setZone("Canada/Mountain").startOf("year");
  if (date > today) {
    throw data(
      {
        error_code: "FUTURE_DATE",
        error_message: "Future date",
      },
      {
        status: 400,
      }
    );
  }
  const url = new URL(request.url);
  const yearlyProducts = await getProductsByDateRange(client, {
    startDate: date.startOf("year"),
    endDate: date.endOf("year"),
    limit: 15,
    page: Number(url.searchParams.get("page") || 1),
  });
  const totalPages = await getProductPagesByDateRange(client, {
    startDate: date.startOf("year"),
    endDate: date.endOf("year"),
  });
  return {
    ...parsedData,
    yearlyProducts,
    totalPages,
  };
};

export default function YearlyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
  });
  const previousYear = urlDate.minus({ years: 1 });
  const nextYear = urlDate.plus({ years: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf("year"));
  return (
    <div className="space-y-10">
      <Hero title={`Best of ${urlDate.toLocaleString({ year: "numeric" })}`} />
      <div className="flex items-center justify-center gap-2">
        <Button variant="secondary" asChild>
          <Link to={`/products/leaderboards/yearly/${previousYear.year}`}>
            &larr; {previousYear.toLocaleString({ year: "numeric" })}
          </Link>
        </Button>
        {!isToday ? (
          <Button variant="secondary" asChild>
            <Link to={`/products/leaderboards/yearly/${nextYear.year}`}>
              {nextYear.toLocaleString({ year: "numeric" })} &rarr;
            </Link>
          </Button>
        ) : null}
      </div>
      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        {loaderData.yearlyProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            description={product.tagline}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}
      </div>
      <ProductPagination totalPages={loaderData.totalPages} />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        {error.data.message} / {error.data.error_code}
      </div>
    );
  }
  if (error instanceof Error) {
    return <div>{error.message}</div>;
  }
  return <div>Unknown error</div>;
}
