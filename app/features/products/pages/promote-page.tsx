import type { Route } from "./+types/promote-page";
import { Hero } from "~/common/components/hero";
import { Form } from "react-router";
import SelectPair from "~/common/components/select-pair";
import { Calendar } from "~/common/components/ui/calendar";
import { Label } from "~/common/components/ui/label";
import { useEffect, useRef, useState } from "react";
import type { DateRange } from "react-day-picker";
import { DateTime } from "luxon";
import { Button } from "~/common/components/ui/button";
import { getLoggedInUserId } from "~/features/users/queries";
import { makeSSRClient } from "~/supa-client";
import { z } from "zod";
import { getProducts } from "../queries";
import {
  loadTossPayments,
  type TossPaymentsWidgets,
} from "@tosspayments/tosspayments-sdk";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Promote Product | Product Hunt Clone" },
    { name: "description", content: "Promote your product" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
  const products = await getProducts(client);
  return { products };
};

export const formSchema = z.object({
  product: z.coerce.number(),
  promotionDates: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

export default function PromotePage({ loaderData }: Route.ComponentProps) {
  const [promotionDates, setPromotionDates] = useState<DateRange | undefined>();
  const totalDays =
    promotionDates?.from && promotionDates?.to
      ? DateTime.fromJSDate(promotionDates.to).diff(
          DateTime.fromJSDate(promotionDates.from),
          "days"
        ).days
      : 0;
  const widgets = useRef<TossPaymentsWidgets | null>(null);
  useEffect(() => {
    const initToss = async () => {
      const toss = await loadTossPayments(
        "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm"
      );
      widgets.current = (await toss).widgets({
        customerKey: "111111",
      });
      await widgets.current.setAmount({
        value: 0,
        currency: "KRW",
      });
      await widgets.current.renderPaymentMethods({
        selector: "#toss-payment-methods",
      });
      await widgets.current.renderAgreement({
        selector: "#toss-payment-agreement",
      });
    };
    initToss();
  }, []);

  useEffect(() => {
    if (widgets.current) {
      widgets.current.setAmount({
        value: totalDays * 200,
        currency: "KRW",
      });
    }
  }, [totalDays]);
  return (
    <div>
      <Hero
        title="Promote Your Product"
        subtitle="Boost your product's visibility."
      />
      <div className="grid grid-cols-6 gap-10">
        <Form className="col-span-3 max-w-sm mx-auto flex flex-col gap-10 items-start">
          <SelectPair
            label="Select a product"
            description="Select the product you want to promote"
            name="product"
            options={loaderData.products.map((product) => ({
              label: product.name,
              value: product.product_id.toString(),
            }))}
            placeholder="Select a product"
          />
          <div className="flex flex-col gap-2 items-center w-full">
            <Label className="flex flex-col gap-1">
              Select a range of dates for promotion{" "}
              <small className="text-muted-foreground text-center">
                Minimum duration is 3 days.
              </small>
            </Label>
            <Calendar
              mode="range"
              selected={promotionDates}
              onSelect={setPromotionDates}
              min={3}
              disabled={{ before: new Date() }}
            />
          </div>
        </Form>
        <aside className="col-span-3 px-20 flex flex-col items-center">
          <div id="toss-payment-methods" className="w-full" />
          <div id="toss-payment-agreement" />
          <Button className="w-full" disabled={totalDays === 0}>
            Checkout (
            {(totalDays * 200).toLocaleString("en-CA", {
              style: "currency",
              currency: "CAD",
            })}
            )
          </Button>
        </aside>
      </div>
    </div>
  );
}
