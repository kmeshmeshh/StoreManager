import { z } from 'zod';

export const searchProductSchema = z.object({
    code: z.string()
        .min(1, "كود المنتج مطلوب")
        .trim(),
});

export const addToCartSchema = z.object({
    quantity: z.coerce
        .number({ error: "الكمية يجب أن تكون رقم" })
        .int("الكمية يجب أن تكون رقم صحيح")
        .min(1, "الكمية يجب أن تكون 1 على الأقل"),
});

export type SearchProductFormData = z.infer<typeof searchProductSchema>;
export type AddToCartFormData = z.infer<typeof addToCartSchema>;