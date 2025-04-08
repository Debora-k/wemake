import { Resend } from "resend";
import { render } from "@react-email/components";
import type { Route } from "./+types/welcome-page";
import { WelcomeUserEmail } from "react-email-starter/emails/welcome-user";

const client = new Resend(process.env.RESEND_API_KEY);

export const loader = async ({ params }: Route.LoaderArgs) => {
  //after adding RESEND, won't need this emailHtml
  const emailHtml = await render(
    <WelcomeUserEmail username={params.username} />
  );
  const { data, error } = await client.emails.send({
    from: "Debora <debora@potato.com>",
    to: ["debora0104k@gmail.com"],
    subject: "Welcome to Wemake!",
    html: emailHtml,
    //react: <WelcomeUserEmail username={params.username} />,
  });
  return Response.json({
    data,
    error,
    emailHtml,
  });
};
