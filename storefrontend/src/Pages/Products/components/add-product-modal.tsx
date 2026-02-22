import { useForm } from "react-hook-form";
import { productsSchema } from "../../../shared/schemas/productsSchema";
import Modal from "../../../shared/ui/modal"
import { ModalBody, ModalFooter } from "../../../shared/ui/modal/styled"
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProduct } from "../api/mutations";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import InputField from "../../../shared/ui/input-field";
import Button from "../../../shared/ui/button";
import { useSnackbar } from "../../../shared/ui/snack-bar";
import { PRODUCT_CATEGORIES } from "../../../shared/types/products";
import SelectField from "../../../shared/ui/select-field";

type Props = {
    onClose: () => void;
};

const AddProdactModal = ({ onClose }: Props) => {
    const queryClient = useQueryClient();
    const { showSnackbar } = useSnackbar(); 


    const { mutate, isPending } = useCreateProduct();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<z.infer<typeof productsSchema>>({
        resolver: zodResolver(productsSchema),
    });


    const onSubmit = (formData: z.infer<typeof productsSchema>) => {
        mutate(formData, {
            onSuccess: () => {
                showSnackbar("تم إضافة المنتج بنجاح!", "success");
                reset();
                queryClient.invalidateQueries({ queryKey: ['products'] });
                onClose(); 
            },
            onError: (err) => {
                showSnackbar("حدث خطأ أثناء الإضافة", "error");
            }
        });
    };

    return (
        <Modal
            onClose={onClose}
            title="إضافة منتج جديد"
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
                            اضافة المنتج
                        </Button>
                </ModalFooter>
            </ModalBody>
                </form>

        </Modal>
    )
}
export default AddProdactModal;