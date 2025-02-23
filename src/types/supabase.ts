export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          avatar_url: string | null;
          designation: string | null;
          bio: string | null;
          created_at: string;
          updated_at: string;
          preferences: Json;
          visibility: boolean;
          linkedin_url: string | null;
          github_url: string | null;
          is_premium: boolean;
        };
        Insert: {
          id?: string;
          email: string;
          full_name: string;
          avatar_url?: string | null;
          designation?: string | null;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
          preferences?: Json;
          visibility?: boolean;
          linkedin_url?: string | null;
          github_url?: string | null;
          is_premium?: boolean;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          avatar_url?: string | null;
          designation?: string | null;
          bio?: string | null;
          updated_at?: string;
          preferences?: Json;
          visibility?: boolean;
          linkedin_url?: string | null;
          github_url?: string | null;
          is_premium?: boolean;
        };
      };
      cafes: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          address: string;
          latitude: number;
          longitude: number;
          wifi_speed: number | null;
          noise_level: 'quiet' | 'moderate' | 'social';
          seating_capacity: number | null;
          images: string[];
          amenities: string[];
          opening_hours: Json;
          created_at: string;
          updated_at: string;
          is_verified: boolean;
          average_rating: number;
          current_occupancy: number;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          address: string;
          latitude: number;
          longitude: number;
          wifi_speed?: number | null;
          noise_level: 'quiet' | 'moderate' | 'social';
          seating_capacity?: number | null;
          images?: string[];
          amenities?: string[];
          opening_hours?: Json;
          created_at?: string;
          updated_at?: string;
          is_verified?: boolean;
          average_rating?: number;
          current_occupancy?: number;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          address?: string;
          latitude?: number;
          longitude?: number;
          wifi_speed?: number | null;
          noise_level?: 'quiet' | 'moderate' | 'social';
          seating_capacity?: number | null;
          images?: string[];
          amenities?: string[];
          opening_hours?: Json;
          updated_at?: string;
          is_verified?: boolean;
          average_rating?: number;
          current_occupancy?: number;
        };
      };
      reviews: {
        Row: {
          id: string;
          user_id: string;
          cafe_id: string;
          rating: number;
          content: string | null;
          images: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          cafe_id: string;
          rating: number;
          content?: string | null;
          images?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          cafe_id?: string;
          rating?: number;
          content?: string | null;
          images?: string[];
          updated_at?: string;
        };
      };
      check_ins: {
        Row: {
          id: string;
          user_id: string;
          cafe_id: string;
          check_in_time: string;
          check_out_time: string | null;
          status: 'active' | 'completed' | 'cancelled';
        };
        Insert: {
          id?: string;
          user_id: string;
          cafe_id: string;
          check_in_time?: string;
          check_out_time?: string | null;
          status?: 'active' | 'completed' | 'cancelled';
        };
        Update: {
          id?: string;
          user_id?: string;
          cafe_id?: string;
          check_in_time?: string;
          check_out_time?: string | null;
          status?: 'active' | 'completed' | 'cancelled';
        };
      };
      meetup_requests: {
        Row: {
          id: string;
          sender_id: string;
          receiver_id: string;
          cafe_id: string;
          status: 'pending' | 'accepted' | 'declined';
          message: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          sender_id: string;
          receiver_id: string;
          cafe_id: string;
          status?: 'pending' | 'accepted' | 'declined';
          message?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          sender_id?: string;
          receiver_id?: string;
          cafe_id?: string;
          status?: 'pending' | 'accepted' | 'declined';
          message?: string | null;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          user_id: string;
          cafe_id: string;
          content: string;
          images: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          cafe_id: string;
          content: string;
          images?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          cafe_id?: string;
          content?: string;
          images?: string[];
          updated_at?: string;
        };
      };
      post_interactions: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          type: 'like' | 'comment';
          comment_content: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          user_id: string;
          type: 'like' | 'comment';
          comment_content?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          user_id?: string;
          type?: 'like' | 'comment';
          comment_content?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
