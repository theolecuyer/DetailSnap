import { Database } from "./database.types";

declare global {
    type detailShop = Database['public']['Tables']['groups']['Insert']
    type carDetail = Database['public']['Tables']['details']['Insert'] | AddCardInfo
    type customer = Database['public']['Tables']['customers']['Insert']
    type service = Database['public']['Tables']['services']['Insert']
    type serviceUpdate = Database['public']['Tables']['services']['Update']
    //Add card to add to the end of detail lists
    type AddCardInfo = {
        id: "add_card";
        type: "add";
    };
}
