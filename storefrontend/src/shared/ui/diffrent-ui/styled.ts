import styled from "styled-components";
import { BorderRadius, Colors, FontSize, FontWeight, Spacing } from "../../../constants/theme.constants";

export const PageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${Spacing.lg};
    padding-bottom: ${Spacing.lg};
    border-bottom: 2px solid ${Colors.border};
`;

export const Title = styled.h2`
    font-size = ${FontSize.xl};
    font-weight= ${FontWeight.bold};
`

export const PageContainer = styled.div`
    padding: ${Spacing.lg};
`;

export const Badge = styled.span`
    padding:${Spacing.xs} ${Spacing.md};
    color: ${Colors.dark};
    background-color:${Colors.border};
    border-radius:${BorderRadius.xl};
`

