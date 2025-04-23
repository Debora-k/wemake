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
        topLevelId,
    }: {
        reply: string;
        postId: string;
        userId: string;
        topLevelId?: number;
    }
) => {
    const {error} = await client
    .from("post_replies")
    .insert({
        reply,
        profile_id: userId,
        ...(topLevelId ? {parent_id: topLevelId} : {post_id: Number(postId)}),
    });
    if(error) {
        throw new Error(error.message);
    }
};

export const toggleUpvote = async (
    client: SupabaseClient<Database>,
    {
        postId,
        userId,
    }: {
        postId: string;
        userId: string;
    }
) => {
    const {count} = await client
    .from("post_upvotes")
    .select("*", {count: "exact", head: true})
    .eq("post_id", Number(postId))
    .eq("profile_id", userId);
    if(count === 0) {
        await client
        .from("post_upvotes")
        .insert({post_id: Number(postId), profile_id: userId});
    } else {
        await client.from("post_upvotes").delete().eq("post_id", Number(postId)).eq("profile_id", userId);
    }
};

export const toggleFollow = async (
    client: SupabaseClient<Database>,
    {
        profileId,
        userId,
    }: {
        profileId: string;
        userId: string;
    }
) => {
    const {count} = await client
    .from("follows")
    .select("*", {count: "exact", head: true})
    .eq("following_id", profileId)
    .eq("follower_id", userId);
    if(count === 0) {
        await client.from("follows").insert({following_id: profileId, follower_id: userId});
    } else {
        await client.from("follows").delete().eq("following_id", profileId).eq("follower_id", userId);
    }
};