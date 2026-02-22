import { useQuery } from "@tanstack/react-query";
import axiosClient from "../../../../axiosClient.ts";

export const useGetDashboardOptions = (selectedDate: Date) => {
    const dateString = selectedDate.toISOString().split('T')[0];

    return useQuery({
        queryKey: ['dashboard', dateString],
        queryFn: async () => {
            const response = await axiosClient.get(`/Dashboard?date=${dateString}`);
            return response.data;
        },
    });
};