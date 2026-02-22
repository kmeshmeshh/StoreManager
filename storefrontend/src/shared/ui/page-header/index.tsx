import { Colors } from "../../../constants/theme.constants";
import { Title } from "../diffrent-ui/styled";

export const PageTitle = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
    }}>
        <Title>{title}</Title>
        <div style={{ fontSize: "14px", color: Colors.gray }}>{subtitle}</div>
    </div>
);
