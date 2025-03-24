export interface Formation {
    id: number;
    short: string;
    vehicles: {
        code: string,
        brakeMode: number,
    }[]
}