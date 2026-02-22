import Modal from "../../../shared/ui/modal";
import { ModalBody, ModalFooter } from "../../../shared/ui/modal/styled";
import { useDeleteProduct } from "../api/mutations";
import { useQueryClient } from "@tanstack/react-query";
import Button from "../../../shared/ui/button";
import { useSnackbar } from "../../../shared/ui/snack-bar";
import {ButtonVariant } from "../../../constants/theme.constants";

type Props = {
    onClose: () => void;
    productId: number;
};

const ConfirmationModal = ({ onClose, productId }: Props) => {
    const queryClient = useQueryClient();
    const { showSnackbar } = useSnackbar();

    const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

    const handleDeleteClick = () => {
        deleteProduct(productId, {
            onSuccess: () => {
                showSnackbar("تم حذف المنتج بنجاح", "success");
                queryClient.invalidateQueries({ queryKey: ['products'] });
                onClose(); 
            },
            onError: (err) => {
                console.log(err);
                showSnackbar("فشل حذف المنتج", "error");
            }
        });
    };

    return (
        <Modal
            onClose={onClose}
            title="حذف منتج" 
            size="md" 
        >
            <ModalBody>
                <p style={{ fontSize: '16px', textAlign: 'center' }}>
                    هل أنت متأكد من أنك تريد حذف هذا المنتج نهائياً؟
                </p>
            </ModalBody>

            <ModalFooter>
                <Button
                    variant={ButtonVariant.Danger}
                    size="sm"
                    isLoading={isDeleting}
                    onClick={handleDeleteClick}
                >
                    نعم، احذف
                </Button>

                <Button
                    variant={ButtonVariant.Outline}
                    size="sm"
                    disabled={isDeleting}
                    onClick={onClose}
                >
                    الغاء
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ConfirmationModal;