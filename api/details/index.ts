import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";

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