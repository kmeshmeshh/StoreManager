import styled, { keyframes } from 'styled-components';
import {  FontSize, FontWeight, Colors, Spacing, BorderRadius } from '../../../constants/theme.constants';

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

const slideUp = keyframes`
    from {
        transform: translateY(20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: ${fadeIn} 0.2s ease-out;
    padding: ${Spacing.md};
`;

export const ModalContainer = styled.div<{ $size?: 'sm' | 'md' | 'lg' | 'xl' }>`
    background-color: white;
    border-radius: ${BorderRadius.lg};
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    width: 100%;
    max-width: ${({ $size = 'md' }) => {
        switch ($size) {
            case 'sm': return '400px';
            case 'md': return '600px';
            case 'lg': return '800px';
            case 'xl': return '1000px';
            default: return '600px';
        }
    }};
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    animation: ${slideUp} 0.3s ease-out;
`;

export const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${Spacing.lg};
    border-bottom: 1px solid ${Colors.border};
`;

export const ModalTitle = styled.h2`
    font-size: ${FontSize.xl};
    font-weight: ${FontWeight.bold};
    color: ${Colors.dark};
    margin: 0;
`;

export const CloseButton = styled.button`
    width: 32px;
    height: 32px;
    border-radius: ${BorderRadius.md};
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: ${Colors.gray};
    transition: all 0.2s;

    &:hover {
        background-color: ${Colors.lightGray};
        color: ${Colors.dark};
    }
`;

export const ModalBody = styled.div`
    padding: ${Spacing.lg};
    overflow-y: auto;
    flex: 1;
`;

export const ModalFooter = styled.div`
    display: flex;
    gap: ${Spacing.md};
    margin-top: ${Spacing.md};
    padding-top: ${Spacing.md};
    border-top: 1px solid ${Colors.border};
    justify-content: flex-end;
`;
