import { Hero } from "~/common/components/hero";
import { Await, Form, Link, useSearchParams } from "react-router";
import { Suspense } from "react";
import type { Route } from "./+types/community-page";
import { Button } from "~/common/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "~/common/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { PERIOD_OPTIONS, SORT_OPTIONS } from "../constants";
import { Input } from "~/common/components/ui/input";
import { PostCard } from "../components/post-card";
import { getPosts, getTopics } from "../queries";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Community | wemake" }];
};

const searchParamsSchema = z.object({
  sorting: z.enum(["newest", "popular"]).optional().default("newest"),
  period: z
    .enum(["all", "today", "week", "month", "year"])
    .optional()
    .default("all"),
  keyword: z.string().optional(),
  topic: z.string().optional(),
});
export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const url = new URL(request.url);
  const searchParams = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!searchParams.success) {
    throw new Response("Invalid search params", { status: 400 });
  }
  const [topics, posts] = await Promise.all([
    getTopics(client),
    getPosts(client, {
      limit: 20,
      sorting: searchParams.data.sorting,
      period: searchParams.data.period,
      keyword: searchParams.data.keyword,
      topic: searchParams.data.topic,
    }),
  ]);
  return { topics, posts };
};

export default function CommunityPage({ loaderData }: Route.ComponentProps) {
  const { topics, posts } = loaderData;
  const [searchParams, setSearchParams] = useSearchParams();
  const sorting = searchParams.get("sorting") || "newest";
  const period = searchParams.get("period") || "all";
  return (
    <div>
      <Hero
        title="Community | wemake"
        subtitle="Share your ideas, ask questions, and get help from the community."
      />
      <div className="grid grid-cols-6 items-start gap-40">
        <div className="col-span-4 space-y-10">
          <div className="flex justify-between">
            <div className="space-y-5 w-full">
              <div className="flex items-center gap-5">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <span className="text-sm capitalize">{sorting}</span>
                    <ChevronDownIcon className="size-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {SORT_OPTIONS.map((option) => (
                      <DropdownMenuCheckboxItem
                        className="capitalize cursor-pointer"
                        key={option}
                        onCheckedChange={(checked: boolean) => {
                          if (checked) {
                            searchParams.set("sorting", option);
                            setSearchParams(searchParams);
                          }
                        }}
                      >
                        {option}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {sorting === "popular" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <span className="text-sm capitalize">{period}</span>
                      <ChevronDownIcon className="size-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {PERIOD_OPTIONS.map((option) => (
                        <DropdownMenuCheckboxItem
                          className="capitalize cursor-pointer"
                          key={option}
                          onCheckedChange={(checked: boolean) => {
                            if (checked) {
                              searchParams.set("period", option);
                              setSearchParams(searchParams);
                            }
                          }}
                        >
                          {option}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              <Form className="w-2/3">
                <Input
                  type="text"
                  name="keyword"
                  placeholder="Search for discussions"
                />
              </Form>
            </div>
            <Button asChild>
              <Link to="/community/submit">Create Discussion</Link>
            </Button>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={posts}>
              {(data) => (
                <div className="space-y-5">
                  {data.map((post) => (
                    <PostCard
                      key={post.post_id}
                      id={post.post_id}
                      title={post.title}
                      author={post.author}
                      authorAvatar={post.author_avatar}
                      category={post.topic}
                      createdAt={post.created_at}
                      votesCount={post.upvotes}
                      expended
                    />
                  ))}
                </div>
              )}
            </Await>
          </Suspense>
        </div>
        <aside className="col-span-2 space-y-5">
          <span className="text-sm font-bold text-muted-foreground uppercase">
            Topics
          </span>
          <div className="flex flex-col gap-2 items-start">
            {topics.map((topic) => (
              <Button variant="link" asChild key={topic.slug} className="pl-0">
                <Link
                  to={`/community?topic=${topic.slug}`}
                  className="font-semibold"
                >
                  {topic.name}
                </Link>
              </Button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}
