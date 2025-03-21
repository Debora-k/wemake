import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarProvider,
  SidebarGroupLabel,
  SidebarMenuItem,
} from "~/common/components/ui/sidebar";
import { Outlet } from "react-router";
import { HomeIcon, RocketIcon, SparklesIcon } from "lucide-react";
import { Link, useLocation } from "react-router";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId, getUserProductsByUserId } from "../queries";
import type { Route } from "./+types/dashboard-layout";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const products = await getUserProductsByUserId(client, userId);
  return { products };
};

export default function DashboardLayout({ loaderData }: Route.ComponentProps) {
  const location = useLocation();
  return (
    <SidebarProvider className="max-h-[calc(100vh-14rem)] overflow-hidden h-[calc(100vh-14rem)] min-h-full">
      <Sidebar className="pt-16" variant="floating">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/my/dashboard"}
                >
                  <Link to="/my/dashboard">
                    <HomeIcon className="size-4" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/my/dashboard"}
                >
                  <Link to="/my/dashboard/ideas">
                    <SparklesIcon className="size-4" />
                    <span>Ideas</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Product Analytics</SidebarGroupLabel>
            <SidebarMenu>
              {loaderData.products.map((product) => (
                <SidebarMenuItem key={product.product_id}>
                  <SidebarMenuButton asChild>
                    <Link to={`/my/dashboard/products/${product.product_id}`}>
                      <RocketIcon className="size-4" />
                      <span>{product.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="h-full w-full overflow-y-scroll">
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
