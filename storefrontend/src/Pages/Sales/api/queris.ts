import { useQuery } from "@tanstack/react-query";
import axiosClient from "../../../../axiosClient.ts";


export const useGetAllSales = () => {
    return useQuery({
        queryKey: ['sales'],
        queryFn: async () => {
            const response = await axiosClient.get(`/Orders`);
            return response.data;
        },
    });
};
