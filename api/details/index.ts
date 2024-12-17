import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";

export const useDetailList = () => {
  const { group, session, loading } = useAuth();
  return useQuery({
    queryKey: ['details', session?.user?.id, group?.id],
    queryFn: async () => {
      if (!group?.id) {
        return [];
      }
      const { data, error } = await supabase
        .from('details')
        .select('*')
        .eq('group', group.id);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    enabled: !!session && !!group?.id && !loading,
  });
}

/**
 * Adds a new car detail to the Supabase table. Assumes the detail has been populated with values
 * @param detail The detail to add, without the id and open_at values intialized
 * @returns an error that is either null or contains a PostgrestError
 */
export const addDetail = async (detail: Omit<carDetail, "id" | "open_at">) => {
  const { data, error } = await supabase
    .from("details")
    .insert(detail)

  return error;
};