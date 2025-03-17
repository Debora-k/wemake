import { Hero } from "~/common/components/hero";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/submit-page";
import { getLoggedInUserId } from "~/features/users/queries";
import { getTopics } from "../queries";

export const meta: Route.MetaFunction = () => [
  { title: "Submit Post | wemake" },
];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const topics = await getTopics(client);
  return { topics };
};

export default function SubmitPostPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="pace-y-20">
      <Hero
        title="Create Discussion"
        subtitle="Share your thoughts and ideas with the community"
      />
      <Form className="flex flex-col gap-10 max-w-screen-md mx-auto">
        <InputPair
          label="Title"
          name="title"
          id="title"
          description="40 characters or less"
          placeholder="i.e. what is the best way to learn React?"
        />
        <SelectPair
          label="Category"
          name="category"
          description="Select the category that best fits your post"
          required
          placeholder="i.e. React"
          options={loaderData.topics.map((topic) => ({
            lable: topic.name,
            value: topic.slug,
          }))}
        />
        <InputPair
          label="Content"
          name="content"
          id="content"
          textArea
          description="1000 characters max"
          placeholder="i.e. I'm having trouble understanding the concept of..."
        />
        <Button className="mx-auto">Create Discussion</Button>
      </Form>
    </div>
  );
}
