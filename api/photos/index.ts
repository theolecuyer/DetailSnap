import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";

/**
 * Gets the public URL for an image stored in Supabase.
 * The photos utilize UUID's and group id's, making them secure
 *
 * @param detail - The detail containing the group and image ID.
 * @returns The public URL for the image.
 * @throws If the detail is invalid.
 */
export const getPhotoURL = (detail: carDetail): string => {
    //TODO: call this function when initially adding photo to detail and store inplace of path.
    
    if ('group' in detail && detail.image) {
      const path = `${detail.group}/${detail.image}.avif`
      const { data } = supabase.storage
        .from('detail_photos')
        .getPublicUrl(path)
      return data?.publicUrl || '';
    } else {
      return '';
    }
};

/**
 * Creates a new empty group folder in Supabase storage.
 * @param groupId - The groupID to name the folder.
 * @returns A Promise that resolves to a success boolean or rejects on error.
 */
export const createGroupFolder = async (groupId: number): Promise<boolean> => {
    try {
      const { error: uploadError } = await supabase.storage
        .from('detail_photos')
        .upload(`${groupId}/.empty`, '', {
          cacheControl: '3600',
          upsert: false,
        });
      if (uploadError) {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  };