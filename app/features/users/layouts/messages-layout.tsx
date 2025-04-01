import type { Route } from "./+types/messages-layout";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarProvider,
} from "~/common/components/ui/sidebar";
import { Outlet, useOutletContext } from "react-router";
import { MessagesCard } from "../components/messages-card";
import { getLoggedInUserId, getMessages } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const messages = await getMessages(client, userId);
  return { messages };
};

export default function MessagesLayout({ loaderData }: Route.ComponentProps) {
  const { userId } = useOutletContext<{ userId: string }>();
  return (
    <SidebarProvider className="max-h-[calc(100vh-14rem)] overflow-hidden h-[calc(100vh-14rem)] min-h-full">
      <Sidebar className="pt-16" variant="floating">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {loaderData.messages.map((message) => (
                <MessagesCard
                  key={message.message_room_id}
                  id={message.message_room_id.toString()}
                  avatarUrl={message.avatar}
                  name={message.name}
                  lastMessage={message.last_message}
                  lastMessageSenderName={message.last_message_sender_name}
                />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="h-full w-full">
        <Outlet context={{ userId }} />
      </div>
    </SidebarProvider>
  );
}
