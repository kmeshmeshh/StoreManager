import styled, { keyframes } from 'styled-components';
import {
    Colors,
    Spacing,
    FontSize,
    BorderRadius,
    FontWeight
} from '../../../constants/theme.constants';
// لو ضفت ZIndex استخدمه، لو لأ استخدم رقم عادي
// import { ZIndex } from '../../../constants/theme.constants';

const slideIn = keyframes`
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
`;

export const SnackbarContainer = styled.div`
    position: fixed;
    top: ${Spacing.lg};
    right: ${Spacing.lg};
    z-index: 9999; /* أو ZIndex.snackbar */
    display: flex;
    flex-direction: column;
    gap: ${Spacing.sm};
    pointer-events: none; /* عشان ميمنعش الضغط على اللي تحته لو فاضي */
`;

interface ToastProps {
    $type: 'success' | 'error' | 'warning' | 'info';
}

export const Toast = styled.div<ToastProps>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 300px;
    max-width: 400px;
    padding: ${Spacing.md} ${Spacing.lg};
    background-color: ${Colors.white};
    border-radius: ${BorderRadius.md};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    pointer-events: auto;
    animation: ${slideIn} 0.3s ease-in-out;
    overflow: hidden;
    position: relative;

    /* Border ملون على الشمال يوضح النوع */
    border-left: 6px solid ${({ $type }) => {
        switch ($type) {
            case 'success': return Colors.success;
            case 'error': return Colors.error;
            case 'warning': return Colors.warning;
            case 'info': return Colors.info;
            default: return Colors.primary;
        }
    }};
`;

export const ToastContent = styled.div`
    display: flex;
    align-items: center;
    gap: ${Spacing.md};
    color: ${Colors.dark};
    font-size: ${FontSize.lg};
    font-weight: ${FontWeight.medium};
`;

export const CloseButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    color: ${Colors.gray};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${Spacing.xs};
    margin-left: ${Spacing.md};
    border-radius: ${BorderRadius.full};
    transition: all 0.2s;

    &:hover {
        background-color: ${Colors.lightGray};
        color: ${Colors.dark};
    }
`;