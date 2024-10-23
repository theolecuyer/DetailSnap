export type detailInfo = {
    id: number;
    image: string | null;
    services: Service[];
    carMake: string;
    carModel: string;
    date: string,
}

export type account = {
    id: number;
    image: string | null;
    permissions: Permissions;
}

type Permissions = 'Owner' | 'Manager' | 'Employee'
type Service = 'Interior' | 'Exterior' | 'Ceramic Coating' | 'Tint';
