import InputPair from "~/common/components/input-pair";
import type { Route } from "./+types/otp-complete-page";
import { Form, redirect, useNavigation, useSearchParams } from "react-router";
import { Button } from "~/common/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { makeSSRClient } from "~/supa-client";
import { z } from "zod";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Complete OTP | wemake" }];
};

const formSchema = z.object({
  phone: z.string(),
  otp: z.string().length(6).max(6),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) return { fieldErrors: error.flatten().fieldErrors };

  const { phone, otp } = data;
  const { client, headers } = makeSSRClient(request);
  const { error: verifyError } = await client.auth.verifyOtp({
    phone,
    token: otp,
    type: "sms",
  });
  if (verifyError) return { verifyError: verifyError.message };

  return redirect("/", { headers });
};

export default function OtpPage({ actionData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams();
  const phone = searchParams.get("phone");
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";

  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <div className="flex items-center flex-col justify-center w-full gap-10">
        <div className="text-center">
          <h1 className="text-4xl font-semibold">Confirm OTP</h1>
          <p className="text-sm text-muted-foreground">
            Enter the magic code we sent you
          </p>
        </div>
        <Form className="w-full max-w-sm space-y-5" method="post">
          <InputPair
            id="phone"
            label="Phone"
            description="Enter your phone number"
            defaultValue={phone || ""}
            name="phone"
            required
            type="tel"
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors?.phone?.join(", ")}
            </p>
          )}
          <InputPair
            id="otp"
            label="OTP"
            description="Enter the magic code we sent you"
            name="otp"
            required
            type="password"
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors?.otp?.join(", ")}
            </p>
          )}
          {actionData && "verifyError" in actionData && (
            <p className="text-red-500">{actionData.verifyError}</p>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Verify OTP"
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
}
