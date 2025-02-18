import { Hero } from "~/common/components/hero";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";

export default function SubmitPostPage() {
  return (
    <div className="pace-y-20">
      <Hero
        title="Create Discussion"
        subtitle="Share your thoughts and ideas with the community"
      />
      <Form>
        <InputPair
          label="Title"
          name="title"
          id="title"
          description="40 characters or less"
          placeholder="i.e. what is the best way to learn React?"
        />
        <SelectPair
          label="Category"
          name="category"
          description="Select the category that best fits your post"
          required
          placeholder="i.e. React"
          options={[
            { label: "React", value: "react" },
            { label: "Vue", value: "vue" },
            { label: "Angular", value: "angular" },
            { label: "Svelte", value: "svelte" },
          ]}
        />
      </Form>
    </div>
  );
}
