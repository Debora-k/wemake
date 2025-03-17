import { Hero } from "~/common/components/hero";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/submit-page";
import { getLoggedInUserId } from "~/features/users/queries";
import { getTopics } from "../queries";
import { z } from "zod";

export const meta: Route.MetaFunction = () => [
  { title: "Submit Post | wemake" },
];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
  const topics = await getTopics(client);
  return { topics };
};

const formSchema = z.object({
  title: z.string().min(1).max(100),
  category: z.string().min(1).max(100),
  content: z.string().min(1).max(1000),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, error, data } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return {
      fieldErrors: error.flatten().fieldErrors,
    };
  }
  const { title, category, content } = data;
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
            label: topic.name,
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
