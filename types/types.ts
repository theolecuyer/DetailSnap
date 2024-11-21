import { Database } from "./database.types";

export type carDetail = Database['public']['Tables']['details']['Insert'] | AddCardInfo

//Add card to add to the end of detail lists
export type AddCardInfo = {
    id: "add_card";
    type: "add";
};
