import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";


export const createPost = async (
    client: SupabaseClient<Database>, 
    {
        title,
        category,
        content,
        userId,
    }: {
        title: string;
        category: string;
        content: string;
        userId: string;
    }
) => {
    const {data: categoryData, error: categoryError} = await client
    .from("topics")
    .select("topic_id")
    .eq("slug", category)
    .single();

    if(categoryError) {
        throw new Error(categoryError.message);
    }

    const {data, error} = await client
    .from("posts")
    .insert({
        title,
        content,
        //topic_id is FK
        topic_id: categoryData.topic_id,
        profile_id: userId,
    })
    .select()
    .single();
    if(error) {
        throw new Error(error.message);
    }
    return data;
};

export const createReply = async (
    client: SupabaseClient<Database>,
    {
        reply,
        postId,
        userId,
    }: {
        reply: string;
        postId: string;
        userId: string;
    }
) => {
    const {error} = await client
    .from("post_replies")
    .insert({
        reply,
        post_id: Number(postId),
        profile_id: userId,
    });
    if(error) {
        throw new Error(error.message);
    }
};