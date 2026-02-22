import { useState, useMemo } from "react";
import { useGetProductsOptions } from "../api/queries";
import AddProductModal from "./add-product-modal";
import ConfirmationModal from "./confirmation-modal"; 

import { Trash, Edit, PlusCircle, AlertCircle } from 'lucide-react'

import Table, { type Column } from "../../../shared/ui/table";
import Button from "../../../shared/ui/button";
import ErrorCard from "../../../shared/ui/error-card";
import type { Product } from "../../../shared/types/products";
import { Badge, PageContainer, PageHeader } from "../../../shared/ui/diffrent-ui/styled";
import UpdateProdactModal from "./update-product-modal";
import { ButtonVariant } from "../../../constants/theme.constants";
import { StatCard } from "../../../shared/ui/state-card";
import { PageTitle } from "../../../shared/ui/page-header";
import ShortagesModal from "./shortages-modal";

const ProductList = () => {
    const { data, isLoading, isError, refetch } = useGetProductsOptions();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isShortageModalOpen, setIsShortageModalOpen] = useState(false);

    const [productToDelete, setProductToDelete] = useState<number | null>(null);
    const [productIdToEdit, setProductIdToEdit] = useState<number | null>(null);

    const stats = useMemo(() => {
        const products = (data ?? []) as Product[];

        const totalCount = products.length;

        const totalQuantity = products.reduce(
            (sum, p) => sum + p.amount,
            0
        );

        const totalSell = products.reduce(
            (sum, p) => sum + (p.sellPrice * p.amount),
            0
        );
        const totalBuy = products.reduce(
            (sum, p) => sum + (p.actualPrice * p.amount),
            0
        );
        const totalProfit = totalSell - totalBuy;

        return {
            totalCount,
            totalQuantity,
            totalSell,
            totalBuy,
            totalProfit,
        };
    }, [data]);


    const columns: Column<Product>[] = useMemo(() => [
        {
            header: "الكود",
            accessor: "code",
            align: "right",
        },
        {
            header: "اسم المنتج",
            accessor: "name",
            align: "right",
        },
        {
            header: "القسم",
            align: "right",
            accessor: "category",
            render: (item) => <Badge>{item.category}</Badge>
        },
        {
            header: "سعر الجملة",
            align: "right",
            render: (item) => <span style={{ fontWeight: 'bold' }}>{item.actualPrice.toFixed(2)} ج.م</span>
        },
        {
            header: "سعر البيع",
            align: "right",
            render: (item) => <span style={{ fontWeight: 'bold' }}>{item.sellPrice.toFixed(2)} ج.م</span>
        },
        { header: "الكمية", accessor: "amount", align: "center" },
        {
            header: "",
            align: "center",
            render: (item) => (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <Button
                        size="sm"
                        variant={ButtonVariant.Outline}
                        onClick={() => setProductIdToEdit(item.id)}
                        icon={<Edit width={16} height={16} />}
>
                        تعديل
                    </Button>
                    <Button
                        size="sm"
                        variant={ButtonVariant.Danger}
                        onClick={() => setProductToDelete(item.id)}
                        icon={<Trash width={16} height={16} />}
                    >
                        حذف
                    </Button>
                </div>
            )
        }
    ], []);

    return (
        <PageContainer>
            <PageHeader>
                <PageTitle
                    title="قائمة المنتجات"
                    subtitle="إدارة كل منتجاتك ومتابعة الكميات والأسعار"
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button
                        onClick={() => setIsShortageModalOpen(true)}
                        icon={<AlertCircle width={16} height={16} />}
                        variant={ButtonVariant.Outline}
                    >
                        النواقص
                    </Button>
                    <Button
                        onClick={() => setIsAddModalOpen(true)}
                        icon={<PlusCircle width={16} height={16} />}
                    >
                        إضافة منتج جديد
                    </Button>
                </div>
            </PageHeader>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "16px",
                marginBottom: "24px"
            }}>
                <StatCard title="عدد المنتجات" value={stats.totalCount} />
                <StatCard title="إجمالي الكمية" value={stats.totalQuantity} />
                <StatCard title="إجمالي قيمة البيع" value={`${stats.totalSell.toFixed(2)} ج.م`} />
                <StatCard title="إجمالي قيمة المنتجات" value={`${stats.totalBuy.toFixed(2)} ج.م`} />
                <StatCard title="صافي الربح" value={`${stats.totalProfit.toFixed(2)} ج.م`} />
            </div>

            {isError ? (
                <ErrorCard
                    title="خطأ في تحميل البيانات"
                    onRetry={() => refetch && refetch()}
                />
            ) : (
                <Table<Product>
                    data={data || []}
                    columns={columns}
                    isLoading={isLoading}
                    keyExtractor={(item) => item.id}
                />
            )}

            {isAddModalOpen && (
                <AddProductModal onClose={() => setIsAddModalOpen(false)} />
            )}

            {productToDelete !== null && (
                <ConfirmationModal
                    productId={productToDelete}
                    onClose={() => setProductToDelete(null)}
                />
            )}
            {productIdToEdit !== null && (
                <UpdateProdactModal
                    productId={productIdToEdit}
                    onClose={() => setProductIdToEdit(null)}
                />
            )}
            {isShortageModalOpen &&
                <ShortagesModal onClose={() => setIsShortageModalOpen(false)} productsData={data} isLoading={isLoading} isError={isError} />
            }
        </PageContainer>
    );
};

export default ProductList;
