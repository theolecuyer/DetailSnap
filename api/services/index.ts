import { supabase } from "@/lib/supabase";

/**
 * Adds a new service to the Supabase table. Assumes the detail has been populated with values
 * @param detail The detail to add, without the id and open_at values intialized
 * @returns an error that is either null or contains a PostgrestError
 */
export const addService = async (service: Omit<service, "id">) => {
    const { data, error } = await supabase
      .from("services")
      .insert(service)
  
    return error;
};

/**
 * Updates a service given by the serviceUpdate type which corresponds to the id of the service.
 * @param service The service to update, with modified values.
 * @returns an error that is either null or contains a PostgrestError
 */
export const updateService = async (service: serviceUpdate) => {
    const { data, error } = await supabase
        .from("services")
        .update(service)
        .match({ id: service.id });
  
    return error;
};