export type ReturnItem = {
    id: number;
    returnInvoiceId: number;
    productId: number;
    quantity: number;
    unitRefundPrice: number;
}

export type ReturnInvoice ={
    id: number;
    originalInvoiceId: number;
    returnDate: string;
    totalRefundAmount: number;
    note?: string;
    returnItems: ReturnItem[];
}

export type CreateReturnDto = {
    originalInvoiceId: number;
    note?: string;
    items: ReturnItemDto[];
}

export type ReturnItemDto = {
    productId: number;
    quantity: number;
    unitRefundPrice: number;  
}