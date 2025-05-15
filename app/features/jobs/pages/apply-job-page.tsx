import { useNavigation, Link, Form } from "react-router";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";
import type { Route } from "./+types/apply-job-page";
import { z } from "zod";
import { LoaderCircle } from "lucide-react";

const applyJobFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  address: z.string(),
  location: z.string(),
  message: z.string().max(200),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data, error } = applyJobFormSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return {
      formErrors: error.flatten().fieldErrors,
    };
  }
};

export default function ApplyJobPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <Button variant={"outline"} asChild className="absolute top-10 right-8">
        <Link to="/jobs">cancel</Link>
      </Button>
      <div className="flex items-center flex-col justify-center w-full gap-10">
        <h2 className="text-4xl font-semibold">
          Fill this form to apply this job
        </h2>
        <Form className="w-full max-w-sm space-y-5" method="post">
          <InputPair
            id="name"
            label="Name"
            description="Enter your full name"
            name="name"
            required
            type="text"
            placeholder="Enter your name"
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">
              {actionData?.formErrors?.name?.join(", ")}
            </p>
          )}
          <InputPair
            id="email"
            label="Email"
            description="Enter your email"
            name="email"
            required
            type="email"
            placeholder="e.g. john@gmail.com"
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">
              {actionData?.formErrors?.email?.join(", ")}
            </p>
          )}
          <InputPair
            id="address"
            label="Address"
            description="Enter your address (optional)"
            name="address"
            type="input"
            placeholder="This is optional"
          />
          <InputPair
            id="question1"
            label="location"
            description="Where are you currently located?"
            name="location"
            type="input"
            required
            placeholder="Enter where you are currently located."
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-red-500">
              {actionData?.formErrors?.location?.join(", ")}
            </p>
          )}
          <InputPair
            id="question2"
            label="message"
            description="Send a message to a hiring manager"
            name="message"
            type="input"
            placeholder="Send a message to a hiring manager."
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Send this Form"
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
}
