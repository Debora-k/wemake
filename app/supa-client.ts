import { createBrowserClient, createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";
import type { MergeDeep, SetNonNullable, SetFieldType } from "type-fest";
import type { Database as SupabaseDatabase } from "database.types";


export type Database = MergeDeep<
    SupabaseDatabase, 
    {
    public: {
        Views: {
            messages_view: {
                Row: SetNonNullable<SupabaseDatabase["public"]["Views"]["messages_view"]["Row"]
                >;
            };
            community_post_list_view: {
                Row: SetFieldType<SetNonNullable<SupabaseDatabase["public"]["Views"]["community_post_list_view"]["Row"]>,
                "author_avatar",
                string | null
                >;
            };
            community_post_detail: {
                Row: SetNonNullable<SupabaseDatabase["public"]["Views"]["community_post_detail"]["Row"]
                >;
            };
            gpt_ideas_view: {
                Row: SetNonNullable<SupabaseDatabase["public"]["Views"]["gpt_ideas_view"]["Row"]
                >;
            };
            product_overview_view: {
                Row: SetNonNullable<SupabaseDatabase["public"]["Views"]["product_overview_view"]["Row"]
                >;
            };
        };
    };
}>;

export const browserClient = createBrowserClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export const makeSSRClient = (request: Request) => {
    const headers = new Headers();
    const serverSideClient = createServerClient<Database>(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return parseCookieHeader(request.headers.get("Cookie") ?? "");
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        headers.append(
                            "Set-Cookie",
                            serializeCookieHeader(name, value, options)
                        );
                    });
                },
            },
        },
    );
    return {
        client: serverSideClient,
        headers,
    };
};
// export default browserClient;
