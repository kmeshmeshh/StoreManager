import { useQuery } from "@tanstack/react-query";
import axiosClient from "../../../../axiosClient.ts";

export const useGetCustomersOptions = () => {
    return useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
            const response = await axiosClient.get('/Customers');
            return response.data;
        },
    });
};
