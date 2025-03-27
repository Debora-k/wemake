import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";


export const updateUser = async (
    client: SupabaseClient<Database>,
    {
        id,
        name,
        role,
        headline,
        bio,
    }: {
        id: string;
        name: string;
        role: string;
        headline: string;
        bio: string;
    }
) => {
    const { error} = await client
    .from("profiles")
    .update({
        name,
        role: role as "developer" | "designer" | "product_manager" | "founder" | "other",
        headline,
        bio,
    }).eq("profile_id", id);
    if(error) {
        throw new Error(error.message);
    }
};

export const updateUserAvatar = async (
    client: SupabaseClient<Database>,
    {
        id,
        avatarUrl,
    }: {
        id: string;
        avatarUrl: string;
    }
) => {
    const { error } = await client
    .from("profiles")
    .update({avatar: avatarUrl})
    .eq("profile_id", id);
    if(error) {
        throw new Error(error.message);
    }
};

export const seeNotification = async (client: SupabaseClient<Database>, 
    {userId, notificationId}: {userId: string, notificationId: string}
) => {
    const { error } = await client
    .from("notifications")
    .update({
        seen: true,
    })
    .eq("notification_id", parseInt(notificationId))
    .eq("target_id", userId);

    
    if(error) {
        throw new Error(error.message);
    }
};
