import type { Route } from "./+types/submit-page";
import type { MetaFunction } from "react-router";
import { Hero } from "~/common/components/hero";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";

export const meta: Route.MetaFunction = () => [
  { title: "Submit Product | wemake" },
  { name: "description", content: "Submit your product" },
];

export default function SubmitPage({ actionData }: Route.ComponentProps) {
  return (
    <div>
      <Hero
        title="Submit Your Product"
        subtitle="Share your product with the world"
      />
      <Form className="grid grid-cols-2 gap-10 max-w-screen-lg mx-auto">
        <div className="space-y-6">
          <InputPair
            label="Name"
            description="This is the name of your product"
            id="name"
            name="name"
            required
            type="text"
            placeholder="Name of your product"
          />
          <InputPair
            label="Tagline"
            description="(60 characters max)"
            id="tagline"
            name="tagline"
            required
            type="text"
            placeholder="A concise description of your product"
          />
          <InputPair
            label="URL"
            description="The URL of your product"
            id="url"
            name="url"
            required
            type="text"
            placeholder="https://example.com"
          />
          <InputPair
            textArea
            label="Description"
            description="A detailed description of your product"
            id="description"
            name="description"
            required
            type="text"
            placeholder="A detailed description of your product"
          />
          <SelectPair
            label="Category"
            description="The category of your product"
            name="category"
            required
            placeholder="Select a category"
            options={[
              { label: "AI", value: "ai" },
              { label: "Category 2", value: "2" },
              { label: "Category 3", value: "3" },
            ]}
          />
        </div>
      </Form>
    </div>
  );
}
