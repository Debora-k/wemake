import { Form, redirect } from "react-router";
import type { Route } from "./+types/submit-team-page";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { PRODUCT_STAGE } from "../constants";
import { getLoggedInUserId } from "~/features/users/queries";
import { makeSSRClient } from "~/supa-client";
import { z } from "zod";
import { createTeam } from "../mutations";

export const meta: Route.MetaFunction = () => [
  { title: "Create Team | wemake" },
];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
};

export const formSchema = z.object({
  name: z.string().max(20),
  stage: z.string(),
  size: z.coerce.number().min(1).max(100),
  equity: z.coerce.number().min(1).max(100),
  roles: z.string().max(100),
  description: z.string().max(200),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return { fieldErrors: error.flatten().fieldErrors };
  }
  const { team_id } = await createTeam(client, userId, { ...data });
  return redirect(`/teams/${team_id}`);
};

export default function SubmitTeamPage({ actionData }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero
        title="Create Team"
        subtitle="Create a team to find your team mates."
      />
      <Form
        className="max-w-screen-2xl flex flex-col items-center gap-10 mx-auto"
        method="post"
      >
        <div className="grid grid-cols-3 w-full gap-10">
          <InputPair
            label="What is the name of your product?"
            name="name"
            description="(20 characters max)"
            maxLength={20}
            type="text"
            id="name"
            required
          />
          {actionData && actionData.fieldErrors && (
            <div className="text-red-500">
              {actionData.fieldErrors.name?.join(", ")}
            </div>
          )}
          <SelectPair
            label="What is the stage of your product?"
            name="stage"
            description="(Select one)"
            required
            placeholder="Select one"
            options={PRODUCT_STAGE}
          />
          {actionData && actionData.fieldErrors && (
            <div className="text-red-500">
              {actionData.fieldErrors.stage?.join(", ")}
            </div>
          )}
          <InputPair
            label="What is the size of your team?"
            name="size"
            description="(1-100)"
            maxLength={100}
            minLength={1}
            type="number"
            id="size"
            required
          />
          {actionData && actionData.fieldErrors && (
            <div className="text-red-500">
              {actionData.fieldErrors.size?.join(", ")}
            </div>
          )}
          <InputPair
            label="How much equity are you willing to give?"
            name="equity"
            description="(each %)"
            maxLength={100}
            minLength={1}
            type="number"
            id="equity"
          />
          {actionData && actionData.fieldErrors && (
            <div className="text-red-500">
              {actionData.fieldErrors.equity?.join(", ")}
            </div>
          )}
          <InputPair
            label="What roles are you looking for?"
            placeholder="e.g. Frontend Developer, Backend Developer, etc."
            name="roles"
            description="(comma separated)"
            maxLength={100}
            minLength={1}
            type="text"
            id="roles"
          />
          {actionData && actionData.fieldErrors && (
            <div className="text-red-500">
              {actionData.fieldErrors.roles?.join(", ")}
            </div>
          )}
          <InputPair
            label="What is the description of your product?"
            name="description"
            placeholder="e.g. We are building a new social media platform for dogs to connect with each other."
            description="(200 characters max)"
            maxLength={200}
            type="text"
            id="description"
            required
            textArea
          />
          {actionData && actionData.fieldErrors && (
            <div className="text-red-500">
              {actionData.fieldErrors.description?.join(", ")}
            </div>
          )}
        </div>
        <Button type="submit" className="w-full max-w-sm" size="lg">
          Create Team
        </Button>
      </Form>
    </div>
  );
}
