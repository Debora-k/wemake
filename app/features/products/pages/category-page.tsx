import type { Route } from "./+types/category-page";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { ProductPagination } from "~/common/components/product-pagination";
import {
  getCategory,
  getCategoryPages,
  getProductsByCategory,
} from "../queries";
import { z } from "zod";

export const meta = ({ params }: Route.MetaArgs) => {
  return [
    { title: `Developer Tools | Product Hunt Clone` },
    { name: "description", content: "Browse products by category" },
  ];
};

const paramsSchema = z.object({
  category: z.coerce.number(),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const { data, success } = paramsSchema.safeParse(params);
  if (!success) {
    throw new Error("Invalid category");
  }
  const [category, products, totalPages] = await Promise.all([
    getCategory(data.category),
    getProductsByCategory({
      categoryId: data.category,
      page: Number(page),
    }),
    getCategoryPages(data.category),
  ]);
  return { category, products, totalPages };
};

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero
        title={loaderData.category.name}
        subtitle={loaderData.category.description}
        className="text-lg"
      />
      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        {loaderData.products.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            description={product.description}
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
