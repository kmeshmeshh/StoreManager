import styled, { keyframes } from 'styled-components';
import {
    Colors,
    Spacing,
    FontSize,
    BorderRadius,
    FontWeight
} from '../../../constants/theme.constants';

export const TableContainer = styled.div`
    width: 100%;
    overflow-x: auto;
    border: 1px solid ${Colors.border};
    border-radius: ${BorderRadius.lg};
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    background-color: ${Colors.white}; 
`;

export const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;
`;

export const Thead = styled.thead`
    background-color: ${Colors.lightGray};
    border-bottom: 2px solid ${Colors.border};
`;

export const Th = styled.th<{ $align?: string; $width?: string }>`
    padding: ${Spacing.md};
    text-align: ${({ $align }) => $align || 'left'};
    width: ${({ $width }) => $width || 'auto'};
    font-size: ${FontSize.sm};
    font-weight: ${FontWeight.semibold};
    color: ${Colors.gray};
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

export const Tr = styled.tr`
    transition: background-color 0.2s;
    border-bottom: 1px solid ${Colors.border}; 

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: ${Colors.hover};
    }
`;

export const Td = styled.td<{ $align?: string }>`
    padding: ${Spacing.md};
    text-align: ${({ $align }) => $align || 'left'};
    font-size: ${FontSize.lg};
    color: ${Colors.dark};
    vertical-align: middle;
`;

export const StatusContainer = styled.div<{ $type?: 'error' | 'empty' }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${Spacing['2xl']};
    text-align: center;
    color: ${({ $type }) => $type === 'error' ? Colors.error : Colors.gray};
    font-size: ${FontSize.lg};
    gap: ${Spacing.sm};
`;

const shimmer = keyframes`
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
`;

export const SkeletonBox = styled.div`
    height: ${Spacing.lg}; 
    width: 100%;
    background: linear-gradient(
        to right, 
        ${Colors.skeletonBase} 4%, 
        ${Colors.skeletonHighlight} 25%, 
        ${Colors.skeletonBase} 36%
    );
    background-size: 1000px 100%;
    animation: ${shimmer} 2s infinite linear;
    border-radius: ${BorderRadius.sm};
`;