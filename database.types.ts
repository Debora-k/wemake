export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          category_id: number
          created_at: string
          description: string
          name: string
          updated_at: string
        }
        Insert: {
          category_id?: number
          created_at?: string
          description: string
          name: string
          updated_at?: string
        }
        Update: {
          category_id?: number
          created_at?: string
          description?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_id: string
          event_type: Database["public"]["Enums"]["event_type"] | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_id?: string
          event_type?: Database["public"]["Enums"]["event_type"] | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_id?: string
          event_type?: Database["public"]["Enums"]["event_type"] | null
        }
        Relationships: []
      }
      follows: {
        Row: {
          created_at: string
          follower_id: string | null
          following_id: string | null
        }
        Insert: {
          created_at?: string
          follower_id?: string | null
          following_id?: string | null
        }
        Update: {
          created_at?: string
          follower_id?: string | null
          following_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "follows_follower_id_profiles_profile_id_fk"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "follows_following_id_profiles_profile_id_fk"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      gpt_ideas: {
        Row: {
          claimed_at: string | null
          claimed_by: string | null
          created_at: string
          gpt_idea_id: number
          idea: string
          views: number
        }
        Insert: {
          claimed_at?: string | null
          claimed_by?: string | null
          created_at?: string
          gpt_idea_id?: number
          idea: string
          views?: number
        }
        Update: {
          claimed_at?: string | null
          claimed_by?: string | null
          created_at?: string
          gpt_idea_id?: number
          idea?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "gpt_ideas_claimed_by_profiles_profile_id_fk"
            columns: ["claimed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      gpt_ideas_likes: {
        Row: {
          gpt_idea_id: number
          profile_id: string
        }
        Insert: {
          gpt_idea_id: number
          profile_id: string
        }
        Update: {
          gpt_idea_id?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "gpt_ideas_likes_gpt_idea_id_gpt_ideas_gpt_idea_id_fk"
            columns: ["gpt_idea_id"]
            isOneToOne: false
            referencedRelation: "gpt_ideas"
            referencedColumns: ["gpt_idea_id"]
          },
          {
            foreignKeyName: "gpt_ideas_likes_gpt_idea_id_gpt_ideas_gpt_idea_id_fk"
            columns: ["gpt_idea_id"]
            isOneToOne: false
            referencedRelation: "gpt_ideas_view"
            referencedColumns: ["gpt_idea_id"]
          },
          {
            foreignKeyName: "gpt_ideas_likes_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      jobs: {
        Row: {
          apply_url: string
          benefits: string
          company_location: string
          company_logo: string
          company_name: string
          created_at: string
          job_id: number
          job_type: Database["public"]["Enums"]["job_type"]
          location: Database["public"]["Enums"]["location"]
          overview: string
          position: string
          qualifications: string
          responsibilities: string
          salary_range: Database["public"]["Enums"]["salary_range"]
          skills: string
          updated_at: string
        }
        Insert: {
          apply_url: string
          benefits: string
          company_location: string
          company_logo: string
          company_name: string
          created_at?: string
          job_id?: number
          job_type: Database["public"]["Enums"]["job_type"]
          location: Database["public"]["Enums"]["location"]
          overview: string
          position: string
          qualifications: string
          responsibilities: string
          salary_range: Database["public"]["Enums"]["salary_range"]
          skills: string
          updated_at?: string
        }
        Update: {
          apply_url?: string
          benefits?: string
          company_location?: string
          company_logo?: string
          company_name?: string
          created_at?: string
          job_id?: number
          job_type?: Database["public"]["Enums"]["job_type"]
          location?: Database["public"]["Enums"]["location"]
          overview?: string
          position?: string
          qualifications?: string
          responsibilities?: string
          salary_range?: Database["public"]["Enums"]["salary_range"]
          skills?: string
          updated_at?: string
        }
        Relationships: []
      }
      message_room_members: {
        Row: {
          created_at: string
          message_room_id: number
          profile_id: string
        }
        Insert: {
          created_at?: string
          message_room_id: number
          profile_id: string
        }
        Update: {
          created_at?: string
          message_room_id?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_room_members_message_room_id_message_rooms_message_room"
            columns: ["message_room_id"]
            isOneToOne: false
            referencedRelation: "message_rooms"
            referencedColumns: ["message_room_id"]
          },
          {
            foreignKeyName: "message_room_members_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      message_rooms: {
        Row: {
          created_at: string
          message_room_id: number
        }
        Insert: {
          created_at?: string
          message_room_id?: number
        }
        Update: {
          created_at?: string
          message_room_id?: number
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          message_id: number
          message_room_id: number | null
          seen: boolean
          sender_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          message_id?: number
          message_room_id?: number | null
          seen?: boolean
          sender_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          message_id?: number
          message_room_id?: number | null
          seen?: boolean
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_message_room_id_message_rooms_message_room_id_fk"
            columns: ["message_room_id"]
            isOneToOne: false
            referencedRelation: "message_rooms"
            referencedColumns: ["message_room_id"]
          },
          {
            foreignKeyName: "messages_sender_id_profiles_profile_id_fk"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          notification_id: number
          post_id: number | null
          product_id: number | null
          source_id: string | null
          target_id: string
          type: Database["public"]["Enums"]["notification_type"]
        }
        Insert: {
          created_at?: string
          notification_id?: number
          post_id?: number | null
          product_id?: number | null
          source_id?: string | null
          target_id: string
          type: Database["public"]["Enums"]["notification_type"]
        }
        Update: {
          created_at?: string
          notification_id?: number
          post_id?: number | null
          product_id?: number | null
          source_id?: string | null
          target_id?: string
          type?: Database["public"]["Enums"]["notification_type"]
        }
        Relationships: [
          {
            foreignKeyName: "notifications_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_post_detail"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "notifications_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_post_list_view"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "notifications_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "notifications_product_id_products_product_id_fk"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_overview_view"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "notifications_product_id_products_product_id_fk"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "notifications_source_id_profiles_profile_id_fk"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "notifications_target_id_profiles_profile_id_fk"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      post_replies: {
        Row: {
          created_at: string
          parent_id: number | null
          post_id: number | null
          post_reply_id: number
          profile_id: string
          reply: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          parent_id?: number | null
          post_id?: number | null
          post_reply_id?: never
          profile_id: string
          reply: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          parent_id?: number | null
          post_id?: number | null
          post_reply_id?: never
          profile_id?: string
          reply?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_replies_parent_id_post_replies_post_reply_id_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "post_replies"
            referencedColumns: ["post_reply_id"]
          },
          {
            foreignKeyName: "post_replies_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_post_detail"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_replies_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_post_list_view"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_replies_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_replies_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      post_upvotes: {
        Row: {
          post_id: number
          profile_id: string
        }
        Insert: {
          post_id: number
          profile_id: string
        }
        Update: {
          post_id?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_upvotes_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_post_detail"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_upvotes_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_post_list_view"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_upvotes_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_upvotes_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      posts: {
        Row: {
          content: string
          created_at: string
          post_id: number
          profile_id: string | null
          title: string
          topic_id: number | null
          updated_at: string
          upvotes: number | null
        }
        Insert: {
          content: string
          created_at?: string
          post_id?: number
          profile_id?: string | null
          title: string
          topic_id?: number | null
          updated_at?: string
          upvotes?: number | null
        }
        Update: {
          content?: string
          created_at?: string
          post_id?: number
          profile_id?: string | null
          title?: string
          topic_id?: number | null
          updated_at?: string
          upvotes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "posts_topic_id_topics_topic_id_fk"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "community_post_detail"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "posts_topic_id_topics_topic_id_fk"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["topic_id"]
          },
        ]
      }
      product_upvotes: {
        Row: {
          product_id: number
          profile_id: string
        }
        Insert: {
          product_id: number
          profile_id: string
        }
        Update: {
          product_id?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_upvotes_product_id_products_product_id_fk"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_overview_view"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_upvotes_product_id_products_product_id_fk"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_upvotes_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: number | null
          created_at: string
          description: string
          how_it_works: string
          icon: string
          name: string
          product_id: number
          profile_id: string
          stats: Json
          tagline: string
          updated_at: string
          url: string
        }
        Insert: {
          category_id?: number | null
          created_at?: string
          description: string
          how_it_works: string
          icon: string
          name: string
          product_id?: number
          profile_id: string
          stats?: Json
          tagline: string
          updated_at?: string
          url: string
        }
        Update: {
          category_id?: number | null
          created_at?: string
          description?: string
          how_it_works?: string
          icon?: string
          name?: string
          product_id?: number
          profile_id?: string
          stats?: Json
          tagline?: string
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_categories_category_id_fk"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "products_to_profiles_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          bio: string | null
          created_at: string
          headline: string | null
          name: string
          profile_id: string
          role: Database["public"]["Enums"]["role"]
          stats: Json | null
          updated_at: string
          username: string
          views: Json | null
        }
        Insert: {
          avatar?: string | null
          bio?: string | null
          created_at?: string
          headline?: string | null
          name: string
          profile_id: string
          role?: Database["public"]["Enums"]["role"]
          stats?: Json | null
          updated_at?: string
          username: string
          views?: Json | null
        }
        Update: {
          avatar?: string | null
          bio?: string | null
          created_at?: string
          headline?: string | null
          name?: string
          profile_id?: string
          role?: Database["public"]["Enums"]["role"]
          stats?: Json | null
          updated_at?: string
          username?: string
          views?: Json | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string
          product_id: number | null
          profile_id: string | null
          rating: number
          review: string
          review_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          product_id?: number | null
          profile_id?: string | null
          rating: number
          review: string
          review_id?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          product_id?: number | null
          profile_id?: string | null
          rating?: number
          review?: string
          review_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_products_product_id_fk"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_overview_view"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "reviews_product_id_products_product_id_fk"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "reviews_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string
          equity_split: number
          product_description: string
          product_name: string
          product_stage: Database["public"]["Enums"]["product_stage"]
          roles: string
          team_id: number
          team_leader_id: string
          team_size: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          equity_split: number
          product_description: string
          product_name: string
          product_stage: Database["public"]["Enums"]["product_stage"]
          roles: string
          team_id?: number
          team_leader_id: string
          team_size: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          equity_split?: number
          product_description?: string
          product_name?: string
          product_stage?: Database["public"]["Enums"]["product_stage"]
          roles?: string
          team_id?: number
          team_leader_id?: string
          team_size?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "teams_team_leader_id_profiles_profile_id_fk"
            columns: ["team_leader_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      topics: {
        Row: {
          created_at: string
          name: string
          slug: string
          topic_id: number
        }
        Insert: {
          created_at?: string
          name: string
          slug: string
          topic_id?: number
        }
        Update: {
          created_at?: string
          name?: string
          slug?: string
          topic_id?: number
        }
        Relationships: []
      }
    }
    Views: {
      community_post_detail: {
        Row: {
          author_avatar: string | null
          author_created_at: string | null
          author_name: string | null
          author_role: Database["public"]["Enums"]["role"] | null
          content: string | null
          created_at: string | null
          post_id: number | null
          products_count: number | null
          replies_count: number | null
          title: string | null
          topic_id: number | null
          topic_name: string | null
          topic_slug: string | null
          upvotes: number | null
        }
        Relationships: []
      }
      community_post_list_view: {
        Row: {
          author: string | null
          author_avatar: string | null
          author_username: string | null
          created_at: string | null
          post_id: number | null
          title: string | null
          topic: string | null
          topic_slug: string | null
          upvotes: number | null
        }
        Relationships: []
      }
      gpt_ideas_view: {
        Row: {
          created_at: string | null
          gpt_idea_id: number | null
          has_claimed: boolean | null
          idea: string | null
          likes: number | null
          views: number | null
        }
        Relationships: []
      }
      product_overview_view: {
        Row: {
          average_rating: number | null
          description: string | null
          how_it_works: string | null
          icon: string | null
          name: string | null
          product_id: number | null
          reviews: string | null
          tagline: string | null
          upvotes: string | null
          url: string | null
          views: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      track_event: {
        Args: {
          event_type: Database["public"]["Enums"]["event_type"]
          event_data: Json
        }
        Returns: undefined
      }
    }
    Enums: {
      event_type: "product_view" | "product_visit" | "profile_view"
      job_type: "full-time" | "part-time" | "remote"
      location: "remote" | "on-site" | "hybrid"
      notification_type: "follow" | "review" | "reply" | "mention"
      product_stage: "idea" | "mvp" | "prototype" | "product"
      role: "developer" | "designer" | "product_manager" | "founder" | "other"
      salary_range:
        | "$50,000 - $60,000"
        | "$60,000 - $70,000"
        | "$70,000 - $80,000"
        | "$80,000 - $90,000"
        | "$90,000 - $100,000"
        | "$100,000 - $110,000"
        | "$110,000 - $120,000"
        | "$120,000 - $130,000"
        | "$130,000 - $140,000"
        | "$140,000 - $150,000"
        | "$150,000 - $160,000"
        | "$160,000 - $170,000"
        | "$170,000 - $180,000"
        | "$180,000 - $200,000"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
