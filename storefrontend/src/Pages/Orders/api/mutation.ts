import { useMutation } from "@tanstack/react-query";
import axiosClient from "../../../../axiosClient.ts";
import type { CreateOrderPayload } from "../../../shared/types/orders.ts";


export const useCreateOrder = () => {
    return useMutation({
        mutationFn: async (newOrder: CreateOrderPayload) => {
            const response = await axiosClient.post('/Orders', newOrder);
            return response.data;
        },
    });
};