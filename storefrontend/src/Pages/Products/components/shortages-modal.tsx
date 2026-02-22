import { useMemo, useState } from "react";
import Modal from "../../../shared/ui/modal";
import { ModalBody } from "../../../shared/ui/modal/styled";

import type { Product } from "../../../shared/types/products";
import SelectField from "../../../shared/ui/select-field";
import { CenterText, Details, EmptyIcon, EmptyState, ErrorText, Header, ProductCard, ProductsList, QuantityBadge, Row } from "./styled";


type Props = {
    onClose: () => void;
    productsData: Product[];
    isLoading: boolean;
    isError: boolean;
};

const shortageFilterOptions = [
    { label: "كل النواقص", value: "all" },
    { label: "قربت تخلص", value: "low" },
    { label: "نفذت", value: "out" },
];

const ShortagesModal = ({
    onClose,
    productsData,
    isLoading,
    isError,
}: Props) => {
    const [filter, setFilter] = useState<string>("all");

    const shortageProducts = useMemo(
        () => productsData.filter((p) => p.amount < 3),
        [productsData]
    );

    const filteredProducts = useMemo(() => {
        if (filter === "out") return shortageProducts.filter(p => p.amount === 0);
        if (filter === "low")
            return shortageProducts.filter(p => p.amount > 0 && p.amount < 3);
        return shortageProducts;
    }, [filter, shortageProducts]);

    const getStatusText = (amount: number) => {
        if (amount === 0) return "نفذت الكمية";
        if (amount < 3) return `${amount} متبقي`;
        return "متوفر";
    };

    return (
        <Modal title="النواقص" size="md" onClose={onClose}>
            <ModalBody>
                {isLoading ? (
                    <CenterText>جاري التحميل...</CenterText>
                ) : isError ? (
                    <ErrorText>حدث خطأ أثناء تحميل البيانات</ErrorText>
                ) : shortageProducts.length === 0 ? (
                    <EmptyState>
                        <EmptyIcon>✓</EmptyIcon>
                        <p>لا توجد منتجات ناقصة</p>
                        <span>جميع المنتجات متوفرة بكميات كافية</span>
                    </EmptyState>
                ) : (
                                <>
                                        <SelectField
                                            label=""
                                            value={filter}
                                            options={shortageFilterOptions}
                                            onChange={(e) => setFilter(e.target.value)}
                                        />

                        <ProductsList>
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id}>
                                    <Header>
                                        <h3>{product.name}</h3>
                                        <QuantityBadge critical={product.amount === 0}>
                                            {getStatusText(product.amount)}
                                        </QuantityBadge>
                                    </Header>

                                    <Details>
                                        <Row>
                                            <span>القسم</span>
                                            <b>{product.category}</b>
                                        </Row>
                                    </Details>
                                </ProductCard>
                            ))}
                        </ProductsList>
                    </>
                )}
            </ModalBody>
        </Modal>
    );
};

export default ShortagesModal;
