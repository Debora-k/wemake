import { JobCard } from "../components/job-card";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGES } from "../constants";
import type { Route } from "./+types/jobs-page";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import { data, useSearchParams } from "react-router";
import { cn } from "~/lib/utils";
import { getJobs } from "../queries";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Jobs | wemake.jobs" },
    { name: "description", content: "Find your dream job here" },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  const { client, headers } = makeSSRClient(request);
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!success) {
    throw data({
      error: "Invalid search params",
      message: "Invalid search params",
      status: 400,
    });
  }
  const jobs = await getJobs(client, {
    limit: 40,
    location: parsedData.location,
    type: parsedData.type,
    salary: parsedData.salary,
  });
  return { jobs };
}

const searchParamsSchema = z.object({
  type: z
    .enum(
      JOB_TYPES.map((type) => type.value) as [
        (typeof JOB_TYPES)[number]["value"],
        ...Array<(typeof JOB_TYPES)[number]["value"]>
      ]
    )
    .optional(),
  location: z
    .enum(
      LOCATION_TYPES.map((type) => type.value) as [
        (typeof LOCATION_TYPES)[number]["value"],
        ...Array<(typeof LOCATION_TYPES)[number]["value"]>
      ]
    )
    .optional(),
  salary: z.enum(SALARY_RANGES).optional(),
});

export default function JobsPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const onFilterClick = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  return (
    <div className="space-y-20">
      <Hero title="Jobs" subtitle="Companies looking for top talent" />
      <div className="grid grid-cols-1 xl:grid-cols-6gap-20 items-start">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:col-span-4 gap-5">
          {loaderData.jobs.map((job) => (
            <JobCard
              key={job.job_id}
              id={job.job_id}
              company={job.company_name}
              companyLogoUrl={job.company_logo}
              companyHq={job.company_location}
              title={job.position}
              type={job.job_type}
              position={job.location}
              salary={job.salary_range}
              createdAt={job.created_at}
            />
          ))}
        </div>
        <div className="xl:col-span-2 sticky top-20 flex flex-col gap-10">
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm font-bold text-muted-foreground">Type</h4>
            <div className="flex flex-wrap gap-2">
              {" "}
              {JOB_TYPES.map((type) => (
                <Button
                  variant="outline"
                  onClick={() => onFilterClick("type", type.value)}
                  className={cn(
                    type.value === searchParams.get("type") ? "bg-accent" : ""
                  )}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm font-bold text-muted-foreground">
              Location
            </h4>
            <div className="flex flex-wrap gap-2">
              {" "}
              {LOCATION_TYPES.map((type) => (
                <Button
                  variant="outline"
                  onClick={() => onFilterClick("location", type.value)}
                  className={cn(
                    type.value === searchParams.get("location")
                      ? "bg-accent"
                      : ""
                  )}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm font-bold text-muted-foreground">Salary</h4>
            <div className="flex flex-wrap gap-2">
              {" "}
              {SALARY_RANGES.map((range) => (
                <Button
                  variant="outline"
                  onClick={() => onFilterClick("salary", range)}
                  className={cn(
                    range === searchParams.get("salary") ? "bg-accent" : ""
                  )}
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2.5">
            <Button
              variant="secondary"
              className="w-1/4"
              onClick={() => {
                setSearchParams({});
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
