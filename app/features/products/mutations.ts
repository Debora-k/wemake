import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";


export const createProductReview = async (client: SupabaseClient<Database>, 
    {
        productId,
        review,
        rating,
        userId,
    }: {
        productId: number;
        review: string;
        rating: number;
        userId: string;
    }
) => {
    const { error } = await client.from("reviews").insert({
        product_id: Number(productId),
        review,
        rating,
        profile_id: userId,
    });
    if (error) {
        throw error;
    }
};