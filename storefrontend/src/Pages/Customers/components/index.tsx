import { useMemo, useState } from "react";
import { useGetCustomersOptions } from "../api/queries";
import Table, { type Column } from "../../../shared/ui/table";
import ErrorCard from "../../../shared/ui/error-card";
import type { Customers } from "../../../shared/types/products";
import { PageContainer, PageHeader } from "../../../shared/ui/diffrent-ui/styled";
import { PageTitle } from "../../../shared/ui/page-header";

const CustomersList = () => {
    const { data, isLoading, isError, refetch } = useGetCustomersOptions();

    const columns: Column<Customers>[] = useMemo(() => [
        { header: "اسم العميل", accessor: "name", align: "right" },
        { header: "رقم العميل", accessor: "phoneNumber", align: "right" },
        { header: "عدد الطلبات", accessor: "ordersCount", align: "right" },
        {
            header: "اجمالي الطلبات",
            align: "right",
            render: (item) => <span style={{ fontWeight: 'bold' }}>{item.totalSpent.toFixed(2)} ج.م</span>
        },
    ], []);

    return (
        <PageContainer>
            <PageHeader>
                <PageTitle
                    title="قائمة العملاء"
                    subtitle="إدارة عملائك ومراسلتهم عبر واتساب"
                />
            
            </PageHeader>

       

            {isError ? (
                <ErrorCard title="خطأ في تحميل البيانات" onRetry={() => refetch && refetch()} />
            ) : (
                <Table<Customers>
                    data={data || []}
                    columns={columns}
                    isLoading={isLoading}
                    keyExtractor={(item) => item.id}
                />
            )}
        </PageContainer>
    );
};

export default CustomersList;