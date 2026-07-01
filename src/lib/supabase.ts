import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.com/mock-supabase';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export type UserRole = 'customer' | 'admin';
export type ConditionType = 'New' | 'Tokunbo';
export type RequestStatus = 'pending' | 'contacted' | 'acquired' | 'declined';
export type DeliveryStatus = 'pending' | 'scheduled' | 'delivered';

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  whatsapp: string | null;
  role: UserRole;
  created_at: string;
}

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  condition: ConditionType;
  price: number;
  location: string | null;
  transmission: string | null;
  fuel_type: string | null;
  mileage: number | null;
  exterior_color: string | null;
  interior_color: string | null;
  description: string | null;
  featured: boolean;
  is_dealer_owned: boolean;
  owner_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface CarMedia {
  id: string;
  car_id: string;
  url: string;
  is_cover: boolean;
  order_index: number;
  media_type: string;
}
