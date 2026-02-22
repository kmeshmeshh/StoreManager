import { useMemo, useState } from "react";
import { useGetAllSales } from "../api/queris";
import SalesRow from "./sales-row";
import ErrorCard from "../../../shared/ui/error-card";
import { PageContainer, PageHeader } from "../../../shared/ui/diffrent-ui/styled";
import { PageTitle } from "../../../shared/ui/page-header";
import Table, { type Column } from "../../../shared/ui/table";
import { StatCard } from "../../../shared/ui/state-card";

const Sales = () => {
    const { data, isLoading, isError, refetch } = useGetAllSales();
    const [openRowId, setOpenRowId] = useState<number | null>(null);

    const stats = useMemo(() => {
        const orders = (data ?? []) as any[];

        const totalOrders = orders.length;
        const totalItemsSold = orders.reduce(
            (sum, order) => sum + (order.orderItems?.reduce(
                (itemSum: number, item: any) => itemSum + item.quantity, 0
            ) || 0), 0
        );

        const totalRevenue = orders.reduce(
            (sum, order) => sum + order.totalPrice, 0
        );

        const totalDiscounts = orders.reduce(
            (sum, order) => sum + (order.discount || 0), 0
        );

        const totalProfit = orders.reduce((sum, order) => {
            const orderItemsProfit = order.orderItems?.reduce((itemSum: number, item: any) => {
                const sellTotal = item.unitPrice * item.quantity;
                const costTotal = (item.product?.actualPrice || 0) * item.quantity;
                return itemSum + (sellTotal - costTotal);
            }, 0) || 0;

            const orderDiscount = order.discount || 0;

            return sum + (orderItemsProfit - orderDiscount);
        }, 0);

        return {
            totalOrders,
            totalItemsSold,
            totalRevenue,
            totalDiscounts,
            totalProfit,
        };
    }, [data]);
    const columns: Column<any>[] = useMemo(() => [
        { header: "رقم الطلب", align: 'right' },
        { header: "اسم العميل", align: "right" },
        { header: "رقم الهاتف", align: "right" },
        { header: "تاريخ الطلب", align: 'right' },
        { header: "عدد العناصر", align: 'right' },
        { header: "القيمة الإجمالية", align: 'right' },
        { header: "" }
    ], []);

    return (
        <PageContainer>
            <PageHeader>
                <PageTitle
                    title="سجل المبيعات"
                    subtitle="متابعة جميع الطلبات والفواتير وتفاصيل المنتجات"
                />
            </PageHeader>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "16px",
                marginBottom: "24px"
            }}>
                <StatCard
                    title="عدد الطلبات"
                    value={stats.totalOrders}
                />
                <StatCard
                    title="المنتجات المباعة"
                    value={stats.totalItemsSold}
                />
                <StatCard
                    title="إجمالي المبيعات"
                    value={`${stats.totalRevenue.toLocaleString()} ج.م`}
                />
                <StatCard
                    title="إجمالي الخصومات"
                    value={`${stats.totalDiscounts.toLocaleString()} ج.م`}
                />
                <StatCard
                    title="صافي الربح"
                    value={`${stats.totalProfit.toLocaleString()} ج.م`}
                />
            </div>

            {isError ? (
                <ErrorCard
                    title="حدث خطأ في جلب البيانات"
                    onRetry={() => refetch && refetch()}
                />
            ) : (
                <Table
                    data={data || []}
                    columns={columns}
                    isLoading={isLoading}
                    keyExtractor={(order) => order.id}
                    renderRow={(order) => (
                        <SalesRow
                            key={order.id}
                            order={order}
                            isOpen={openRowId === order.id}
                            onToggle={() =>
                                setOpenRowId(openRowId === order.id ? null : order.id)
                            }
                        />
                    )}
                />
            )}
        </PageContainer>
    );
};

export default Sales;