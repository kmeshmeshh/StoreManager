import { useForm } from "react-hook-form";
import { productsSchema } from "../../../shared/schemas/productsSchema";
import Modal from "../../../shared/ui/modal"
import { ModalBody, ModalFooter } from "../../../shared/ui/modal/styled"
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateProduct } from "../api/mutations";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import InputField from "../../../shared/ui/input-field";
import Button from "../../../shared/ui/button";
import { useSnackbar } from "../../../shared/ui/snack-bar";
import { PRODUCT_CATEGORIES } from "../../../shared/types/products";
import SelectField from "../../../shared/ui/select-field";
import { useGetProductByIdOptions } from "../api/queries";
import { useEffect } from "react";

type Props = {
    onClose: () => void;
    productId: number;
};

const UpdateProdactModal = ({ onClose, productId }: Props) => {
    const queryClient = useQueryClient();
    const { showSnackbar } = useSnackbar();
    const { data } = useGetProductByIdOptions(productId);


    const { mutate, isPending } = useUpdateProduct();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<z.infer<typeof productsSchema>>({
        resolver: zodResolver(productsSchema),
    });

    useEffect(() => {
        if (data) {
            reset({
                code: data.code,
                name: data.name,
                actualPrice: data.actualPrice,
                sellPrice: data.sellPrice,
                amount: data.amount,
                category: data.category
            });
        }
    }, [data, reset]);

    const onSubmit = (formData: z.infer<typeof productsSchema>) => {
        mutate(
            { ...formData, id: productId },
            {
                onSuccess: () => {
                    showSnackbar("تم تعديل المنتج بنجاح!", "success");
                    queryClient.invalidateQueries({ queryKey: ['products'] });
                    onClose();
                },
                onError: () => {
                    showSnackbar("حدث خطأ أثناء التعديل", "error");
                }
            }
        );
    };


    return (
        <Modal
            onClose={onClose}
            title="تعديل المنتج"
            size="lg"
        >
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              
                <ModalBody>
                    <InputField
                        label="الكود"
                        error={errors.code?.message}
                        placeholder="ادخل كود المنتج"
                        {...register('code')}
                    />
                    <InputField
                        label="اسم المنتج"
                        error={errors.name?.message}
                        placeholder="ادخل اسم المنتج"
                        {...register('name')}
                    />
                    <InputField
                        label="سعر الجملة"
                        type='number'
                        error={errors.actualPrice?.message}
                        placeholder="ادخل سعر المنتج"
                        {...register('actualPrice', { valueAsNumber: true })}
                    />
                    <InputField
                        label="سعر البيع"
                        type='number'
                        error={errors.sellPrice?.message}
                        placeholder="ادخل سعر بيع المنتج"
                        {...register('sellPrice', { valueAsNumber: true })}
                    />
                    <InputField
                        label="الكمية"
                        type='number'
                        error={errors.amount?.message}
                        placeholder="ادخل الكمية المتاحة للمنتج"
                        {...register('amount', { valueAsNumber: true })}
                    />
                    <SelectField
                        label="القسم"
                        options={PRODUCT_CATEGORIES}
                        error={errors.category?.message}
                        {...register('category')}
                    />


                    <ModalFooter>

                        <Button type="submit" size="sm" isLoading={isPending}>
                            تعديل المنتج
                        </Button>
                    </ModalFooter>
                </ModalBody>
            </form>

        </Modal>
    )
}
export default UpdateProdactModal;
