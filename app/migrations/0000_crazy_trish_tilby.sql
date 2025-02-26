CREATE TYPE "public"."job_type" AS ENUM('full-time', 'part-time', 'remote');--> statement-breakpoint
CREATE TYPE "public"."location" AS ENUM('remote', 'on-site', 'hybrid');--> statement-breakpoint
CREATE TYPE "public"."salary_range" AS ENUM('$50,000 - $60,000', '$60,000 - $70,000', '$70,000 - $80,000', '$80,000 - $90,000', '$90,000 - $100,000', '$100,000 - $110,000', '$110,000 - $120,000', '$120,000 - $130,000', '$130,000 - $140,000', '$140,000 - $150,000', '$150,000 - $160,000', '$160,000 - $170,000', '$170,000 - $180,000', '$180,000 - $200,000');--> statement-breakpoint
CREATE TABLE "jobs" (
	"job_id" bigint PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "jobs_job_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"position" text NOT NULL,
	"overview" text NOT NULL,
	"responsibilities" text NOT NULL,
	"qualifications" text NOT NULL,
	"benefits" text NOT NULL,
	"skills" text NOT NULL,
	"company_name" text NOT NULL,
	"company_logo" text NOT NULL,
	"company_location" text NOT NULL,
	"apply_url" text NOT NULL,
	"job_type" "job_type" NOT NULL
);
