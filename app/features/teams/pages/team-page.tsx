import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import type { Route } from "./+types/team-page";
import { Hero } from "~/common/components/hero";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { getTeamById } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => [
  { title: "Team Details | wemake" },
];

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const team = await getTeamById(client, params.teamId);
  return { team };
};

export default function TeamPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero title={`Join ${loaderData.team.team_leader.name}'s Team`} />
      <div className="grid grid-cols-6 gap-40 items-start">
        <div className="col-span-4 grid grid-cols-4 gap-5">
          {[
            {
              title: "Product Name",
              value: loaderData.team.product_name,
            },
            {
              title: "Stage",
              value: loaderData.team.product_stage,
            },
            {
              title: "Team size",
              value: loaderData.team.team_size,
            },
            {
              title: "Available equity",
              value: `${loaderData.team.equity_split}%`,
            },
          ].map((item) => (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </CardTitle>
                <CardContent className="p-0 font-bold text-2xl capitalize">
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </CardContent>
              </CardHeader>
            </Card>
          ))}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Looking for
              </CardTitle>
              <CardContent className="p-0 font-bold text-2xl">
                {loaderData.team.roles.split(",").map((item) => (
                  <Badge variant="secondary">{item}</Badge>
                ))}
              </CardContent>
            </CardHeader>
          </Card>
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Idea Description
              </CardTitle>
              <CardContent className="p-0 font-medium text-lg">
                <p>{loaderData.team.product_description}</p>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <aside className="col-span-2 space-y-5 border rounded-lg p-6 shadow-sm">
          <div className="flex gap-5">
            <Avatar className="size-14">
              <AvatarFallback>
                {loaderData.team.team_leader.name[0]}
              </AvatarFallback>
              {loaderData.team.team_leader.avatar ? (
                <AvatarImage src={loaderData.team.team_leader.avatar} />
              ) : null}
            </Avatar>
            <div className="flex flex-col">
              <h4 className="font-medium text-lg">
                {loaderData.team.team_leader.name}
              </h4>
              <Badge variant="secondary" className="capitalize">
                {loaderData.team.team_leader.role}
              </Badge>
            </div>
          </div>
          <Form className="space-y-5">
            <InputPair
              label="Introduce yourself"
              name="introduction"
              id="introduction"
              type="text"
              description="Introduce yourself to the team."
              placeholder="e.g. I'm a product manager with 5 years of experience in the industry."
              required
              textArea
            />
            <Button type="submit" className="w-full">
              Get in touch
            </Button>
          </Form>
        </aside>
      </div>
    </div>
  );
}
