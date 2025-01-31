import type { MetaFunction } from "react-router";

interface HomePageProps {
  loaderData: {
    message: string;
  };
}

export function meta({}: MetaFunction) {
  return [
    { title: "Home" },
    { name: "description", content: "Welcome to our application" },
  ];
}

export function loader({ request }: { request: Request }) {
  return {
    message: "Welcome to the home page",
  };
}

export function action({ request }: { request: Request }) {
  return {};
}

export default function HomePage({ loaderData }: HomePageProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold">{loaderData.message}</h1>
    </main>
  );
}
