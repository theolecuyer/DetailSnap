import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

const AsyncStorageAdapter = {
  getItem: (key: string) => {
    return AsyncStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    return AsyncStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    return AsyncStorage.removeItem(key);
  },
};

const supabaseUrl = 'https://zanphjupvpiyweglanme.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphbnBoanVwdnBpeXdlZ2xhbm1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3NTA3ODYsImV4cCI6MjA0NjMyNjc4Nn0.0K3sPSKrMrcX2z8dYgAEYxvCYxgAuBudaugMg-TMEgw';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorageAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});