ALTER TABLE "public"."jobs" ALTER COLUMN "job_type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."job_type";--> statement-breakpoint
CREATE TYPE "public"."job_type" AS ENUM('full-time', 'part-time', 'freelance', 'internship');--> statement-breakpoint
ALTER TABLE "public"."jobs" ALTER COLUMN "job_type" SET DATA TYPE "public"."job_type" USING "job_type"::"public"."job_type";