import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "~/supa-client";
import { formSchema } from "./pages/submit-team-page";

export const createTeam = async (
  client: SupabaseClient<Database>,
  userId: string,
  team: z.infer<typeof formSchema>
) => {
  const { data, error } = await client.from("teams")
  .insert({
    team_leader_id: userId,
    team_size: team.size,
    equity_split: team.equity,
    product_name: team.name,
    product_stage: team.stage as "idea" | "mvp" | "prototype" | "product",
    product_description: team.description,
    roles: team.roles,
  })
  .select("team_id")
  .single();

  if (error) {
    throw error;
  }
  return data;
};