import { useState, useMemo, useCallback } from "react";
import {
    Search, ShoppingCart, Plus, Trash2, PackageOpen,
    AlertCircle, CheckCircle2, User, Phone, FileText, Minus, Camera
} from 'lucide-react';
import { useGetProductByCodeOptions } from "../api/queries";
import { useCreateOrder } from "../api/mutation";
import type { CartItem } from "../../../shared/types/products";
import Table, { type Column } from "../../../shared/ui/table";
import { Badge, PageContainer, PageHeader } from "../../../shared/ui/diffrent-ui/styled";
import { ButtonVariant as ThemeButtonVariant } from "../../../constants/theme.constants";
import Button from "../../../shared/ui/button";
import { useSnackbar } from "../../../shared/ui/snack-bar";
import { PageTitle } from "../../../shared/ui/page-header";

import {
    GridLayout, CColumn, Card, ScanHeader, Label,
    SearchWrapper, SearchInput, LoadingState, Spinner,
    ErrorState, ProductCard, ProductHeader, ProductContent,
    InfoGrid, InfoBox, InfoLabel, InfoValue, ActionRow,
    QuantityWrapper, QuantityInput, QuantityLabel,
    FlexButtonWrapper, AlertBanner, AlertBannerText,
    ExtraInfoCard, ExtraInfoHeader, ExtraInfoTitle,
    InputGrid, SmallLabel, RelativeInputWrapper,
    StyledInputField, InputIconPosition, InputRow,
    CartContainer, CartHeader, CartHeaderTitle,
    CartIconBox, CartBody, EmptyCartState, EmptyCartTitle,
    TablePriceText, TableTotalText, CartFooter, TotalRow,
    TotalLabel, TotalValue, TotalCurrency, FullWidthButtonWrapper,
    SummaryRow, SummaryLabel, SummaryValue, InputErrorText,
    QuantityControl, CompactButton, QuantityValue
} from "./styled";

