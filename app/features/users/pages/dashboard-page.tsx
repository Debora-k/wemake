import type { Route } from "./+types/dashboard-page";
import {
  ChartTooltipContent,
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "~/common/components/ui/chart";
import { CartesianGrid, LineChart, Line, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "../queries";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Profile views | wemake" }];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const { data, error } = await client.rpc("get_dashboard_stats", {
    user_id: userId,
  });
  if (error) {
    throw error;
  }
  return {
    chartData: data,
  };
};

const chartConfig = {
  views: {
    label: "👀",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function DashboardPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Profile views</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={loaderData.chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                padding={{ left: 15, right: 15 }}
              />
              <Line
                dataKey="views"
                type="natural"
                stroke="var(--color-views)"
                strokeWidth={2}
                dot={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
