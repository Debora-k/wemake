import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";
import { SALARY_RANGES } from "./constants";
export const getJobs = async (client: SupabaseClient<Database>, {limit, location, type, salary}: {
    limit: number, 
    location?: 'remote' | 'on-site' | 'hybrid', 
    type?: 'full-time' | 'part-time' | 'remote' | 'freelance' | 'internship', 
    salary?: typeof SALARY_RANGES[number]
}) => {
    
    const baseQuery = client
    .from("jobs")
    .select(`
        job_id,
        job_type,
        position,
        company_name,
        company_logo,
        company_location,
        location,
        salary_range,
        created_at
        `)
    .limit(limit);
    if(location) {
        baseQuery.eq("location", location);
    }
    if(type) {
        baseQuery.eq("job_type", type as "full-time" | "part-time" | "freelance" | "internship");
    }
    if(salary) {
        baseQuery.eq("salary_range", salary);
    }
    const {data, error} = await baseQuery;
    if(error) {
        throw new Error(error.message);
    }
    return data;
};

export const getJobById = async (client: SupabaseClient<Database>, {jobId}: {jobId: string}) => {
    const {data, error} = await client
        .from("jobs")
        .select("*")
        .eq("job_id", jobId as unknown as number)
        .single();
    if(error) {
        throw new Error(error.message);
    }
    return data;
};