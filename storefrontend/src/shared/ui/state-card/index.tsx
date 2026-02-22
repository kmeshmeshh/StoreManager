export const StatCard = ({ title, value }: { title: string; value: any }) => (
    <div style={{
        padding: "16px",
        borderRadius: "12px",
        background: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
    }}>
        <div style={{ fontSize: "14px", color: "#6b7280" }}>{title}</div>
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>{value}</div>
    </div>
);
