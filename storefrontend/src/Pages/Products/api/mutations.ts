import { useMutation } from "@tanstack/react-query";
import axiosClient from "../../../../axiosClient.ts";
import type { productsSchema } from "../../../shared/schemas/productsSchema.ts";
import { z } from "zod";
import type { Product } from "../../../shared/types/products.ts";


export const useCreateProduct = () => {
    return useMutation({
        mutationFn: async (newProduct: z.infer<typeof productsSchema>) => {
            const response = await axiosClient.post('/Products', newProduct);
            return response.data;
        },
    });
};

export const useDeleteProduct = () => {
    return useMutation({
        mutationFn: async (id: number) => {
            const response = await axiosClient.delete(`/Products/${id}`);
            return response.data;
        },
    });
};

export const useUpdateProduct = () => {
    return useMutation({
        mutationFn: async (product: Product) => {
            const response = await axiosClient.put(
                `/Products/${product.id}`,
                product
            );
            return response.data;
        },
    });
};
