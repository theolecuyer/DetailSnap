import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const useProductList = () => {
    return useQuery({
        queryKey: ['details'],
        queryFn: async () => {
          const {data, error} = await supabase
            .from('details')
            .select('*');
          if(error) {
            throw new Error(error.message);
          }
          return data;
        },
      });
}