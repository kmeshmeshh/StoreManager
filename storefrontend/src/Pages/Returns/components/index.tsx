import { useState, useMemo } from "react";
import { PlusCircle } from "lucide-react";

import {
    PageContainer,
    PageHeader,
} from "../../../shared/ui/diffrent-ui/styled";
import { PageTitle } from "../../../shared/ui/page-header";
import Table, { type Column } from "../../../shared/ui/table";
import Button from "../../../shared/ui/button";
import ErrorCard from "../../../shared/ui/error-card";

import type { ReturnInvoice } from "../../../shared/types/returns";
import { useGetReturns } from "../api/queries";
import CreateReturnModal from "./create-return-modal";

const Returns = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: returns, isLoading, isError, refetch } = useGetReturns();

    const columns: Column<ReturnInvoice>[] = useMemo(
        () => [
            {
                header: "رقم العملية",
                accessor: "id",
                align: "right",
                render: (item) => (
                    <span style={{ fontWeight: "bold" }}>#{item.id}</span>
                ),
            },
            {
                header: "رقم الفاتورة الأصلية",
                accessor: "originalInvoiceId",
                align: "right",
                render: (item) => <span>#{item.originalInvoiceId}</span>,
            },
            {
                header: "تاريخ الإرجاع",
                accessor: "returnDate",
                align: "right",
                render: (item) =>
                    new Date(item.returnDate).toLocaleDateString("ar-EG"),
            },
            {
                header: "إجمالي المسترد",
                accessor: "totalRefundAmount",
                align: "right",
                render: (item) => (
                    <span style={{ fontWeight: "bold", color: "#16a34a" }}>
                        {item.totalRefundAmount.toLocaleString()} ج.م
                    </span>
                ),
            },
            {
                header: "ملاحظات",
                accessor: "note",
                align: "right",
                render: (item) => item.note || "-",
            },
            {
                header: "عدد الأصناف",
                align: "center",
                render: (item) => (
                    <span
                        style={{
                            background: "#f3f4f6",
                            padding: "4px 12px",
                            borderRadius: "8px",
                            fontSize: "0.875rem",
                            fontWeight: "bold",
                        }}
                    >
                        {item.returnItems?.length || 0} صنف
                    </span>
                ),
            },
        ],
        []
    );

    return (
        <PageContainer>
            <PageHeader>
                <PageTitle
                    title="المرتجعات"
                    subtitle="سجل عمليات الإرجاع وتأثيرها المالي"
                />
                <Button
                    onClick={() => setIsModalOpen(true)}
                    icon={<PlusCircle width={16} height={16} />}
                >
                    مرتجع جديد
                </Button>
            </PageHeader>

            {isError ? (
                <ErrorCard
                    title="خطأ في تحميل المرتجعات"
                    onRetry={() => refetch && refetch()}
                />
            ) : (
                <Table<ReturnInvoice>
                    data={returns || []}
                    columns={columns}
                    isLoading={isLoading}
                    keyExtractor={(item) => item.id}
                />
            )}

            {isModalOpen && (
                <CreateReturnModal
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </PageContainer>
    );
};

export default Returns;