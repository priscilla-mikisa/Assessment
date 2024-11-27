export interface Product {
    id?: number;
    shopId: number;
    name: string;
    price: number;
    stockLevel: number;
    description: string;
    image?: string;
  }