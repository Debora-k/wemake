import { redirect } from "react-router";
import type { Route } from "./+types/social-complete-page";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";

const paramsSchema = z.object({
  provider: z.enum(["google", "github"]),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { success, data } = paramsSchema.safeParse(params);
  if (!success) return redirect("/auth/login");

  const { provider } = data;
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) return redirect("/auth/login");

  const { client, headers } = makeSSRClient(request);
  const { error } = await client.auth.exchangeCodeForSession(code);
  if (error) throw error;
  return redirect("/", { headers });
};
