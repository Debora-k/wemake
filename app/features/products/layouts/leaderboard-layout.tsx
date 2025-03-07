import { data, Outlet } from "react-router";
import { z } from "zod";
import type { Route } from "./+types/leaderboard-layout";
const searchParamsSchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!success) {
    throw data(
      {
        error_code: "INVALID_SEARCH_PARAMS",
        error_message: "Invalid search params",
      },
      {
        status: 400,
      }
    );
  }
};

export default function LeaderboardLayout() {
  return <Outlet />;
}
