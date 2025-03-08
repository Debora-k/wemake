import { TeamCard } from "../components/team-card";
import { getTeams } from "../queries";
import type { Route } from "./+types/teams-page";
import { Hero } from "~/common/components/hero";

export const meta: Route.MetaFunction = () => [{ title: "Teams | wemake" }];

export const loader = async () => {
  const teams = await getTeams({
    limit: 8,
  });
  return { teams };
};

export default function TeamsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero title="Teams" subtitle="Find a team looking for a new memeber." />
      <div className="grid grid-cols-4 gap-4">
        {loaderData.teams.map((team) => (
          <TeamCard
            key={team.team_id}
            id={team.team_id}
            leaderUserName={team.team_leader.username}
            leaderAvatar={team.team_leader.avatar}
            positions={team.roles.split(",")}
            project={team.product_description}
          />
        ))}
      </div>
    </div>
  );
}
