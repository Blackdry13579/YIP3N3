import { createClient } from '@supabase/supabase-js';

// Remplace par ton URL Supabase locale
const SUPABASE_URL = 'http://localhost:54321';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export type UserRole = 'patron' | 'serveur';

export interface AppUser {
  id: string;
  email: string;
  role: UserRole;
  full_name: string;
  phone?: string;
}

export interface FishPrice {
  id: string;
  amount: number;
  label?: string;
  active: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  reference: string;
  server_id: string;
  server_name?: string;
  client_phone?: string;
  mode?: 'sur_place' | 'a_emporter';
  status: 'en_cours' | 'terminee';
  total_amount: number;
  created_at: string;
  completed_at?: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  fish_price_id: string;
  quantity: number;
  unit_price: number;
  line_total: number;
}
