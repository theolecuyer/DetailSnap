import { supabase } from "@/lib/supabase";

/**
 * Adds a new group to the Supabase table. Assumes the group has been populated with values
 * @param detailShop The detailShop to add, without the id value intialized
 * @returns The id of the group value inserted into the database
 */
export const addShop = async (shop: Omit<detailShop, "id">) => {
  const { data, error } = await supabase
    .from("groups")
    .insert(shop)
    .select()

  if (error) {
    throw new Error(error.message);
  }
  return data[0].id;
};
