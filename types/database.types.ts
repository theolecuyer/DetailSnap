export type Database = {
  public: {
    Tables: {
      customers: {
        Row: {
          cust_email: string | null
          cust_name: string | null
          cust_phone: string | null
          cust_shop: number | null
          id: number
        }
        Insert: {
          cust_email?: string | null
          cust_name?: string | null
          cust_phone?: string | null
          cust_shop?: number | null
          id?: number
        }
        Update: {
          cust_email?: string | null
          cust_name?: string | null
          cust_phone?: string | null
          cust_shop?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "customers_cust_shop_fkey"
            columns: ["cust_shop"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      details: {
        Row: {
          car_make: string | null
          car_model: string | null
          close_at: string | null
          customer: number | null
          group: number | null
          id: number
          image: string | null
          open: boolean | null
          open_at: string | null
          services: string[] | null
        }
        Insert: {
          car_make?: string | null
          car_model?: string | null
          close_at?: string | null
          customer?: number | null
          group?: number | null
          id?: number
          image?: string | null
          open?: boolean | null
          open_at?: string | null
          services?: string[] | null
        }
        Update: {
          car_make?: string | null
          car_model?: string | null
          close_at?: string | null
          customer?: number | null
          group?: number | null
          id?: number
          image?: string | null
          open?: boolean | null
          open_at?: string | null
          services?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "details_customer_fkey"
            columns: ["customer"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "details_group_fkey"
            columns: ["group"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          created_at: string
          creator: string | null
          id: number
          logo: string | null
          name: string
        }
        Insert: {
          created_at?: string
          creator?: string | null
          id?: number
          logo?: string | null
          name: string
        }
        Update: {
          created_at?: string
          creator?: string | null
          id?: number
          logo?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "groups_creator_fkey"
            columns: ["creator"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          first_name: string | null
          group_id: number | null
          id: string
          last_name: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          first_name?: string | null
          group_id?: number | null
          id: string
          last_name?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          first_name?: string | null
          group_id?: number | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_group_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
