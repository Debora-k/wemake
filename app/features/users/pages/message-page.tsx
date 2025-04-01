import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "~/common/components/ui/avatar";
import type { Route } from "./+types/message-page";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { Form, useOutletContext } from "react-router";
import { Textarea } from "~/common/components/ui/textarea";
import { Button } from "~/common/components/ui/button";
import { SendIcon } from "lucide-react";
import { MessageBubble } from "../components/message-bubble";
import {
  createMessage,
  getMessageRoomMembers,
  getMessagesByMessageRoomId,
} from "../queries";
import { getLoggedInUserId } from "../queries";
import { makeSSRClient } from "~/supa-client";
import { useEffect, useRef } from "react";
export const meta: Route.MetaFunction = () => {
  return [{ title: "Message | wemake" }];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const messages = await getMessagesByMessageRoomId(
    client,
    params.messageRoomId,
    userId
  );
  const members = await getMessageRoomMembers(
    client,
    params.messageRoomId,
    userId
  );
  return { messages, members };
};

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const message = formData.get("message");
  await createMessage(client, message as string, params.messageRoomId, userId);
  return { ok: true };
};

export default function MessagePage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { userId } = useOutletContext<{ userId: string }>();
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (actionData?.ok) {
      formRef.current?.reset(); // to clear the sent message in the form
    }
  }, [actionData]);
  return (
    <div className="h-full flex flex-col justify-between">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="size-14">
            <AvatarImage src={loaderData.members?.profile?.avatar ?? ""} />
            <AvatarFallback>
              {loaderData.members?.profile?.name[0] ?? ""}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0">
            <CardTitle className="text-xl">
              {loaderData.members?.profile?.name ?? ""}
            </CardTitle>
            <CardDescription>
              <span className="text-sm text-muted-foreground">2 hours ago</span>
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="py-10 overflow-y-scroll space-y-4 flex flex-col justify-start h-full">
        {loaderData.messages.map((message) => (
          <MessageBubble
            key={message.message_id}
            content={message.content}
            avatarUrl={message.sender?.avatar ?? ""}
            avatarFallback={message.sender?.name[0] ?? ""}
            isCurrentUser={message.sender?.profile_id === userId}
          />
        ))}
      </div>
      <Card>
        <CardHeader>
          <Form
            ref={formRef}
            method="post"
            className="relative flex justify-end items-center"
          >
            <Textarea
              placeholder="Type your message here."
              rows={2}
              className="resize-none"
              required
              name="message"
            />
            <Button type="submit" size="icon" className="absolute right-4">
              <SendIcon className="size-4" />
            </Button>
          </Form>
        </CardHeader>
      </Card>
    </div>
  );
}
