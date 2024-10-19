type Service = 'Interior' | 'Exterior' | 'Ceramic Coating' | 'Tint';

export type detailInfo = {
    id: number;
    image: string | null;
    services: Service[];
    carMake: string;
    carModel: string;
}

const detailInfoList: detailInfo[] = [
    {
        id: 1,
        image: 'https://media.ed.edmunds-media.com/gmc/yukon-xl/2023/oem/2023_gmc_yukon-xl_4dr-suv_denali-ultimate_fq_oem_1_1280.jpg',
        services: ['Interior', 'Exterior'] as Service[],
        carMake: "GMC",
        carModel: "Yukon",
    },
    {
        id: 2,
        image: 'https://vehicle-images.dealerinspire.com/8316-110005802/1HGCY2F73RA061406/26fd5ca9a260656e22ec83a4004df14b.jpg',
        services: ['Ceramic Coating', 'Tint', 'Interior'],
        carMake: 'Honda',
        carModel: 'Accord'
    },
    {
        id: 3,
        image: 'https://vehicle-images.dealerinspire.com/c363-110008765/1FA6P8CFXR5425302/077e0bf0c84e3ef3dff79d962aaa59e0.jpg',
        services: ['Exterior'],
        carMake: 'Ford',
        carModel: 'Mustang'
    },
    {
        id: 4,
        image: 'https://i.pinimg.com/736x/2d/31/79/2d3179c76201d77f38d3354bb4f7cc75.jpg',
        services: ['Interior'],
        carMake: 'Ford',
        carModel: 'Escape'
    },
    {
        id: 8,
        image: 'https://media.ed.edmunds-media.com/gmc/yukon-xl/2023/oem/2023_gmc_yukon-xl_4dr-suv_denali-ultimate_fq_oem_1_1280.jpg',
        services: ['Interior', 'Exterior'] as Service[],
        carMake: "GMC",
        carModel: "Yukon",
    },
    {
        id: 5,
        image: 'https://vehicle-images.dealerinspire.com/8316-110005802/1HGCY2F73RA061406/26fd5ca9a260656e22ec83a4004df14b.jpg',
        services: ['Ceramic Coating', 'Tint', 'Interior'],
        carMake: 'Honda',
        carModel: 'Accord'
    },
    {
        id: 6,
        image: 'https://vehicle-images.dealerinspire.com/c363-110008765/1FA6P8CFXR5425302/077e0bf0c84e3ef3dff79d962aaa59e0.jpg',
        services: ['Exterior'],
        carMake: 'Ford',
        carModel: 'Mustang'
    },
    {
        id: 7,
        image: 'https://i.pinimg.com/736x/2d/31/79/2d3179c76201d77f38d3354bb4f7cc75.jpg',
        services: ['Interior'],
        carMake: 'Ford',
        carModel: 'Escape'
    }
]

export default detailInfoList;