import styled from 'styled-components';
import {
    FontSize,
    FontWeight,
    BorderRadius,
    Spacing,
    Colors
} from '../../../constants/theme.constants';

export const InputContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: ${Spacing.xs}; 
    align-items: flex-start;
    margin-bottom: ${Spacing.md};
`;

export const Label = styled.label`
    font-size: ${FontSize.lg}; 
    font-weight: ${FontWeight.medium};
    color: ${Colors.dark};
`;

export const StyledInput = styled.input<{ $hasError?: boolean }>`
    width: 100%;
    padding: ${Spacing.sm} ${Spacing.md}; 
    
    font-size: ${FontSize.lg};
    border-radius: ${BorderRadius.md}; 
    
    border: 1px solid ${props => props.$hasError ? Colors.error : '#e2e8f0'}; 

    background-color: white;
    color: ${Colors.dark};
    transition: all 0.2s ease-in-out;
    outline: none;

    &::placeholder {
        color: ${Colors.gray};
        font-weight: ${FontWeight.normal};
    }

    &:focus {
        border-color: ${props => props.$hasError ? Colors.error : Colors.primary};
        box-shadow: 0 0 0 3px ${props => props.$hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)'};
    }

    &:disabled {
        background-color: ${Colors.lightGray};
        cursor: not-allowed;
        color: ${Colors.gray};
    }
`;

export const ErrorMessage = styled.span`
    font-size: ${FontSize.sm}; 
    color: ${Colors.error};
    min-height: ${FontSize.xl}; 
    animation: fadeIn 0.3s ease-in-out;

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-${Spacing.xs}); }
        to { opacity: 1; transform: translateY(0); }
    }
`;