export type detailInfo = {
    id: number;
    image: string | null;
    services: Service[];
    carMake: string;
    carModel: string;
    date: string;
}

export type shop {
    id: number;
    image: string|null;
    owner: account;
    manager: account[];
    employee: account[];
}

export type account = {
    id: number;
    image: string | null;
    permissions: Permissions;
}

type Permissions = 'Owner' | 'Manager' | 'Employee'
type Service = 'Interior' | 'Exterior' | 'Ceramic Coating' | 'Tint';
