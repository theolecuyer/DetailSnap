export type detailInfo = {
    id: number;
    image: string | null;
    services: Service[];
    carMake: string;
    carModel: string;
}

type Service = 'Interior' | 'Exterior' | 'Ceramic Coating' | 'Tint';
