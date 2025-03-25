import type { Route } from "./+types/upvote-post-page";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { toggleUpvote } from "../mutations";

export const action = async ({ request, params }: Route.ActionArgs) => {
  if (request.method !== "POST") {
    throw new Response("The method not allowed", { status: 405 });
  }
  const { client } = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  await toggleUpvote(client, { postId: params.postId, userId });
  return {
    ok: true,
  };
};
