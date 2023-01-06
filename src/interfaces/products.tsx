export interface ReqResListado {
    products: Array<Product>;
}

export type Product = {
    name: string;
    price: number;
    amount: number;
    id: number;
}

export type Item = {
    id: number;
    name: string;
    quantity: number;
    price?: number;
    total?: number;
}