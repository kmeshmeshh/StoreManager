export type Product = {
    id: number;
    code: string;
    name: string;
    category: string;
    actualPrice: number;
    sellPrice: number;
    amount: number;
}

export type Customers = {
    id: number;
    name: string;
    phoneNumber: string;
    ordersCount: number;
    totalSpent: number;
}

export type CartItem = Product & {
    orderQuantity: number;
    lineTotal: number;
}


export const PRODUCT_CATEGORIES = [
    { label: "تيشيرت", value: "تيشيرت" },
    { label: "بنطلون", value: "بنطلون" },
    { label: "قميص", value: "قميص" },
    { label: "حذاء", value: "حذاء" },
    { label: "أخرى", value: "أخرى" },
];