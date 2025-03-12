import type { Route } from "./+types/search-page";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { ProductPagination } from "~/common/components/product-pagination";
import { Form } from "react-router";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { getPagesBySearch, getProductsBySearch } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Search Products | wemake" },
    { name: "description", content: "Search for products" },
  ];
};

const paramsSchema = z.object({
  q: z.string().optional().default(""),
  page: z.coerce.number().optional().default(1),
});

export async function loader({ request }: Route.LoaderArgs) {
  const { client, headers } = makeSSRClient(request);
  const url = new URL(request.url);
  const { success, data: parsedData } = paramsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!success) throw new Error("Invalid params");
  if (parsedData.q === "") {
    return { products: [], totalPages: 1 };
  }
  const products = await getProductsBySearch(client, {
    query: parsedData.q,
    page: parsedData.page,
  });
  const totalPages = await getPagesBySearch(client, { query: parsedData.q });
  return { products, totalPages };
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero title="Search" subtitle="Search for products" className="text-lg" />
      <Form className="flex justify-center max-w-screen-sm items-center gap-2 mx-auto">
        <Input name="q" placeholder="Search for products" />
        <Button type="submit">Search</Button>
      </Form>
      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        {loaderData.products.map((product, index) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            description={product.tagline}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}
      </div>
      <ProductPagination totalPages={loaderData.totalPages} />
    </div>
  );
}
