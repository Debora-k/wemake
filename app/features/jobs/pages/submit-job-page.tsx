import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-job-page";
import { Form, redirect } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGES } from "../constants";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { z } from "zod";
import { createJob } from "../mutations";
export const meta: Route.MetaFunction = () => {
  return [
    { title: `Post a Job | wemake` },
    { name: "description", content: "Post a Job" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
};

export const formSchema = z.object({
  position: z.string().max(40),
  overview: z.string().max(400),
  responsibilities: z.string().max(1000),
  qualifications: z.string().max(1000),
  benefits: z.string().max(1000),
  skills: z.string().max(1000),
  company_name: z.string().max(40),
  company_logo_url: z.string().max(100),
  company_location: z.string().max(100),
  apply_url: z.string().max(1000),
  job_type: z.enum(
    JOB_TYPES.map((type) => type.value) as [string, ...string[]]
  ),
  location: z.enum(
    LOCATION_TYPES.map((location) => location.value) as [string, ...string[]]
  ),
  salary_range: z.enum(SALARY_RANGES),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return { fieldErrors: error.flatten().fieldErrors };
  }
  const { job_id } = await createJob(client, data);
  return redirect(`/jobs/${job_id}`);
};
export default function SubmitJobPage({ actionData }: Route.ComponentProps) {
  return (
    <div>
      <Hero
        title="Post a Job"
        subtitle="Post a Job to wemake. We'll review your job and get back to you as soon as possible."
      />
      <Form
        className="max-w-screen-2xl flex flex-col items-center gap-10 mx-auto"
        method="post"
      >
        <div className="grid grid-cols-3 w-full gap-10">
          <InputPair
            id="position"
            label="Position"
            description="(40 characters max)"
            name="position"
            maxLength={40}
            type="text"
            required
            placeholder="e.g. Software Engineer"
          />
          {actionData && actionData.fieldErrors && (
            <div className="text-red-500">
              {actionData.fieldErrors.position?.join(", ")}
            </div>
          )}
          <InputPair
            id="overview"
            label="Overview"
            description="(1000 characters max)"
            name="overview"
            maxLength={400}
            type="text"
            required
            placeholder="e.g. We are looking for a Software Engineer who has experienced in React and Node.js."
            textArea
          />
          {actionData && actionData.fieldErrors && (
            <div className="text-red-500">
              {actionData.fieldErrors.overview?.join(", ")}
            </div>
          )}
          <InputPair
            id="responsibilities"
            label="Responsibilities"
            description="(1000 characters max, comma separated)"
            name="responsibilities"
            maxLength={1000}
            type="text"
            required
            placeholder="e.g. Implement new features, Refactor code, Debug issues"
            textArea
          />
          {actionData && actionData.fieldErrors && (
            <div className="text-red-500">
              {actionData.fieldErrors.responsibilities?.join(", ")}
            </div>
          )}
          <InputPair
            id="qualifications"
            label="Qualifications"
            description="(1000 characters max, comma separated)"
            name="qualifications"
            maxLength={1000}
            type="text"
            required
            placeholder="e.g. Bachelor's degree in Computer Science or equivalent, 1 year or less of experience in React and Node.js"
            textArea
          />
          {actionData && actionData.fieldErrors && (
            <div className="text-red-500">
              {actionData.fieldErrors.qualifications?.join(", ")}
            </div>
          )}
          <InputPair
            id="benefits"
            label="Benefits"
            description="(1000 characters max, comma separated)"
            name="benefits"
            maxLength={1000}
            type="text"
            required
            placeholder="e.g. Health insurance, Dental insurance, Vision insurance, etc."
            textArea
          />
          {actionData && actionData.fieldErrors && (
            <div className="text-red-500">
              {actionData.fieldErrors.benefits?.join(", ")}
            </div>
          )}
          <InputPair
            id="skills"
            label="Skills"
            description="(1000 characters max, comma separated)"
            name="skills"
            maxLength={1000}
            type="text"
            required
            placeholder="e.g. React, Node.js, TypeScript, etc."
            textArea
          />
          {actionData && actionData.fieldErrors && (
            <div className="text-red-500">
              {actionData.fieldErrors.skills?.join(", ")}
            </div>
          )}
          <InputPair
            id="company_name"
            label="Company Name"
            description="(40 characters max)"
            name="company_name"
            maxLength={40}
            type="text"
            required
            placeholder="e.g. Google"
          />
          {actionData && actionData.fieldErrors && (
            <div className="text-red-500">
              {actionData.fieldErrors.company_name?.join(", ")}
            </div>
          )}
          <InputPair
            id="company_logo_url"
            label="Company Logo URL"
            description="(1000 characters max)"
            name="company_logo_url"
            maxLength={100}
            type="text"
            required
            placeholder="e.g. https://example.com/logo.png"
          />
          {actionData && actionData.fieldErrors && (
            <div className="text-red-500">
              {actionData.fieldErrors.company_logo_url?.join(", ")}
            </div>
          )}
          <InputPair
            id="company_location"
            label="Company Location"
            description="(100 characters max)"
            name="company_location"
            maxLength={100}
            type="text"
            required
            placeholder="e.g. San Francisco, CA"
          />
          {actionData && actionData.fieldErrors && (
            <div className="text-red-500">
              {actionData.fieldErrors.company_location?.join(", ")}
            </div>
          )}
          <InputPair
            id="apply_url"
            label="Apply URL"
            description="(1000 characters max)"
            name="apply_url"
            maxLength={1000}
            type="text"
            required
            placeholder="e.g. https://example.com/apply"
          />
          {actionData && actionData.fieldErrors && (
            <div className="text-red-500">
              {actionData.fieldErrors.apply_url?.join(", ")}
            </div>
          )}
          <SelectPair
            label="Job Type"
            description="Select the type of job"
            name="job_type"
            required
            placeholder="Select the type of job"
            options={JOB_TYPES.map((type) => ({
              label: type.label,
              value: type.value,
            }))}
          />
          {actionData && actionData.fieldErrors && (
            <div className="text-red-500">
              {actionData.fieldErrors.job_type?.join(", ")}
            </div>
          )}
          <SelectPair
            label="Job Location"
            description="Select the location of the job"
            name="location"
            required
            placeholder="Select the location of the job"
            options={LOCATION_TYPES.map((location) => ({
              label: location.label,
              value: location.value,
            }))}
          />
          {actionData && actionData.fieldErrors && (
            <div className="text-red-500">
              {actionData.fieldErrors.location?.join(", ")}
            </div>
          )}
          <SelectPair
            label="Salary Range"
            description="Select the salary of the job"
            name="salary_range"
            required
            placeholder="Select the salary of the job"
            options={SALARY_RANGES.map((salary) => ({
              label: salary,
              value: salary,
            }))}
          />
          {actionData && actionData.fieldErrors && (
            <div className="text-red-500">
              {actionData.fieldErrors.salary_range?.join(", ")}
            </div>
          )}
        </div>
        <Button type="submit" className="w-full max-w-sm" size="lg">
          Post job for $100
        </Button>
      </Form>
    </div>
  );
}
