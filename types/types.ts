import { Database } from "./database.types";

export type detailShop = Database['public']['Tables']['groups']['Insert']
export type carDetail = Database['public']['Tables']['details']['Insert'] | AddCardInfo
export type customer = Database['public']['Tables']['customers']['Insert']
//Add card to add to the end of detail lists
export type AddCardInfo = {
    id: "add_card";
    type: "add";
};
