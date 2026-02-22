import styled, { css } from 'styled-components';
import {
    FontSize,
    FontWeight,
    BorderRadius,
    Spacing,
    Colors,
    type ButtonVariantType,
    type ButtonSizeType
} from '../../../constants/theme.constants';

interface StyledButtonProps {
    $variant: ButtonVariantType;
    $size: ButtonSizeType;
    $fullWidth: boolean;
    disabled?: boolean;
}

const getVariantStyles = (variant: ButtonVariantType) => {
    switch (variant) {
        case 'secondary':
            return css`
                background-color: ${Colors.secondary};
                color: white;
                border: 1px solid transparent;
                &:hover:not(:disabled) { filter: brightness(0.9); }
            `;
        case 'danger':
            return css`
                background-color: ${Colors.error};
                color: white;
                border: 1px solid transparent;
                &:hover:not(:disabled) { filter: brightness(0.9); }
            `;
        case 'outline':
            return css`
                background-color: transparent;
                color: ${Colors.primary};
                border: 1px solid ${Colors.primary};
                &:hover:not(:disabled) { background-color: ${Colors.lightGray}; }
            `;
        case 'ghost':
            return css`
                background-color: transparent;
                color: ${Colors.dark};
                border: 1px solid transparent;
                &:hover:not(:disabled) { background-color: ${Colors.lightGray}; }
            `;
        case 'primary':
        default:
            return css`
                background-color: ${Colors.primary};
                color: white;
                border: 1px solid transparent;
                &:hover:not(:disabled) { filter: brightness(0.9); }
            `;
    }
};

const getSizeStyles = (size: ButtonSizeType) => {
    switch (size) {
        case 'sm':
            return css`
                padding: ${Spacing.xs} ${Spacing.sm};
                font-size: ${FontSize.sm};
            `;
        case 'lg':
            return css`
                padding: ${Spacing.md} ${Spacing.xl};
                font-size: ${FontSize.xl};
            `;
        case 'md':
        default:
            return css`
                padding: ${Spacing.sm} ${Spacing.md};
                font-size: ${FontSize.lg}; 
            `;
    }
};

export const StyledButton = styled.button<StyledButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${Spacing.sm};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
    
    font-weight: ${FontWeight.medium};
    border-radius: ${BorderRadius.md};

    ${({ $variant }) => getVariantStyles($variant)}
    ${({ $size }) => getSizeStyles($size)}

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        background-color: ${Colors.lightGray};
        color: ${Colors.gray};
        border-color: transparent;
    }
`;

export const Spinner = styled.div`
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;

    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;

export const IconWrapper = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
`;