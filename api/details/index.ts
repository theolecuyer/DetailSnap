import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import { CarDetailInfo } from "@/types";
import { PostgrestError } from "@supabase/supabase-js";

export const useDetailList = () => {
  const { group } = useAuth();
    return useQuery({
      queryKey: ['details'],
      queryFn: async () => {
        const {data, error} = await supabase
          .from('details')
          .select('*')
          .eq('group', group.id);
        if(error) {
          throw new Error(error.message);
        }
        return data;
      },
    });
}
/**
 * Adds a new car detail to the Supabase table. Assumes the detail has been populated with values
 * @param detail - The detail to add, without the id and open_at values intialized
 * @returns - returns an erorr that is either null or contains a PostgrestError
 */
export const addDetail = async (detail: Omit<CarDetailInfo, "id" | "open_at">) => {
  const { data, error } = await supabase
    .from("details")
    .insert(detail)

  return error;
};
