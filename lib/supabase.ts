import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Property Types
export type Property = {
  id: number;
  title: string;
  description: string;
  image: string;
  gallery: string[];
  price: number;
  type: string;
  amenities: string[];
  created_at: string;
  updated_at: string;
  location_id?: number;
  specifications_id?: number;
  utilities_id?: number;
  agent_id?: number;
  lease_terms_id?: number;
};

// Database operations
export const db = {
  properties: {
    async getAll() {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          location (*),
          specifications (*),
          utilities (*),
          agent (*),
          lease_terms (*)
        `);
      if (error) throw error;
      return data;
    },

    async getById(id: number) {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          location (*),
          specifications (*),
          utilities (*),
          agent (*),
          lease_terms (*)
        `)
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },

    async create(property: Omit<Property, 'id' | 'created_at' | 'updated_at'>) {
      const { data, error } = await supabase
        .from('properties')
        .insert(property)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    async update(id: number, property: Partial<Property>) {
      const { data, error } = await supabase
        .from('properties')
        .update(property)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    async delete(id: number) {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);
      if (error) throw error;
    }
  }
};
