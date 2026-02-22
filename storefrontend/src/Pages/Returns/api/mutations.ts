import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../../../../axiosClient.ts";
import type { CreateReturnDto } from "../../../shared/types/returns";

export const useCreateReturn = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newReturn: CreateReturnDto) => {
            const response = await axiosClient.post('/Returns', newReturn);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['returns'] });
            queryClient.invalidateQueries({ queryKey: ['products'] });
        }
    });
};