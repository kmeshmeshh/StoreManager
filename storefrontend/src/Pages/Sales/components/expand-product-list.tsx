import { useState } from "react";
import {
    AccordionWrapper,
    AccordionHeader,
    HeaderTitle,
    ChevronIcon,
    AccordionContent,
    ProductItemRow,
    ProductName,
    ProductMeta
} from "./styled";

// بنستقبل الـ items كـ props
const ProductExpandableList = ({ items }: { items: any[] }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!items || items.length === 0) {
        return <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>لا يوجد منتجات</span>;
    }

    return (
        <AccordionWrapper>
            <AccordionHeader $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
                <HeaderTitle>
                    {/* أيقونة شنطة صغيرة */}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                    {items.length} منتجات
                </HeaderTitle>

                {/* سهم الفتح والقفل */}
                <ChevronIcon $isOpen={isOpen} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </ChevronIcon>
            </AccordionHeader>

            <AccordionContent $isOpen={isOpen}>
                {items.map((item) => (
                    <ProductItemRow key={item.id}>
                        <ProductName>
                            <span className="name">{item.product?.name}</span>
                            {item.product?.category && <span className="cat">{item.product.category}</span>}
                        </ProductName>
                        <ProductMeta>
                            <span className="price">{item.unitPrice} ج.م</span>
                            <span className="qty">x{item.quantity}</span>
                        </ProductMeta>
                    </ProductItemRow>
                ))}
            </AccordionContent>
        </AccordionWrapper>
    );
};
export default ProductExpandableList;