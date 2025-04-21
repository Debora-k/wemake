import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";
import { z } from "zod";
import { formSchema } from "./pages/submit-job-page";


export const createJob = async (
    client: SupabaseClient<Database>,
    data: z.infer<typeof formSchema>
) => {
    const { data:jobData, error} = await client
    .from("jobs")
    .insert({
        position: data.position,
        overview: data.overview,
        responsibilities: data.responsibilities,
        qualifications: data.qualifications,
        benefits: data.benefits,
        skills: data.skills,
        company_name: data.company_name,
        company_logo: data.company_logo_url,
        company_location: data.company_location,
        apply_url: data.apply_url,
        job_type: data.job_type as "full-time" | "part-time" | "remote",   
        location: data.location as "remote" | "on-site" | "hybrid",
        salary_range: data.salary_range,
    })  
    .select()
    .single();
    if (error) {
        throw error;
    }   
    return jobData;
}