import { bigint, boolean, jsonb, pgEnum, pgPolicy, pgSchema, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { products } from "../products/schema";
import { posts } from "../community/schema";
import { sql } from "drizzle-orm";
import { authenticatedRole, authUid, authUsers } from "drizzle-orm/supabase";

export const users = pgSchema("auth").table("users", {
    id: uuid().primaryKey()
});

export const roles = pgEnum("role", [
    "developer",
    "designer",
    "product_manager",
    "founder",
    "other"
]);

export const profiles = pgTable("profiles", {
    profile_id: uuid().primaryKey().references(() => authUsers.id, { onDelete: "cascade" }).notNull(),
    avatar: text(),
    name: text().notNull(),
    username: text().notNull(),
    headline: text(),
    bio: text(),
    role: roles().default("developer").notNull(),
    stats: jsonb().$type<{
        followers: number;
        following: number;
    }>(),
    views:jsonb(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
});


export const follows = pgTable("follows", {
    follower_id: uuid().references(() => profiles.profile_id, { onDelete: "cascade" }).notNull(),
    following_id: uuid().references(() => profiles.profile_id, { onDelete: "cascade" }).notNull(),
    created_at: timestamp().notNull().defaultNow(),
});

export const notificationType = pgEnum("notification_type", [
    "follow", "review", "reply", "mention",
]);

export const notifications = pgTable("notifications", {
    notification_id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
    source_id: uuid().references(() => profiles.profile_id, { onDelete: "cascade" }),
    product_id: bigint({ mode: "number" }).references(() => products.product_id, { onDelete: "cascade" }),
    post_id: bigint({ mode: "number" }).references(() => posts.post_id, { onDelete: "cascade" }),
    target_id: uuid().references(() => profiles.profile_id, { onDelete: "cascade" }).notNull(),
    seen: boolean().default(false).notNull(),
    type: notificationType().notNull(),
    created_at: timestamp().notNull().defaultNow(),
});

export const messageRooms = pgTable("message_rooms", {
    message_room_id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
    created_at: timestamp().notNull().defaultNow(),
});

export const messageRoomMembers = pgTable("message_room_members", {
    message_room_id: bigint({ mode: "number" }).references(() => messageRooms.message_room_id, { onDelete: "cascade" }),
    profile_id: uuid().references(() => profiles.profile_id, { onDelete: "cascade" }),
    created_at: timestamp().notNull().defaultNow(),
}, (table) => [
    primaryKey({ columns: [table.message_room_id, table.profile_id] })
]);

export const messages = pgTable("messages", {
    message_id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
    message_room_id: bigint({ mode: "number" }).references(() => messageRooms.message_room_id, { onDelete: "cascade" }).notNull(),
    sender_id: uuid().references(() => profiles.profile_id, { onDelete: "cascade" }).notNull(),
    content: text().notNull(),
    seen: boolean().notNull().default(false),
    created_at: timestamp().notNull().defaultNow(),
});


export const todos = pgTable("todos", {
    todo_id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
    title: text().notNull(),
    completed: boolean().notNull().default(false),
    created_at: timestamp().notNull().defaultNow(),
    profile_id: uuid().references(() => profiles.profile_id, { onDelete: "cascade" }).notNull(),
}, (table) => [
    pgPolicy("todos-insert-policy", {
        for: "insert",
        to: authenticatedRole,
        as: "permissive",
        withCheck: sql`${authUid} = ${table.profile_id}`,
    }),
    pgPolicy("todos-select-policy", {
    for: "select",
    to: authenticatedRole,
    as: "permissive",
    using: sql`${authUid} = ${table.profile_id}`,
}),
]);
