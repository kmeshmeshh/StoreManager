import { useMutation } from "@tanstack/react-query";
import axiosClient from "../../../../axiosClient.ts";

export const useSendBulkWhatsApp = () => {
    return useMutation({
        mutationFn: async (payload: { phoneNumbers: string[], message: string }) => {
            const response = await axiosClient.post('/WhatsApp/bulk', payload);
            return response.data; // هيرجع { status: "Success", message: "..." }
        },
    });
};