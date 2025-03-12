import { redirect } from "react-router";
import type { Route } from "./+types/product-redirection-page";
import { makeSSRClient } from "~/supa-client";
export const loader = ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  return redirect(`/products/${params.productId}/overview`);
};
