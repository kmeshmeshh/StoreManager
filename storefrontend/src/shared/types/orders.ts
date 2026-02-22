import type { Product } from "./products";

export type Orders = {
    id: number;
    orderDate: Date,
    totalPrice: number,
    orderItems: OrderItems,
    discount: number;
}

export type OrderItems = {
    productId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    product: Product;
}

export type OrderItemPayload = {
    productId: number;
    quantity: number;
};

export type CreateOrderPayload = {
    items: OrderItemPayload[];
};

export type OrderDetail = Orders & {
    orderItems: OrderItems[];
}