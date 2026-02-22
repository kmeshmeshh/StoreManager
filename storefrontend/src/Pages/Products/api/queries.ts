import { useQuery } from "@tanstack/react-query";
import axiosClient from "../../../../axiosClient.ts";

export const useGetProductsOptions = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await axiosClient.get('/Products');
            return response.data;
        },
    });
};

export const useGetProductByIdOptions = (Id: number) => {
    return useQuery({
        queryKey: ['products', Id],
        queryFn: async () => {
            const response = await axiosClient.get(`/Products/${Id}`);
            return response.data;
        },
        enabled: !!Id, 
    });
};


