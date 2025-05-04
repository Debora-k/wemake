import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/common/components/ui/breadcrumb";
import type { Route } from "./+types/post-page";
import {
  Form,
  Link,
  useFetcher,
  useNavigation,
  useOutletContext,
} from "react-router";
import { Button } from "~/common/components/ui/button";
import { ChevronUpIcon, DotIcon, LoaderCircle } from "lucide-react";
import { Badge } from "~/common/components/ui/badge";
import { Textarea } from "~/common/components/ui/textarea";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Reply } from "../components/reply";
import { getPostById, getReplies, getFollowing } from "../queries";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { z } from "zod";
import { createReply } from "../mutations";
import { useEffect, useRef } from "react";

export const meta: Route.MetaFunction = ({ params }) => {
  return [{ title: `${params.postId} | wemake` }];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const post = await getPostById(client, { postId: params.postId });
  const replies = await getReplies(client, { postId: params.postId });
  const userId = await getLoggedInUserId(client);
  const isFollowing = await getFollowing(client, {
    userId,
    profileId: post.author_profile_id,
  });
  return { post, replies, isFollowing };
};

const formSchema = z.object({
  reply: z.string().min(1),
  topLevelId: z.coerce.number().optional(),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return {
      formErrors: error.flatten().fieldErrors,
    };
  }
  const { reply, topLevelId } = data;
  console.log(reply, topLevelId, params.postId, userId);
  await createReply(client, {
    reply,
    postId: params.postId,
    userId,
    topLevelId,
  });
  return {
    ok: true,
  };
};
export default function PostPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const fetcher = useFetcher();
  const { isLoggedIn, name, username, avatar } = useOutletContext<{
    isLoggedIn: boolean;
    name?: string;
    username?: string;
    avatar?: string;
  }>();
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (actionData?.ok) {
      formRef.current?.reset();
    }
  }, [actionData?.ok]);
  return (
    <div className="space-y-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community">Community</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community?topic=${loaderData.post.topic_slug}`}>
                {loaderData.post.topic_name}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community/${loaderData.post.post_id}`}>
                {loaderData.post.title}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-6 gap-40 items-start">
        <div className="col-span-4 space-y-10">
          <div className="flex w-full items-start gap-10">
            <fetcher.Form
              method="post"
              action={`/community/${loaderData.post.post_id}/upvote`}
            >
              <Button variant="outline" className="flex flex-col h-14">
                <ChevronUpIcon className="size-4 shrink-0" />
                <span>{loaderData.post.upvotes}</span>
              </Button>
            </fetcher.Form>
            <div className="space-y-20 w-full">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{loaderData.post.title}</h2>
                <div className="flex items-center gap-0 text-sm text-muted-foreground">
                  <span>{loaderData.post.author_name}</span>
                  <DotIcon className="size-5" />
                  <span>
                    {DateTime.fromISO(loaderData.post.created_at).toRelative()}
                  </span>
                  <DotIcon className="size-5" />
                  <span>{loaderData.post.replies_count} replies</span>
                </div>
                <p className="text-muted-foreground w-2/3">
                  {loaderData.post.content}
                </p>
              </div>
              {isLoggedIn ? (
                <Form
                  ref={formRef}
                  className="flex items-start gap-5 w-3/4"
                  method="post"
                >
                  <Avatar className="size-14">
                    <AvatarImage src={avatar ?? ""} />
                    <AvatarFallback>{name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-end gap-5 w-full">
                    <Textarea
                      name="reply"
                      placeholder="Add a reply"
                      className="w-full resize-none"
                      rows={3}
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <LoaderCircle className="animate-spin" />
                      ) : (
                        "Reply"
                      )}
                    </Button>
                  </div>
                </Form>
              ) : null}
              <div className="space-y-10">
                <h4 className="font-semibold">
                  {loaderData.post.replies_count} Replies
                </h4>
                {loaderData.replies.map((reply) => (
                  <Reply
                    key={reply.post_reply_id}
                    content={reply.reply}
                    name={reply.user.name}
                    username={reply.user.username}
                    avatarUrl={reply.user.avatar}
                    timestamp={reply.created_at}
                    topLevel={true}
                    topLevelId={reply.post_reply_id}
                    replies={reply.post_replies as any}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <aside className="col-span-2 space-y-5 border rounded-lg p-6 shadow-sm">
          <div className="flex gap-5">
            <Avatar className="size-14">
              <AvatarFallback>{loaderData.post.author_name[0]}</AvatarFallback>
              {loaderData.post.author_avatar ? (
                <AvatarImage src={loaderData.post.author_avatar} />
              ) : null}
            </Avatar>
            <div className="flex flex-col items-start">
              <Link to={`/users/${loaderData.post.author_username}`}>
                <h4 className="font-medium text-lg">
                  {loaderData.post.author_name}
                </h4>
              </Link>
              <Badge variant="secondary" className="capitalize">
                {loaderData.post.author_role}
              </Badge>
            </div>
          </div>
          <div className="gap-2 text-sm text-muted-foreground flex flex-col">
            <span>
              🎂 Joined{" "}
              {DateTime.fromISO(loaderData.post.author_created_at).toRelative()}
            </span>
            <span>🚀 Lunched {loaderData.post.products_count} products</span>
          </div>
          <fetcher.Form
            method="post"
            action={`/community/${loaderData.post.author_profile_id}/follow`}
          >
            {loaderData.isFollowing ? (
              <Button
                variant="secondary"
                className="w-full bg-muted-foreground/10"
              >
                Following
              </Button>
            ) : (
              <Button variant="outline" className="w-full">
                Follow
              </Button>
            )}
          </fetcher.Form>
        </aside>
      </div>
    </div>
  );
}
