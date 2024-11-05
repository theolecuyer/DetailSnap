
export type CarDetailInfo = {
    id: number;
    image: string | null;
    services: Service[];
    open: boolean;
    carMake: string;
    carModel: string;
    date: string;
};

export type AddCardInfo = {
    id: "add_card";
    type: "add";
};

export type detailInfo = CarDetailInfo | AddCardInfo;


export type customer = {
    customerName: string;
    email: string;
    phoneNumber: string;
    details: detailInfo[];
};

export type active = {
    activeDetails: detailInfo[];
};

export type shop = {
    id: number;
    image: string|null;
    owner: account;
    manager: account[];
    employee: account[];
};

export type account = {
    id: number;
    image: string | null;
    permissions: Permissions;
};

export type Permissions = 'Owner' | 'Manager' | 'Employee'
export type Service = 'Interior' | 'Exterior' | 'Ceramic Coating' | 'Tint';
