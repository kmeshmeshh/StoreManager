import { useQuery } from "@tanstack/react-query";
import type { ReturnInvoice } from "../../../shared/types/returns";
import axiosClient from "../../../../axiosClient.ts";
import type { OrderDetail } from "../../../shared/types/orders.ts";

export const useGetReturns = () => {
    return useQuery({
        queryKey: ["returns"],
        queryFn: async () => {
            const response =
                await axiosClient.get<ReturnInvoice[]>("/Returns");
            return response.data;
        },
    });
};

export const useGetReturnById = (id: number) => {
    return useQuery({
        queryKey: ["returns", id],
        queryFn: async () => {
            const response = await axiosClient.get<ReturnInvoice>(
                `/Returns/${id}`
            );
            return response.data;
        },
        enabled: !!id,
    });
};

export const useGetReturnsByOrderId = (orderId: number | null) => {
    return useQuery({
        queryKey: ["returns", "by-order", orderId],
        queryFn: async () => {
            const response = await axiosClient.get<ReturnInvoice[]>(
                `/Returns/order/${orderId}`
            );
            return response.data;
        },
        enabled: !!orderId,
    });
};

export const useGetOrderById = (id: number | null) => {
    return useQuery({
        queryKey: ["orders", id],
        queryFn: async () => {
            if (!id) return null;
            const response = await axiosClient.get<OrderDetail>(
                `/Orders/${id}`
            );
            return response.data;
        },
        enabled: !!id,
        retry: false,
    });
};