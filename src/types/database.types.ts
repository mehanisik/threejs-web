export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)";
  };
  public: {
    Tables: {
      images: {
        Row: {
          created_at: string | null;
          id: string;
          image_url: string;
          project_id: string | null;
          service_id: string | null;
          sort_order: number | null;
          type: Database["public"]["Enums"]["image_type"] | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          image_url: string;
          project_id?: string | null;
          service_id?: string | null;
          sort_order?: number | null;
          type?: Database["public"]["Enums"]["image_type"] | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          image_url?: string;
          project_id?: string | null;
          service_id?: string | null;
          sort_order?: number | null;
          type?: Database["public"]["Enums"]["image_type"] | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "images_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "images_service_id_fkey";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "services";
            referencedColumns: ["id"];
          },
        ];
      };
      projects: {
        Row: {
          city: string | null;
          date: string | null;
          description: string | null;
          external_url: string | null;
          id: string;
          order_index: number;
          slug: string | null;
          tags: string[] | null;
          title: string;
        };
        Insert: {
          city?: string | null;
          date?: string | null;
          description?: string | null;
          external_url?: string | null;
          id?: string;
          order_index: number;
          slug?: string | null;
          tags?: string[] | null;
          title: string;
        };
        Update: {
          city?: string | null;
          date?: string | null;
          description?: string | null;
          external_url?: string | null;
          id?: string;
          order_index?: number;
          slug?: string | null;
          tags?: string[] | null;
          title?: string;
        };
        Relationships: [];
      };
      services: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          order_index: number | null;
          service_code: string;
          title: string;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          order_index?: number | null;
          service_code: string;
          title: string;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          order_index?: number | null;
          service_code?: string;
          title?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      citext: {
        Args: { "": boolean } | { "": string } | { "": unknown };
        Returns: string;
      };
      citext_hash: {
        Args: { "": string };
        Returns: number;
      };
      citextin: {
        Args: { "": unknown };
        Returns: string;
      };
      citextout: {
        Args: { "": string };
        Returns: unknown;
      };
      citextrecv: {
        Args: { "": unknown };
        Returns: string;
      };
      citextsend: {
        Args: { "": string };
        Returns: string;
      };
      gtrgm_compress: {
        Args: { "": unknown };
        Returns: unknown;
      };
      gtrgm_decompress: {
        Args: { "": unknown };
        Returns: unknown;
      };
      gtrgm_in: {
        Args: { "": unknown };
        Returns: unknown;
      };
      gtrgm_options: {
        Args: { "": unknown };
        Returns: undefined;
      };
      gtrgm_out: {
        Args: { "": unknown };
        Returns: unknown;
      };
      set_limit: {
        Args: { "": number };
        Returns: number;
      };
      show_limit: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      show_trgm: {
        Args: { "": string };
        Returns: string[];
      };
    };
    Enums: {
      image_type: "portrait" | "project" | "cover" | "preview" | "services";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      image_type: ["portrait", "project", "cover", "preview", "services"],
    },
  },
} as const;
