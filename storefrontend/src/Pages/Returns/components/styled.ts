import styled from "styled-components";
import {
    Colors,
    Spacing,
    BorderRadius,
    FontSize,
    FontWeight,
} from "../../../constants/theme.constants";

export const SearchContainer = styled.div`
    display: flex;
    gap: ${Spacing.sm};
    align-items: flex-end;
    margin-bottom: ${Spacing.lg};

    button {
        height: 42px;
        margin-bottom: 2px;
    }
`;

export const SearchInputWrapper = styled.div`
    flex: 1;
`;

export const ErrorBox = styled.div`
    color: ${Colors.error};
    background: #fef2f2;
    padding: ${Spacing.sm};
    border-radius: ${BorderRadius.md};
    display: flex;
    align-items: center;
    gap: ${Spacing.lg};
    margin-bottom: ${Spacing.md};
`;

export const OrderInfoBox = styled.div`
    background: ${Colors.hover};
    padding: ${Spacing.sm};
    border-radius: ${BorderRadius.md};
    margin-bottom: ${Spacing.md};
    border: 1px solid ${Colors.border};
`;

export const OrderDateLabel = styled.span`
    font-weight: ${FontWeight.bold};
    color: ${Colors.gray};
`;

export const ItemsListContainer = styled.div`
    border: 1px solid ${Colors.border};
    border-radius: ${BorderRadius.lg};
    margin-bottom: ${Spacing.lg};
`;

export const ItemRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${Spacing.md};
    border-bottom: 1px solid ${Colors.lightGray};

    &:last-child {
        border-bottom: none;
    }
`;

export const ItemInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const ItemName = styled.strong`
    font-size: ${FontSize.xl};
    color: ${Colors.dark};
`;

export const ItemDetails = styled.div`
    font-size: ${FontSize.sm};
    color: ${Colors.gray};

    span {
        font-weight: ${FontWeight.bold};
        color: ${Colors.dark};
    }
`;

export const RemainingBadge = styled.span<{ $hasRemaining: boolean }>`
    font-size: ${FontSize.lg};
    padding: 2px 8px;
    border-radius: ${BorderRadius.md};
    font-weight: ${FontWeight.bold};
    background: ${({ $hasRemaining }) =>
        $hasRemaining ? "#ecfdf5" : "#fef2f2"};
    color: ${({ $hasRemaining }) =>
        $hasRemaining ? "#16a34a" : Colors.error};
`;

export const FullyReturnedOverlay = styled.div`
    opacity: 0.5;
    pointer-events: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${Spacing.md};
    border-bottom: 1px solid ${Colors.lightGray};
    background: #f9fafb;

    &:last-child {
        border-bottom: none;
    }
`;

export const ControlsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: ${Spacing.md};
`;

export const QtyInputWrapper = styled.div`
    width: 80px;

    input {
        text-align: center;
    }
`;

export const DiscountInfoBox = styled.div`
    background: #fffbeb;
    border: 1px solid #fbbf24;
    border-radius: ${BorderRadius.md};
    padding: ${Spacing.md};
    margin-bottom: ${Spacing.md};
    color: #92400e;

    strong {
        color: #78350f;
    }
`;

export const PriceInputWrapper = styled.div`
    width: 120px;

    input {
        text-align: center;
    }
`;

export const OriginalPriceHint = styled.div`
    font-size: ${FontSize.lg};
    color: ${Colors.gray};
    text-align: center;
    margin-top: 2px;

    span {
        text-decoration: line-through;
        color: ${Colors.error};
    }
`;

export const ItemControlsRow = styled.div`
    display: flex;
    align-items: center;
    gap: ${Spacing.md};
`;