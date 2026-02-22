import React, { useState, useMemo, useEffect } from "react";
import { Search, RotateCcw, AlertTriangle, CheckCircle, Info } from "lucide-react";
import type {
    CreateReturnDto,
} from "../../../shared/types/returns";
import { useCreateReturn } from "../api/mutations";
import { useGetOrderById, useGetReturnsByOrderId } from "../api/queries";
import Modal from "../../../shared/ui/modal";
import { ModalBody, ModalFooter } from "../../../shared/ui/modal/styled";
import Button from "../../../shared/ui/button";
import { useSnackbar } from "../../../shared/ui/snack-bar";
import { ButtonVariant } from "../../../constants/theme.constants";
import InputField from "../../../shared/ui/input-field";
import {
    SearchContainer,
    ErrorBox,
    OrderInfoBox,
    OrderDateLabel,
    ItemsListContainer,
    ItemRow,
    ItemInfo,
    ItemName,
    ItemDetails,
    ControlsContainer,
    QtyInputWrapper,
    RemainingBadge,
    FullyReturnedOverlay,
    DiscountInfoBox,
    PriceInputWrapper,
    OriginalPriceHint,
    ItemControlsRow,
} from "./styled";

type Props = {
    onClose: () => void;
    receiptId? :number
};

interface SelectedItem {
    productId: number;
    quantity: number;
    unitRefundPrice: number;
}

