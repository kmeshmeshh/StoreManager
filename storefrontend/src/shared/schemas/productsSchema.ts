import { z } from "zod";

export const productsSchema = z.object({
    code: z.string().min(1, { message: "من فضلك ادخل كود المنتج" }),
    name: z.string().min(1, { message: "من فضلك ادخل اسم المنتج" }),
    category: z.string().min(1, { message: "من فضلك ادخل صنف المنتج" }),
    actualPrice: z.number({
        error: "من فضلك ادخل سعر المنتج",
    }).min(0, { message: "السعر يجب أن يكون 0 أو أكثر" }),
    sellPrice: z.number({
        error: "من فضلك ادخل سعر بيع المنتج",
    }).min(0, { message: "السعر يجب أن يكون 0 أو أكثر" }),

    amount: z.number({
        error: "من فضلك ادخل كمية المنتج",
    }).int().min(1, { message: "الكمية يجب أن تكون 1 على الأقل" }),
});
