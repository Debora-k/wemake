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

export const createProduct = async (client: SupabaseClient<Database>, 
    {
        name,
        tagline,
        url,
        howItWorks,
        description,
        category,
        iconUrl,
        userId,
    }: {
        name: string;
        tagline: string;
        url: string;
        howItWorks: string;
        description: string;
        category: number;
        iconUrl: string;
        userId: string;
    }
) => {
    const { data, error } = await client.from("products").insert({
        name,
        tagline,
        url,
        description,
        how_it_works: howItWorks,
        category_id: category,
        icon: iconUrl,
        profile_id: userId,
    }).select("product_id")
    .single();
    if (error) {
        throw error;
    }
    return data?.product_id;
};