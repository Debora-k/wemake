import type { Route } from "./+types/daily-leaderboard-page";
import { DateTime } from "luxon";
import { data, isRouteErrorResponse } from "react-router";
import { z } from "zod";

const paramsSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
  day: z.coerce.number(),
});

export const loader = ({ params }: Route.LoaderArgs) => {
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
  const date = DateTime.fromObject(parsedData).setZone("Canada/Mountain");

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
  const today = DateTime.now().setZone("Canada/Mountain").startOf("day");
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
  return {
    date,
  };
};

export default function DailyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  return <div></div>;
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
