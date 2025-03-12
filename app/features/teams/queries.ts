import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";


export const getTeams = async (client: SupabaseClient<Database>,{limit}: {limit: number}) => {
    const {data, error} = await client.from("teams").select(
        `
        team_id,
        roles,
        product_description,
        team_leader: profiles!inner(
         username,
         avatar
        )
        `).limit(limit);
    if(error) {
        throw new Error(error.message);
    }
    return data;
}

export const getTeamById = async (client: SupabaseClient<Database>,teamId: string) => {
    const {data, error} = await client
    .from("teams")
    .select(`
        *,
        team_leader: profiles!inner(
            name,
            username,
            avatar,
            role
        )
        `)
    .eq("team_id", teamId)
    .single();
    if(error) {
        throw new Error(error.message);
    }
    return data;
}