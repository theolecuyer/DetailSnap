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

/**
 * Downloads an image using the uuid as the filename and group id as foldername
 * @param detail The detail to read the image from, the image name being a uuid
 * @returns A promise that contains the file reader result as a string
 */
export const downloadDetailImage = async (detail: carDetail): Promise<string> => {
  if ('group' in detail && detail.image) {
    try {
      const { data, error } = await supabase.storage
        .from('detail_photos')
        .download(`${detail.group}/${detail.image}.avif`);
      if (error) {
        throw new Error(error.message);
      }
      return new Promise<string>((resolve, reject) => {
        const fr = new FileReader();
        fr.onloadend = () => {
          if (fr.result) {
            resolve(fr.result as string);
          } else {
            reject("Failed to convert image.");
          }
        };
        fr.onerror = () => reject("Error reading the image file.");
        fr.readAsDataURL(data as Blob);
      });
    } catch (error) {
      console.error('Error downloading the image:', error);
      throw error;
    }
  } else {
    throw new Error("Detail does not contain image id");
  }
};
