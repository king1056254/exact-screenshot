export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      ai_access_state: {
        Row: {
          blocked: boolean
          id: boolean
          reason: string | null
          updated_at: string
        }
        Insert: {
          blocked?: boolean
          id?: boolean
          reason?: string | null
          updated_at?: string
        }
        Update: {
          blocked?: boolean
          id?: boolean
          reason?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      ai_conversations: {
        Row: {
          created_at: string
          id: string
          messages: Json
          staff_id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          messages?: Json
          staff_id: string
          title?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          messages?: Json
          staff_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_conversations_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_name: string | null
          body: string | null
          category: string | null
          cover_url: string | null
          created_at: string
          excerpt: string | null
          id: string
          published: boolean
          published_at: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_name?: string | null
          body?: string | null
          category?: string | null
          cover_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_name?: string | null
          body?: string | null
          category?: string | null
          cover_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      client_projects: {
        Row: {
          client_id: string
          created_at: string
          description: string | null
          expected_completion: string | null
          id: string
          is_demo: boolean
          name: string
          progress: number
          start_date: string | null
          status: string
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          description?: string | null
          expected_completion?: string | null
          id?: string
          is_demo?: boolean
          name: string
          progress?: number
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          description?: string | null
          expected_completion?: string | null
          id?: string
          is_demo?: boolean
          name?: string
          progress?: number
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          company_name: string
          contact_name: string | null
          created_at: string
          email: string | null
          id: string
          industry: string | null
          is_demo: boolean
          notes: string | null
          phone: string | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          company_name: string
          contact_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          industry?: string | null
          is_demo?: boolean
          notes?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          company_name?: string
          contact_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          industry?: string | null
          is_demo?: boolean
          notes?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      company_settings: {
        Row: {
          address: string | null
          company_name: string
          description: string | null
          email: string | null
          github_url: string | null
          id: string
          linkedin_url: string | null
          phone: string | null
          tagline: string | null
          twitter_url: string | null
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          address?: string | null
          company_name?: string
          description?: string | null
          email?: string | null
          github_url?: string | null
          id?: string
          linkedin_url?: string | null
          phone?: string | null
          tagline?: string | null
          twitter_url?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          address?: string | null
          company_name?: string
          description?: string | null
          email?: string | null
          github_url?: string | null
          id?: string
          linkedin_url?: string | null
          phone?: string | null
          tagline?: string | null
          twitter_url?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          is_demo: boolean
          message: string
          name: string
          phone: string | null
          status: string
          subject: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          is_demo?: boolean
          message: string
          name: string
          phone?: string | null
          status?: string
          subject?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          is_demo?: boolean
          message?: string
          name?: string
          phone?: string | null
          status?: string
          subject?: string | null
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category: string | null
          created_at: string
          id: string
          published: boolean
          question: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string
          id?: string
          published?: boolean
          question: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string
          id?: string
          published?: boolean
          question?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      industries: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          published: boolean
          slug: string
          sort_order: number
          summary: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          published?: boolean
          slug: string
          sort_order?: number
          summary?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          published?: boolean
          slug?: string
          sort_order?: number
          summary?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      invoice_items: {
        Row: {
          amount: number
          description: string
          id: string
          invoice_id: string
          is_demo: boolean
          quantity: number
          unit_price: number
        }
        Insert: {
          amount?: number
          description: string
          id?: string
          invoice_id: string
          is_demo?: boolean
          quantity?: number
          unit_price?: number
        }
        Update: {
          amount?: number
          description?: string
          id?: string
          invoice_id?: string
          is_demo?: boolean
          quantity?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          client_id: string
          created_at: string
          currency: string
          due_date: string | null
          id: string
          invoice_number: string
          is_demo: boolean
          issue_date: string | null
          notes: string | null
          project_id: string | null
          status: string
          subtotal: number
          tax: number
          total: number
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          currency?: string
          due_date?: string | null
          id?: string
          invoice_number: string
          is_demo?: boolean
          issue_date?: string | null
          notes?: string | null
          project_id?: string | null
          status?: string
          subtotal?: number
          tax?: number
          total?: number
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          currency?: string
          due_date?: string | null
          id?: string
          invoice_number?: string
          is_demo?: boolean
          issue_date?: string | null
          notes?: string | null
          project_id?: string | null
          status?: string
          subtotal?: number
          tax?: number
          total?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "client_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          cover_letter: string | null
          created_at: string
          cv_url: string | null
          email: string
          id: string
          is_demo: boolean
          job_id: string | null
          name: string
          phone: string | null
          portfolio_url: string | null
          status: string
        }
        Insert: {
          cover_letter?: string | null
          created_at?: string
          cv_url?: string | null
          email: string
          id?: string
          is_demo?: boolean
          job_id?: string | null
          name: string
          phone?: string | null
          portfolio_url?: string | null
          status?: string
        }
        Update: {
          cover_letter?: string | null
          created_at?: string
          cv_url?: string | null
          email?: string
          id?: string
          is_demo?: boolean
          job_id?: string | null
          name?: string
          phone?: string | null
          portfolio_url?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_openings"
            referencedColumns: ["id"]
          },
        ]
      }
      job_openings: {
        Row: {
          created_at: string
          department: string | null
          description: string | null
          employment_type: string | null
          id: string
          location: string | null
          requirements: string[] | null
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          description?: string | null
          employment_type?: string | null
          id?: string
          location?: string | null
          requirements?: string[] | null
          slug: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          department?: string | null
          description?: string | null
          employment_type?: string | null
          id?: string
          location?: string | null
          requirements?: string[] | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          id: string
          invoice_id: string
          is_demo: boolean
          method: string | null
          paid_at: string
          reference: string | null
        }
        Insert: {
          amount: number
          id?: string
          invoice_id: string
          is_demo?: boolean
          method?: string | null
          paid_at?: string
          reference?: string | null
        }
        Update: {
          amount?: number
          id?: string
          invoice_id?: string
          is_demo?: boolean
          method?: string | null
          paid_at?: string
          reference?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_projects: {
        Row: {
          client_name: string | null
          cover_url: string | null
          created_at: string
          featured: boolean
          features: string[] | null
          id: string
          industry: string | null
          live_url: string | null
          outcome: string | null
          problem: string | null
          published: boolean
          slug: string
          solution: string | null
          sort_order: number
          status: string
          summary: string | null
          technologies: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          client_name?: string | null
          cover_url?: string | null
          created_at?: string
          featured?: boolean
          features?: string[] | null
          id?: string
          industry?: string | null
          live_url?: string | null
          outcome?: string | null
          problem?: string | null
          published?: boolean
          slug: string
          solution?: string | null
          sort_order?: number
          status?: string
          summary?: string | null
          technologies?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          client_name?: string | null
          cover_url?: string | null
          created_at?: string
          featured?: boolean
          features?: string[] | null
          id?: string
          industry?: string | null
          live_url?: string | null
          outcome?: string | null
          problem?: string | null
          published?: boolean
          slug?: string
          solution?: string | null
          sort_order?: number
          status?: string
          summary?: string | null
          technologies?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      project_documents: {
        Row: {
          created_at: string
          file_path: string | null
          file_type: string | null
          id: string
          is_demo: boolean
          project_id: string
          title: string
          uploaded_by: string | null
          visible_to_client: boolean
        }
        Insert: {
          created_at?: string
          file_path?: string | null
          file_type?: string | null
          id?: string
          is_demo?: boolean
          project_id: string
          title: string
          uploaded_by?: string | null
          visible_to_client?: boolean
        }
        Update: {
          created_at?: string
          file_path?: string | null
          file_type?: string | null
          id?: string
          is_demo?: boolean
          project_id?: string
          title?: string
          uploaded_by?: string | null
          visible_to_client?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "project_documents_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "client_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_messages: {
        Row: {
          body: string
          created_at: string
          id: string
          is_demo: boolean
          project_id: string
          sender_id: string | null
          sender_name: string | null
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          is_demo?: boolean
          project_id: string
          sender_id?: string | null
          sender_name?: string | null
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          is_demo?: boolean
          project_id?: string
          sender_id?: string | null
          sender_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_messages_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "client_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_milestones: {
        Row: {
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          is_demo: boolean
          project_id: string
          sort_order: number
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          is_demo?: boolean
          project_id: string
          sort_order?: number
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          is_demo?: boolean
          project_id?: string
          sort_order?: number
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_milestones_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "client_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_requests: {
        Row: {
          budget_range: string | null
          company: string | null
          country: string | null
          created_at: string
          details: string | null
          email: string
          id: string
          is_demo: boolean
          name: string
          phone: string | null
          project_type: string | null
          status: string
          timeline: string | null
        }
        Insert: {
          budget_range?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          details?: string | null
          email: string
          id?: string
          is_demo?: boolean
          name: string
          phone?: string | null
          project_type?: string | null
          status?: string
          timeline?: string | null
        }
        Update: {
          budget_range?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          details?: string | null
          email?: string
          id?: string
          is_demo?: boolean
          name?: string
          phone?: string | null
          project_type?: string | null
          status?: string
          timeline?: string | null
        }
        Relationships: []
      }
      saas_products: {
        Row: {
          cover_url: string | null
          created_at: string
          description: string | null
          features: string[] | null
          id: string
          name: string
          product_url: string | null
          published: boolean
          slug: string
          sort_order: number
          status: string
          tagline: string | null
          updated_at: string
        }
        Insert: {
          cover_url?: string | null
          created_at?: string
          description?: string | null
          features?: string[] | null
          id?: string
          name: string
          product_url?: string | null
          published?: boolean
          slug: string
          sort_order?: number
          status?: string
          tagline?: string | null
          updated_at?: string
        }
        Update: {
          cover_url?: string | null
          created_at?: string
          description?: string | null
          features?: string[] | null
          id?: string
          name?: string
          product_url?: string | null
          published?: boolean
          slug?: string
          sort_order?: number
          status?: string
          tagline?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string | null
          features: string[] | null
          icon: string | null
          id: string
          published: boolean
          slug: string
          sort_order: number
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          features?: string[] | null
          icon?: string | null
          id?: string
          published?: boolean
          slug: string
          sort_order?: number
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          features?: string[] | null
          icon?: string | null
          id?: string
          published?: boolean
          slug?: string
          sort_order?: number
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      submission_drafts: {
        Row: {
          created_at: string
          id: string
          reply: string
          staff_id: string
          submission_id: string | null
          submission_type: string
          summary: string
        }
        Insert: {
          created_at?: string
          id?: string
          reply: string
          staff_id: string
          submission_id?: string | null
          submission_type: string
          summary: string
        }
        Update: {
          created_at?: string
          id?: string
          reply?: string
          staff_id?: string
          submission_id?: string | null
          submission_type?: string
          summary?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          client_id: string
          created_at: string
          description: string | null
          id: string
          is_demo: boolean
          priority: string
          project_id: string | null
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          description?: string | null
          id?: string
          is_demo?: boolean
          priority?: string
          project_id?: string | null
          status?: string
          subject: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          description?: string | null
          id?: string
          is_demo?: boolean
          priority?: string
          project_id?: string | null
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "client_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          bio: string | null
          created_at: string
          id: string
          linkedin_url: string | null
          name: string
          photo_url: string | null
          published: boolean
          role: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          id?: string
          linkedin_url?: string | null
          name: string
          photo_url?: string | null
          published?: boolean
          role?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          id?: string
          linkedin_url?: string | null
          name?: string
          photo_url?: string | null
          published?: boolean
          role?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      technologies: {
        Row: {
          category: string
          created_at: string
          id: string
          name: string
          published: boolean
          sort_order: number
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          id?: string
          name: string
          published?: boolean
          sort_order?: number
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          name?: string
          published?: boolean
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          company: string | null
          created_at: string
          id: string
          name: string
          photo_url: string | null
          published: boolean
          quote: string
          rating: number | null
          role: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          id?: string
          name: string
          photo_url?: string | null
          published?: boolean
          quote: string
          rating?: number | null
          role?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          id?: string
          name?: string
          photo_url?: string | null
          published?: boolean
          quote?: string
          rating?: number | null
          role?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      assign_workspace_account: {
        Args: {
          additional_role: Database["public"]["Enums"]["app_role"]
          target_client?: string
          target_user: string
        }
        Returns: undefined
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      is_staff: { Args: { _user_id: string }; Returns: boolean }
      owns_client: { Args: { _client_id: string }; Returns: boolean }
      owns_invoice: { Args: { _invoice_id: string }; Returns: boolean }
      owns_project: { Args: { _project_id: string }; Returns: boolean }
      remove_presentation_records: { Args: never; Returns: undefined }
    }
    Enums: {
      app_role: "super_admin" | "admin" | "staff" | "client"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["super_admin", "admin", "staff", "client"],
    },
  },
} as const