const NewOrderPage = () => {
    const { showSnackbar } = useSnackbar();

    const [inputCode, setInputCode] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [searchCode, setSearchCode] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [quantityError, setQuantityError] = useState('');
    const [discount, setDiscount] = useState<string>("");
    const [cart, setCart] = useState<CartItem[]>([]);


    const { data: product, isLoading, isError } = useGetProductByCodeOptions(searchCode);
    const { mutate: createOrder, isPending: isSaving } = useCreateOrder();

    const subTotal = cart.reduce((sum, item) => sum + item.lineTotal, 0);
    const numericDiscount = parseFloat(discount) || 0;
    const isDiscountInvalid = numericDiscount > subTotal + 0.01;
    const finalTotal = Math.max(0, subTotal - numericDiscount);

    const handleSearch = () => {
        if (inputCode.trim()) {
            setSearchCode(inputCode);
            setQuantity(1);
            setQuantityError('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearch();
    };

    const handleBarcodeScan = useCallback((scannedCode: string) => {
        setInputCode(scannedCode);
        setSearchCode(scannedCode);
        setQuantity(1);
        setQuantityError('');
        showSnackbar(`تم مسح الباركود: ${scannedCode}`);
    }, [showSnackbar]);

    const handleAddToCart = () => {
        if (!product) return;
        if (quantity <= 0) return setQuantityError('رجاء ادخال العدد صحيح');
        if (quantity > product.amount)
            return setQuantityError('العدد اكبر من الكمية المتاحة');

        const existingItemIndex = cart.findIndex(item => item.id === product.id);
        if (existingItemIndex >= 0) {
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].orderQuantity += quantity;
            updatedCart[existingItemIndex].lineTotal =
                updatedCart[existingItemIndex].orderQuantity * product.sellPrice;
            setCart(updatedCart);
        } else {
            const newItem: CartItem = {
                ...product,
                orderQuantity: quantity,
                lineTotal: product.sellPrice * quantity
            };
            setCart([...cart, newItem]);
        }
        setInputCode("");
        setSearchCode("");
        setQuantity(1);
    };

    const removeFromCart = (productId: number) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const handleCompleteOrder = () => {
        if (cart.length === 0) return;
        if (isDiscountInvalid) {
            showSnackbar("قيمة الخصم غير صحيحة", "error");
            return;
        }

        const payload = {
            items: cart.map(item => ({
                productId: item.id,
                quantity: item.orderQuantity
            })),
            discount: numericDiscount,
            customerName,
            customerPhone
        };

        createOrder(payload, {
            onSuccess: () => {
                showSnackbar("تم حفظ الفاتورة بنجاح");
                setCart([]);
                setDiscount("");
                setCustomerName("");
                setCustomerPhone("");
            },
            onError: (err: any) =>
                showSnackbar(
                    err.response?.data?.message || "تعذر تنفيذ العملية، حاول مرة أخرى",
                    "error"
                )
        });
    };

    const updateCartQuantity = (productId: number, delta: number) => {
        setCart(prevCart =>
            prevCart.map(item => {
                if (item.id === productId) {
                    const newQuantity = item.orderQuantity + delta;
                    if (newQuantity > item.amount) {
                        showSnackbar("الكمية المطلوبة غير متاحة في المخزون", "error");
                        return item;
                    }
                    if (newQuantity < 1) return item;
                    return {
                        ...item,
                        orderQuantity: newQuantity,
                        lineTotal: newQuantity * item.sellPrice
                    };
                }
                return item;
            })
        );
    };

    const cartColumns: Column<CartItem>[] = useMemo(() => [
        { header: "المنتج", accessor: "name", align: "right" },
        {
            header: "الكمية", accessor: "orderQuantity", align: "center",
            render: (item) => (
                <QuantityControl>
                    <CompactButton size="sm" variant={ThemeButtonVariant.Ghost}
                        onClick={() => updateCartQuantity(item.id, 1)}
                        disabled={item.orderQuantity >= item.amount}>
                        <Plus size={14} />
                    </CompactButton>
                    <QuantityValue>{item.orderQuantity}</QuantityValue>
                    <CompactButton size="sm" variant={ThemeButtonVariant.Ghost}
                        onClick={() => updateCartQuantity(item.id, -1)}
                        disabled={item.orderQuantity <= 1}>
                        <Minus size={14} />
                    </CompactButton>
                </QuantityControl>
            )
        },
        {
            header: "السعر", accessor: "sellPrice", align: "right",
            render: (item) => <TablePriceText>{item.sellPrice.toFixed(2)}</TablePriceText>
        },
        {
            header: "الإجمالي", accessor: "lineTotal", align: "right",
            render: (item) => <TableTotalText>{item.lineTotal.toFixed(2)}</TableTotalText>
        },
        {
            header: "", id: "actions", align: "left",
            render: (item) => (
                <Button variant={ThemeButtonVariant.Danger} size="sm"
                    onClick={() => removeFromCart(item.id)}>
                    <Trash2 size={16} />
                </Button>
            )
        }
    ], [cart]);

    return (
        <PageContainer>
            <PageHeader>
                <PageTitle
                    title="طلب جديد"
                    subtitle="قم بإنشاء إيصال جديد وتتبع حالة الطلب"
                />
            </PageHeader>
            <GridLayout>
                <CColumn>
                    <Card>
                        <ScanHeader>
                            <Search size={18} />
                            <Label>بحث عن منتج (Scan)</Label>
                        </ScanHeader>
                        <SearchWrapper>
                            <SearchInput
                                type="text"
                                placeholder="أدخل كود المنتج أو اعمل Scan..."
                                value={inputCode}
                                onChange={(e) => setInputCode(e.target.value)}
                                onKeyDown={handleKeyDown}
                                label={""}
                                autoFocus
                            />
                            <Button onClick={handleSearch}>
                                <Search />
                            </Button>
                        </SearchWrapper>
                    </Card>

                    

                    {isLoading && (
                        <LoadingState><Spinner /><p>جاري البحث...</p></LoadingState>
                    )}
                    {isError && (
                        <ErrorState>
                            <AlertCircle size={20} />
                            <b>خطأ:</b> المنتج غير موجود أو الكود خاطئ
                        </ErrorState>
                    )}

                    {product && !isLoading && !isError && (
                        <ProductCard>
                            <ProductHeader>
                                <span>نتيجة البحث</span>
                                <Badge>{product.code}</Badge>
                            </ProductHeader>
                            <ProductContent>
                                <h3>{product.name}</h3>
                                <InfoGrid>
                                    <InfoBox>
                                        <InfoLabel>سعر المنتج</InfoLabel>
                                        <InfoValue>{product.sellPrice.toFixed(2)}</InfoValue>
                                    </InfoBox>
                                    <InfoBox>
                                        <InfoLabel>المتاح</InfoLabel>
                                        <InfoValue $isDanger={product.amount <= 0}>
                                            {product.amount}
                                        </InfoValue>
                                    </InfoBox>
                                </InfoGrid>
                                <ActionRow>
                                    <QuantityWrapper>
                                        <QuantityInput
                                            type="number" min="1" max={product.amount}
                                            value={quantity}
                                            onChange={(e) => setQuantity(Number(e.target.value))}
                                            label={""}
                                        />
                                        <QuantityLabel>العدد</QuantityLabel>
                                    </QuantityWrapper>
                                    <FlexButtonWrapper>
                                        <Button size="md" onClick={handleAddToCart}
                                            disabled={product.amount === 0}>
                                            <Plus /> إضافة للفاتورة
                                        </Button>
                                    </FlexButtonWrapper>
                                </ActionRow>
                                {quantityError && (
                                    <AlertBanner>
                                        <AlertCircle />
                                        <AlertBannerText>{quantityError}</AlertBannerText>
                                    </AlertBanner>
                                )}
                            </ProductContent>
                        </ProductCard>
                    )}

                    <ExtraInfoCard>
                        <ExtraInfoHeader>
                            <FileText size={18} />
                            <ExtraInfoTitle>بيانات الفاتورة (اختياري)</ExtraInfoTitle>
                        </ExtraInfoHeader>
                        <InputGrid>
                            <div>
                                <SmallLabel>رقم العميل</SmallLabel>
                                <RelativeInputWrapper>
                                    <StyledInputField
                                        type="text" placeholder="01xxxxxxxxx" label={""}
                                        value={customerPhone}
                                        onChange={(e) => setCustomerPhone(e.target.value)}
                                    />
                                    <InputIconPosition><Phone size={14} /></InputIconPosition>
                                </RelativeInputWrapper>
                            </div>
                            <div>
                                <SmallLabel>خصم</SmallLabel>
                                <RelativeInputWrapper>
                                    <StyledInputField
                                        type="number" placeholder="0.00" label={""}
                                        value={discount}
                                        onChange={(e) => setDiscount(e.target.value)}
                                        min={0} $isError={isDiscountInvalid}
                                    />
                                    <InputIconPosition $isError={isDiscountInvalid}>
                                        ج.م
                                    </InputIconPosition>
                                </RelativeInputWrapper>
                                {isDiscountInvalid && (
                                    <InputErrorText>
                                        الخصم لا يمكن أن يتجاوز {subTotal.toFixed(2)}
                                    </InputErrorText>
                                )}
                            </div>
                        </InputGrid>
                        <InputRow>
                            <SmallLabel>اسم العميل</SmallLabel>
                            <RelativeInputWrapper>
                                <StyledInputField
                                    type="text" placeholder="أدخل اسم العميل" label={""}
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                />
                                <InputIconPosition><User size={14} /></InputIconPosition>
                            </RelativeInputWrapper>
                        </InputRow>
                    </ExtraInfoCard>
                </CColumn>

                <CartContainer>
                    <CartHeader>
                        <CartHeaderTitle>
                            <CartIconBox><ShoppingCart size={20} /></CartIconBox>
                            <h2>سلة المشتريات</h2>
                        </CartHeaderTitle>
                        <Badge>{cart.length} منتجات</Badge>
                    </CartHeader>
                    <CartBody>
                        {cart.length === 0 ? (
                            <EmptyCartState>
                                <PackageOpen size={64} strokeWidth={1} />
                                <EmptyCartTitle>الفاتورة فارغة حالياً</EmptyCartTitle>
                                <p>ابدأ بإضافة المنتجات من القائمة الجانبية</p>
                            </EmptyCartState>
                        ) : (
                            <Table<CartItem>
                                data={cart} columns={cartColumns}
                                isLoading={false} keyExtractor={(item) => item.id}
                            />
                        )}
                    </CartBody>
                    <CartFooter>
                        {numericDiscount > 0 && (
                            <>
                                <SummaryRow>
                                    <SummaryLabel>المجموع الفرعي</SummaryLabel>
                                    <SummaryValue>{subTotal.toFixed(2)}</SummaryValue>
                                </SummaryRow>
                                <SummaryRow>
                                    <SummaryLabel>الخصم</SummaryLabel>
                                    <SummaryValue $isDiscount $isError={isDiscountInvalid}>
                                        - {numericDiscount.toFixed(2)}
                                    </SummaryValue>
                                </SummaryRow>
                            </>
                        )}
                        <TotalRow>
                            <TotalLabel>الإجمالي النهائي</TotalLabel>
                            <TotalValue>
                                {isDiscountInvalid
                                    ? subTotal.toFixed(2)
                                    : finalTotal.toFixed(2)}{" "}
                                <TotalCurrency>ج.م</TotalCurrency>
                            </TotalValue>
                        </TotalRow>
                        <FullWidthButtonWrapper>
                            <Button
                                onClick={handleCompleteOrder}
                                disabled={cart.length === 0 || isSaving || isDiscountInvalid}
                                isLoading={isSaving}
                            >
                                {isSaving ? "جاري الحفظ..." : (
                                    <><CheckCircle2 size={24} />تأكيد وطباعة الفاتورة</>
                                )}
                            </Button>
                        </FullWidthButtonWrapper>
                    </CartFooter>
                </CartContainer>
            </GridLayout>
        </PageContainer>
    );
};

export default NewOrderPage;