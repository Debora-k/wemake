import InputPair from "~/common/components/input-pair";
import type { Route } from "./+types/settings-page";
import { Form } from "react-router";
import SelectPair from "~/common/components/select-pair";
import { useState } from "react";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { getUserById } from "../queries";
import { getLoggedInUserId } from "../queries";
import { z } from "zod";
import { updateUser, updateUserAvatar } from "../mutations";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "~/common/components/ui/alert";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Settings | wemake" }];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const user = await getUserById(client, { id: userId });

  return { user };
};

const formSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().min(1).default(""),
  headline: z.string().min(1).default(""),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const avatar = formData.get("avatar");
  if (avatar && avatar instanceof File) {
    if (avatar.size <= 2097152 && avatar.type.startsWith("image/")) {
      const { data, error } = await client.storage
        .from("avatars")
        .upload(`${userId}/${Date.now()}`, avatar, {
          contentType: avatar.type,
          upsert: false,
        });
      if (error) {
        console.log(error);
        return { formErrors: { avatar: ["Failed to upload avatar"] } };
      }
      const {
        data: { publicUrl },
      } = await client.storage.from("avatars").getPublicUrl(data.path);
      await updateUserAvatar(client, {
        id: userId,
        avatarUrl: publicUrl,
      });
    } else {
      return { formErrors: { avtar: ["Invalid file size of type"] } };
    }
  } else {
    const { success, error, data } = formSchema.safeParse(
      Object.fromEntries(formData)
    );
    if (!success) {
      return { formErrors: error.flatten().fieldErrors };
    }
    const { name, role, bio, headline } = data;
    await updateUser(client, {
      id: userId,
      name,
      role: role as
        | "developer"
        | "designer"
        | "product_manager"
        | "founder"
        | "other",
      bio,
      headline,
    });
    return { ok: true };
  }
};

export default function SettingsPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const [avatar, setAvatar] = useState<string | null>(loaderData.user.avatar);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setAvatar(URL.createObjectURL(file));
    }
  };
  return (
    <div className="space-y-20">
      <div className="grid grid-cols-6 gap-20">
        <div className="col-span-4 flex flex-col gap-10">
          {actionData?.ok ? (
            <Alert>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your profile has been updated successfully.
              </AlertDescription>
            </Alert>
          ) : null}
          <h2 className="text-2xl font-bold">Edit profile</h2>
          <Form className="flex flex-col w-2/3 gap-5" method="post">
            <InputPair
              label="Name"
              description="This will be displayed on your profile and in search results."
              name="name"
              id="name"
              required
              placeholder="John Doe"
              defaultValue={loaderData.user.name}
            />
            {actionData?.formErrors && "name" in actionData.formErrors ? (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {actionData.formErrors?.name?.join(", ")}
                </AlertDescription>
              </Alert>
            ) : null}
            <SelectPair
              label="Role"
              description="This will be displayed on your profile and in search results."
              name="role"
              required
              placeholder="Select your role"
              defaultValue={loaderData.user.role}
              options={[
                { label: "Designer", value: "designer" },
                { label: "Developer", value: "developer" },
                { label: "Product Manager", value: "product_manager" },
                { label: "Founder", value: "founder" },
                { label: "Other", value: "other" },
              ]}
            />
            {actionData?.formErrors && "role" in actionData.formErrors ? (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {actionData.formErrors?.role?.join(", ")}
                </AlertDescription>
              </Alert>
            ) : null}
            <InputPair
              label="Bio"
              description="This will be displayed on your profile and in search results."
              name="bio"
              id="bio"
              defaultValue={loaderData.user.bio ?? ""}
              required
              textArea
            />
            {actionData?.formErrors && "bio" in actionData.formErrors ? (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {actionData.formErrors?.bio?.join(", ")}
                </AlertDescription>
              </Alert>
            ) : null}
            <InputPair
              label="Headline"
              description="An introduction to your profile."
              name="headline"
              id="headline"
              defaultValue={loaderData.user.headline ?? ""}
              required
              textArea
            />
            {actionData?.formErrors && "headline" in actionData.formErrors ? (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {actionData.formErrors?.headline?.join(", ")}
                </AlertDescription>
              </Alert>
            ) : null}
            <Button className="w-full">Update Profile</Button>
          </Form>
        </div>
        <Form
          className="col-span-2 row-span-1 p-6 rounded-lg border shadow-md"
          method="post"
          encType="multipart/form-data"
        >
          <span className="text-sm font-bold text-muted-foreground uppercase">
            Update Avatar
          </span>
          <div className="space-y-5">
            <div className="size-40 rounded-full shadow-xl overflow-hidden">
              {avatar ? (
                <img src={avatar} className="w-full h-full object-cover" />
              ) : null}
            </div>
            <Input
              type="file"
              className="w-1/2"
              onChange={onChange}
              required
              name="avatar"
            />
            {actionData?.formErrors && "avatar" in actionData.formErrors ? (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {actionData.formErrors?.avatar?.join(", ")}
                </AlertDescription>
              </Alert>
            ) : null}
            <div className="flex flex-col text-xs">
              {" "}
              <span className="text-muted-foreground">
                Recommended size: 128x128px
              </span>
              <span className="text-muted-foreground">
                Allowed formats: PNG, JPEG
              </span>
              <span className="text-muted-foreground">
                Maximum file size: 2MB
              </span>
            </div>
            <Button className="w-full">Update Avatar</Button>{" "}
          </div>
        </Form>
      </div>
    </div>
  );
}
