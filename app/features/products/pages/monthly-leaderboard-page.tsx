import type { Route } from "./+types/monthly-leaderboard-page";
import { DateTime } from "luxon";
import { data, isRouteErrorResponse } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "~/features/products/components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import { ProductPagination } from "~/common/components/product-pagination";
import { getProductPagesByDateRange, getProductsByDateRange } from "../queries";
const paramsSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
});
export const meta: Route.MetaFunction = ({ params }) => {
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  let title = "Monthly Leaderboard";
  if (success) {
    const date = DateTime.fromObject(parsedData)
      .setZone("Canada/Mountain")
      .setLocale("en-CA");
    title = `Best of ${date.toLocaleString({ month: "long" })} | wemake`;
  }
  return [
    {
      title,
    },
  ];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
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
    month: parsedData.month,
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
  const today = DateTime.now().setZone("Canada/Mountain").startOf("month");
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
  const monthlyProducts = await getProductsByDateRange({
    startDate: date.startOf("month"),
    endDate: date.endOf("month"),
    limit: 15,
    page: Number(url.searchParams.get("page") || 1),
  });
  const totalPages = await getProductPagesByDateRange({
    startDate: date.startOf("month"),
    endDate: date.endOf("month"),
  });
  return {
    ...parsedData,
    monthlyProducts,
    totalPages,
  };
};

export default function MonthlyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
    month: loaderData.month,
  });
  const previousMonth = urlDate.minus({ months: 1 });
  const nextMonth = urlDate.plus({ months: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf("month"));
  return (
    <div className="space-y-10">
      <Hero title={`Best of ${urlDate.toLocaleString({ month: "long" })}`} />
      <div className="flex items-center justify-center gap-2">
        <Button variant="secondary" asChild>
          <Link
            to={`/products/leaderboards/monthly/${previousMonth.year}/${previousMonth.month}`}
          >
            &larr;{" "}
            {previousMonth.toLocaleString({ year: "numeric", month: "long" })}
          </Link>
        </Button>
        {!isToday ? (
          <Button variant="secondary" asChild>
            <Link
              to={`/products/leaderboards/monthly/${nextMonth.year}/${nextMonth.month}`}
            >
              {nextMonth.toLocaleString({ year: "numeric", month: "long" })}{" "}
              &rarr;
            </Link>
          </Button>
        ) : null}
      </div>
      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        {loaderData.monthlyProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id.toString()}
            name={product.name}
            description={product.description}
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
