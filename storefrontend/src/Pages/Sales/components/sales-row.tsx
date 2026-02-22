import {
    MainRow,
    ExpandButton,
    DetailsRow,
    DetailsContainer,
    ProductsGrid,
    ProductCard,
    ProductInfo,
    ProductPrice,
    PriceBadge,
    DateBadge,
    OrderId,
    DateText,
    TimeText,
    DetailsHeader,
    DetailsTitle,
    DetailsCount,
    ProductName,
    ProductCategory,
    ProductDeletedBadge,
    PriceValue,
    QuantityValue,
    SummaryFooter,
    SummaryColumn,
    SummaryLabel,
    SummaryValue
} from "./styled";
import { EmptyCartState, EmptyCartTitle } from "../../Orders/components/styled";
import { PackageOpen, ChevronDown,  CornerUpLeft } from "lucide-react";
import { ButtonVariant, Colors } from "../../../constants/theme.constants";
import Button from "../../../shared/ui/button";
import { useState } from "react";
import CreateReturnModal from "../../Returns/components/create-return-modal";
import { ReturnChartBar } from "../../Dashboard/components/styled";

const SalesRow = ({
    order,
    isOpen,
    onToggle,
}: {
    order: any;
    isOpen: boolean;
    onToggle: () => void;
}) => {
    const subTotal = order.totalPrice + (order.discount || 0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <MainRow $isOpen={isOpen} onClick={onToggle}>
                <td>
                    <OrderId>#{order.id}</OrderId>
                </td>
                <td>{order.customer?.name || "--"}</td>
                <td>{order.customer?.phoneNumber || "-"}</td>
                <td>
                    <DateBadge>
                        <DateText>
                            {new Date(order.orderDate).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </DateText>
                        <TimeText>
                            {new Date(order.orderDate).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                        </TimeText>
                    </DateBadge>
                </td>
                <td>
                    {order.orderItems?.length || 0} منتجات
                </td>
                <td>
                    <PriceBadge>{order.totalPrice.toLocaleString()} ج.م</PriceBadge>
                </td>
                <td style={{ width: '50px' }}>
                    <ExpandButton $isOpen={isOpen}>
                        <ChevronDown size={20} />
                    </ExpandButton>
                </td>
            </MainRow>

            <DetailsRow $isOpen={isOpen}>
                <td colSpan={7}>
                    <DetailsContainer>
                        <DetailsHeader>
                            <DetailsTitle>تفاصيل الفاتورة</DetailsTitle>
                            <DetailsCount>إجمالي العناصر: {order.orderItems?.length}</DetailsCount>
                        </DetailsHeader>

                        {(!order.orderItems || order.orderItems.length === 0) ? (
                            <EmptyCartState>
                                <PackageOpen size={48} strokeWidth={1} />
                                <EmptyCartTitle> لا توجد منتجات لعرضها!</EmptyCartTitle>
                            </EmptyCartState>
                        ) : (
                            <ProductsGrid>
                                {order.orderItems.map((item: any) => (
                                    <ProductCard key={item.id}>
                                        <ProductInfo>
                                            <ProductName>{item.product?.name || "منتج غير معروف"}</ProductName>
                                            <ProductCategory>{item.product?.category || "عام"}</ProductCategory>
                                            {item.product.isDeleted &&
                                                <ProductDeletedBadge>تم حذف المنتج</ProductDeletedBadge>
                                            }
                                        </ProductInfo>
                                        <ProductPrice>
                                            <PriceValue>{item.unitPrice} ج.م</PriceValue>
                                            <QuantityValue>الكمية: {item.quantity}</QuantityValue>
                                        </ProductPrice>
                                    </ProductCard>
                                ))}
                            </ProductsGrid>
                        )}

                        <SummaryFooter>

                            <Button
                                variant={ButtonVariant.Danger}
                                onClick={() => setIsModalOpen(true)}
                                icon={<CornerUpLeft width={16} height={16} />}
                            >
                                اضافة مرتجع
                            </Button>

                            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                                {order.discount > 0 && (
                                    <>
                                        <SummaryColumn>
                                            <SummaryLabel>المجموع قبل الخصم</SummaryLabel>
                                            <SummaryValue $isStrikethrough>
                                                {subTotal.toLocaleString()} ج.م
                                            </SummaryValue>
                                        </SummaryColumn>
                                        <SummaryColumn>
                                            <SummaryLabel $color={Colors.error}>قيمة الخصم</SummaryLabel>
                                            <SummaryValue $color={Colors.error}>
                                                - {order.discount.toLocaleString()} ج.م
                                            </SummaryValue>
                                        </SummaryColumn>
                                    </>
                                )}

                                <SummaryColumn>
                                    <SummaryLabel>المجموع النهائي</SummaryLabel>
                                    <SummaryValue $size="lg" $color={Colors.dark}>
                                        {order.totalPrice.toLocaleString()} ج.م
                                    </SummaryValue>
                                </SummaryColumn>
                            </div>

                        </SummaryFooter>
                        

                    </DetailsContainer>
                </td>
                {isModalOpen && (
                    <CreateReturnModal
                        onClose={() => setIsModalOpen(false)}
                        receiptId={order.id}
                    />
                )}
            </DetailsRow>
        </>
    );
};

export default SalesRow;