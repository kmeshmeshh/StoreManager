import { useQuery } from "@tanstack/react-query";
import axiosClient from "../../../../axiosClient.ts";


export const useGetProductByCodeOptions = (code: string) => {
    return useQuery({
        queryKey: ['products', 'code', code],
        queryFn: async () => {
            const response = await axiosClient.get(`/Products/by-code/${code}`);
            return response.data;
        },
        enabled: !!code,
    });
};
