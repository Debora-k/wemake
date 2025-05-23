import { pgTable, bigint, text, timestamp, integer, pgEnum, check, uuid } from "drizzle-orm/pg-core";
import { PRODUCT_STAGE } from "./constants";
import { sql } from "drizzle-orm";
import { profiles } from "../users/schema";

export const productStage = pgEnum("product_stage", PRODUCT_STAGE.map((stage) => stage.value) as [string, ...string[]]);

export const team = pgTable("teams", {
    team_id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
    product_name: text().notNull(),
    team_size: integer().notNull(),
    equity_split: integer().notNull(),
    roles: text().notNull(),
    product_description: text().notNull(),
    product_stage: productStage().notNull(),
    team_leader_id: uuid().references(() => profiles.profile_id, {
        onDelete: "cascade",
    })
    .notNull(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
}, (table) => [
    check("team_size_check", sql`${table.team_size} BETWEEN 1 AND 100`),
    check("equity_split_check", sql`${table.equity_split} BETWEEN 1 AND 100`),
    check("product_description_check", sql`LENGTH(${table.product_description}) <= 200`),
]);

