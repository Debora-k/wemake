import InputPair from "~/common/components/input-pair";
import type { Route } from "./+types/otp-start-page";
import { Form, redirect, useNavigation } from "react-router";
import { Button } from "~/common/components/ui/button";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";
import { LoaderCircle } from "lucide-react";
export const meta: Route.MetaFunction = () => {
  return [{ title: "Start OTP | wemake" }];
};

const formSchema = z.object({
  phone: z.string(),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data } = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) return { error: "Invalid phone number" };

  const { phone } = data;
  const { client } = makeSSRClient(request);
  const { error } = await client.auth.signInWithOtp({
    phone,
    options: {
      shouldCreateUser: true,
    },
  });
  console.log(error);
  if (error) return { error: "Failed to send OTP" };

  return redirect(`/auth/otp/complete?phone=${phone}`);
};

export default function OtpStartPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";

  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <div className="flex items-center flex-col justify-center w-full gap-10">
        <div className="text-center">
          <h1 className="text-4xl font-semibold">Login with OTP</h1>
          <p className="text-sm text-muted-foreground">
            We will send you a 6-digit code to verify your account
          </p>
        </div>
        <Form className="w-full max-w-sm space-y-5" method="post">
          <InputPair
            id="phone"
            label="Phone"
            description="Enter your phone number"
            name="phone"
            required
            type="tel"
          />
          {actionData && "error" in actionData && (
            <p className="text-red-500">{actionData.error}</p>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Send OTP"
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
}
