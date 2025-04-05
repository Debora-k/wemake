import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { insertIdeas } from "../mutations";
import { adminClient } from "~/supa-client";
import type { Route } from "./+types/generate-idea-page";

const openai = new OpenAI();

const IdeaSchema = z.object({
  title: z.string(),
  description: z.string({
    description: "A short description of the idea. Max 100 words.",
  }),
  problem: z.string(),
  solution: z.string(),
  category: z.enum([
    "web service",
    "tech",
    "bussiness",
    "health",
    "education",
    "finance",
    "information",
    "application",
    "other",
  ]),
});

const ResponesSchema = z.object({
  ideas: z.array(IdeaSchema),
});

// after added cron, changed to action from loader
export const action = async ({ request }: Route.ActionArgs) => {
  if (request.method !== "POST") {
    return new Response(null, {
      status: 404,
    });
  }
  const header = request.headers.get("X-POTATO");
  if (!header || header !== "X-TOMATO") {
    return new Response(null, {
      status: 404,
    });
  }

  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content:
          "Suggest a title of idea and elevator pitch of startup ideas that can be built by small teams. Based on other people's questions or ideas, you can suggest some ideas that can be a web service or applications.",
      },
      {
        role: "user",
        content:
          "For example: 'An app that helps you can find the best deals on groceries.', or 'A platform to hire a programmer per hour.'",
      },
      {
        role: "user",
        content: "Please generate 10 ideas.",
      },
    ],
    response_format: zodResponseFormat(ResponesSchema, "ideas"),
  });
  const discriptions = completion.choices[0].message.parsed?.ideas.map(
    (idea) => idea.description
  );
  if (!discriptions) {
    return Response.json(
      {
        error: "No ideas generated",
      },
      { status: 400 }
    );
  }
  await insertIdeas(adminClient, discriptions);
  return Response.json({
    ok: true,
  });
};