const CreateReturnModal = ({ onClose, receiptId }: Props) => {
    const { showSnackbar } = useSnackbar();
    const [searchId, setSearchId] = useState<string>("");
    const [activeOrderId, setActiveOrderId] = useState<number | null>(null);
    const [note, setNote] = useState("");
    const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

    const {
        data: order,
        isLoading: isOrderLoading,
        isError,
    } = useGetOrderById(activeOrderId);

    const { data: previousReturns } = useGetReturnsByOrderId(activeOrderId);
    const { mutate: createReturn, isPending: isSubmitting } = useCreateReturn();

    useEffect(() => {
        if (receiptId) {
            setSearchId(String(receiptId));
            setActiveOrderId(receiptId);
        }
    }, [receiptId]);


    const discountInfo = useMemo(() => {
        if (!order) return { subtotal: 0, discount: 0, discountPercent: 0, hasDiscount: false };

        const subtotal = order.orderItems.reduce(
            (sum, item) => sum + item.unitPrice * item.quantity,
            0
        );
        const discount = order.discount || 0;
        const discountPercent = subtotal > 0
            ? Math.round((discount / subtotal) * 100)
            : 0;

        return { subtotal, discount, discountPercent, hasDiscount: discount > 0 };
    }, [order]);

    const alreadyReturnedMap = useMemo(() => {
        const map = new Map<number, number>();
        if (!previousReturns) return map;

        previousReturns.forEach((returnInvoice) => {
            returnInvoice.returnItems?.forEach((item) => {
                const current = map.get(item.productId) || 0;
                map.set(item.productId, current + item.quantity);
            });
        });

        return map;
    }, [previousReturns]);

    const totalRefund = useMemo(() => {
        return selectedItems.reduce((sum, item) => {
            return sum + item.unitRefundPrice * item.quantity;
        }, 0);
    }, [selectedItems]);

    const handleSearch = () => {
        if (!searchId) return;
        setActiveOrderId(Number(searchId));
        setSelectedItems([]);
    };

    const handleQuantityChange = (
        productId: number,
        quantity: number,
        maxReturnable: number,
        originalUnitPrice: number
    ) => {
        if (quantity > maxReturnable) {
            showSnackbar(
                `أقصى كمية مسموح بإرجاعها: ${maxReturnable}`,
                "warning"
            );
            return;
        }

        setSelectedItems((prev) => {
            if (quantity <= 0) {
                return prev.filter((i) => i.productId !== productId);
            }

            const existingIndex = prev.findIndex(
                (i) => i.productId === productId
            );

            if (existingIndex >= 0) {
                const updated = [...prev];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity,
                };
                return updated;
            } else {
                return [
                    ...prev,
                    {
                        productId,
                        quantity,
                        unitRefundPrice: originalUnitPrice,
                    },
                ];
            }
        });
    };

    const handlePriceChange = (
        productId: number,
        newPrice: number,
        maxPrice: number
    ) => {
        if (newPrice > maxPrice) {
            showSnackbar(
                `سعر الإرجاع لا يمكن أن يتجاوز السعر الأصلي: ${maxPrice} ج.م`,
                "warning"
            );
            return;
        }

        setSelectedItems((prev) => {
            const updated = [...prev];
            const index = updated.findIndex((i) => i.productId === productId);
            if (index >= 0) {
                updated[index] = {
                    ...updated[index],
                    unitRefundPrice: newPrice,
                };
            }
            return updated;
        });
    };

    const handleSubmit = () => {
        if (!activeOrderId || selectedItems.length === 0) return;

        for (const item of selectedItems) {
            if (item.unitRefundPrice <= 0) {
                showSnackbar("سعر الإرجاع لازم يكون أكبر من صفر", "error");
                return;
            }
        }

        const payload: CreateReturnDto = {
            originalInvoiceId: activeOrderId,
            note: note || undefined,
            items: selectedItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                unitRefundPrice: item.unitRefundPrice,
            })),
        };

        createReturn(payload, {
            onSuccess: () => {
                showSnackbar(
                    "تم حفظ المرتجع بنجاح وتحديث المخزون ✅",
                    "success"
                );
                onClose();
            },
            onError: (err: any) => {
                const errorMessage =
                    err?.response?.data?.error ||
                    err?.response?.data ||
                    "حدث خطأ أثناء حفظ المرتجع";
                showSnackbar(errorMessage, "error");
            },
        });
    };

    return (
        <Modal onClose={onClose} title="إضافة مرتجع جديد" size="lg">
            <ModalBody>
                <SearchContainer>
                    <InputField
                        label="رقم الفاتورة الأصلية"
                        placeholder="مثال: 105"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        type="number"
                        onKeyDown={(e) =>
                            e.key === "Enter" && handleSearch()
                        }
                    />
                    <Button
                        onClick={handleSearch}
                        isLoading={isOrderLoading}
                        disabled={!searchId}
                        icon={<Search width={16} />}
                        style={{ marginBottom: "18px" }}
                    >
                        بحث
                    </Button>
                </SearchContainer>

                {isError && (
                    <ErrorBox>
                        <AlertTriangle size={18} />
                        الفاتورة غير موجودة، تأكد من الرقم.
                    </ErrorBox>
                )}

                {order && (
                    <div style={{ animation: "fadeIn 0.3s ease-in" }}>
                        <OrderInfoBox>
                            <OrderDateLabel>تاريخ الفاتورة: </OrderDateLabel>
                            {new Date(order.orderDate).toLocaleDateString("ar-EG")}
                        </OrderInfoBox>

                        {discountInfo.hasDiscount && (
                            <DiscountInfoBox>
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    marginBottom: "8px"
                                }}>
                                    <Info size={20} />
                                    <strong>
                                        تنبيه: يوجد خصم على هذه الفاتورة
                                        ({discountInfo.discount.toLocaleString()} ج.م
                                        - {discountInfo.discountPercent}%)
                                    </strong>
                                </div>
                                <div style={{
                                    fontSize: "0.85rem",
                                    opacity: 0.9,
                                    lineHeight: 1.6
                                }}>
                                    يمكنك تعديل سعر الإرجاع لكل صنف حسب ما تراه مناسباً
                                </div>
                            </DiscountInfoBox>
                        )}

                        <ItemsListContainer>
                            {order.orderItems.map((item) => {
                                const alreadyReturned =
                                    alreadyReturnedMap.get(item.productId) || 0;
                                const maxReturnable =
                                    item.quantity - alreadyReturned;
                                const isFullyReturned = maxReturnable <= 0;

                                const currentSelection = selectedItems.find(
                                    (x) => x.productId === item.productId
                                );
                                const currentQty = currentSelection?.quantity || 0;
                                const currentPrice =
                                    currentSelection?.unitRefundPrice ?? item.unitPrice;

                                const RowComponent = isFullyReturned
                                    ? FullyReturnedOverlay
                                    : ItemRow;

                                return (
                                    <RowComponent key={item.productId}>
                                        <ItemInfo>
                                            <ItemName>{item.product.name}</ItemName>
                                            <ItemDetails>
                                                تم شراء:{" "}
                                                <span>{item.quantity}</span>
                                                {" | "}
                                                السعر: {item.unitPrice} ج.م
                                                {alreadyReturned > 0 && (
                                                    <>
                                                        {" | "}
                                                        تم إرجاع:{" "}
                                                        <span>{alreadyReturned}</span>
                                                    </>
                                                )}
                                            </ItemDetails>

                                            <div style={{ marginTop: "4px" }}>
                                                {isFullyReturned ? (
                                                    <RemainingBadge $hasRemaining={false}>
                                                        <CheckCircle
                                                            size={12}
                                                            style={{
                                                                display: "inline",
                                                                verticalAlign: "middle",
                                                                marginLeft: "4px",
                                                            }}
                                                        />
                                                        تم إرجاع الكمية بالكامل
                                                    </RemainingBadge>
                                                ) : (
                                                    <RemainingBadge $hasRemaining={true}>
                                                        متبقي للإرجاع: {maxReturnable}
                                                    </RemainingBadge>
                                                )}
                                            </div>
                                        </ItemInfo>

                                        {!isFullyReturned && (
                                            <ControlsContainer>
                                                <ItemControlsRow>
                                                    <div>
                                                        <QtyInputWrapper>
                                                            <InputField
                                                                type="number"
                                                                min={0}
                                                                max={maxReturnable}
                                                                value={currentQty}
                                                                onChange={(e) =>
                                                                    handleQuantityChange(
                                                                        item.productId,
                                                                        parseInt(e.target.value) || 0,
                                                                        maxReturnable,
                                                                        item.unitPrice
                                                                    )
                                                                }
                                                                label="الكمية"
                                                            />
                                                        </QtyInputWrapper>
                                                    </div>

                                                    {currentQty > 0 && (
                                                        <div>
                                                            <PriceInputWrapper>
                                                                <InputField
                                                                    type="number"
                                                                    min={0}
                                                                    max={item.unitPrice}
                                                                    value={currentPrice}
                                                                    onChange={(e) =>
                                                                        handlePriceChange(
                                                                            item.productId,
                                                                            parseFloat(e.target.value) || 0,
                                                                            item.unitPrice
                                                                        )
                                                                    }
                                                                    label="سعر الإرجاع"
                                                                />
                                                            </PriceInputWrapper>

                                                            {currentPrice !== item.unitPrice && (
                                                                <OriginalPriceHint>
                                                                    الأصلي: <span>{item.unitPrice}</span> ج.م
                                                                </OriginalPriceHint>
                                                            )}
                                                        </div>
                                                    )}
                                                </ItemControlsRow>
                                            </ControlsContainer>
                                        )}
                                    </RowComponent>
                                );
                            })}
                        </ItemsListContainer>

                        {totalRefund > 0 && (
                            <OrderInfoBox
                                style={{
                                    background: "#ecfdf5",
                                    borderColor: "#86efac",
                                }}
                            >
                                <span style={{
                                    fontWeight: "bold",
                                    fontSize: "1.1rem",
                                }}>
                                    💰 إجمالي المبلغ المسترد:{" "}
                                    <span style={{ color: "#16a34a" }}>
                                        {totalRefund.toLocaleString()} ج.م
                                    </span>
                                </span>

                                <div style={{
                                    marginTop: "8px",
                                    fontSize: "0.85rem",
                                    color: "#6b7280",
                                }}>
                                    {selectedItems.map((sel) => {
                                        const orderItem = order.orderItems.find(
                                            (x) => x.productId === sel.productId
                                        );
                                        if (!orderItem) return null;
                                        return (
                                            <div key={sel.productId}>
                                                {orderItem.name}:{" "}
                                                {sel.quantity} × {sel.unitRefundPrice} ={" "}
                                                <strong>
                                                    {(sel.quantity * sel.unitRefundPrice).toLocaleString()} ج.م
                                                </strong>
                                            </div>
                                        );
                                    })}
                                </div>
                            </OrderInfoBox>
                        )}

                        <InputField
                            label="ملاحظات (اختياري)"
                            placeholder="سبب الإرجاع..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </div>
                )}
            </ModalBody>

            <ModalFooter>
                <Button
                    variant={ButtonVariant.Outline}
                    onClick={onClose}
                    disabled={isSubmitting}
                >
                    إلغاء
                </Button>
                <Button
                    onClick={handleSubmit}
                    isLoading={isSubmitting}
                    disabled={selectedItems.length === 0}
                    icon={<RotateCcw width={16} />}
                >
                    تأكيد الإرجاع ({selectedItems.length} صنف)
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default CreateReturnModal;