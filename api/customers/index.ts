import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";

/**
 * For the current shop group, the customers are returned
 * @returns An array of customer objects
 */
export const useCustomerList = () => {
  const { group } = useAuth();
    return useQuery({
      queryKey: ['customers'],
      queryFn: async () => {
        const {data, error} = await supabase
          .from('customers')
          .select('*')
          .eq('cust_shop', group.id);
        if(error) {
          throw new Error(error.message);
        }
        return data;
      },
    });
}

/**
 * Adds a new customer to the Supabase table. Assumes the customer has been populated with values
 * @param customer The customer to add, without the id value intialized
 * @returns an error that is either null or contains a PostgrestError
 */
export const addCustomer = async (customer: Omit<customer, "id">) => {
  const { data, error } = await supabase
    .from("customers")
    .insert(customer)

  return error;
};

/**
 * Deletes the current customer object given the id for the customer
 * @param customer - A customer object which contains the id to be deleted
 * @returns Either null or a postgres response with the delete message
 */
export const deleteCustomer = async (customer:customer) => {
  if(customer.id) {
    const response = await supabase
      .from("customers")
      .delete()
      .eq('id', customer.id)
      return response
  }
  return null
}
