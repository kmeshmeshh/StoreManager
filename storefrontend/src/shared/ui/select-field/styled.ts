import styled from "styled-components";
import { Colors, FontSize, FontWeight, BorderRadius, Spacing } from "../../../constants/theme.constants";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${Spacing.xs};
    margin-bottom: ${Spacing.md};
    width: 100%;
`;

export const Label = styled.label<{ hasError?: boolean }>`
    font-size: ${FontSize.lg};
    font-weight: ${FontWeight.semibold};
    color: ${({ hasError }) => (hasError ? Colors.error : Colors.dark)};
    display: flex;
    align-items: center;
    gap: ${Spacing.xs};

    .required {
        color: ${Colors.error};
    }
`;

export const SelectWrapper = styled.div`
    position: relative;
`;

export const StyledSelect = styled.select<{ hasError?: boolean }>`
    width: 100%;
    padding: ${Spacing.sm} ${Spacing.xl} ${Spacing.sm} ${Spacing.md};
    border-radius: ${BorderRadius.lg};
    font-size: ${FontSize.lg};
    font-weight: ${FontWeight.medium};
    appearance: none;
    cursor: pointer;
    transition: all 0.2s ease;
    
    border: 2px solid ${({ hasError }) => (hasError ? Colors.error : Colors.border)};
    background-color: ${Colors.white};
    color: ${Colors.dark};
    box-shadow: ${({ hasError }) =>
        hasError
            ? `0 0 0 3px ${Colors.error}20`
            : "0 1px 2px rgba(0, 0, 0, 0.05)"};

    &:hover:not(:disabled) {
        border-color: ${({ hasError }) => (hasError ? Colors.error : Colors.primary)};
        background-color: ${Colors.hover};
    }

    &:focus {
        outline: none;
        border-color: ${({ hasError }) => (hasError ? Colors.error : Colors.primary)};
        box-shadow: ${({ hasError }) =>
        hasError
            ? `0 0 0 3px ${Colors.error}20`
            : `0 0 0 3px ${Colors.primary}25`};
    }

    &:disabled {
        background-color: ${Colors.lightGray};
        color: ${Colors.gray};
        cursor: not-allowed;
        border-color: ${Colors.border};
    }

    option {
        padding: ${Spacing.sm};
        font-weight: ${FontWeight.medium};
        background-color: ${Colors.white};
        color: ${Colors.dark};
    }

    option[disabled] {
        color: ${Colors.gray};
    }
`;

export const IconWrapper = styled.div<{ disabled?: boolean }>`
    position: absolute;
    left: ${Spacing.sm};
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: ${({ disabled }) => (disabled ? Colors.border : Colors.gray)};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    ${StyledSelect}:focus + & {
        color: ${Colors.primary};
    }

    ${StyledSelect}:hover:not(:disabled) + & {
        color: ${Colors.primary};
    }
`;

export const Hint = styled.span`
    font-size: ${FontSize.sm};
    color: ${Colors.gray};
    display: flex;
    align-items: center;
    gap: ${Spacing.xs};
`;

export const ErrorMessage = styled.span`
    font-size: ${FontSize.sm};
    color: ${Colors.error};
    font-weight: ${FontWeight.medium};
    display: flex;
    align-items: center;
    gap: ${Spacing.xs};
    background-color: ${Colors.error}10;
    padding: ${Spacing.sm} ${Spacing.md};
    border-radius: ${BorderRadius.md};
    
    svg {
        flex-shrink: 0;
    }
`;
