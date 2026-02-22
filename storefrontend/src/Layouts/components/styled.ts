import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Colors, FontSize, FontWeight, Spacing } from '../../constants/theme.constants';

export const SidebarContainer = styled.aside<{ isCollapsed?: boolean }>`
    width: ${({ isCollapsed }) => (isCollapsed ? '70px' : '250px')};
    min-width: ${({ isCollapsed }) => (isCollapsed ? '70px' : '250px')};
    background-color: ${Colors.dark};
    color: white;
    padding: ${({ isCollapsed }) => (isCollapsed ? `${Spacing.lg} ${Spacing.sm}` : Spacing.lg)};
    display: flex;
    flex-direction: column;
    gap: ${Spacing.sm};
    transition: all 0.3s ease;
    height: 100vh;
    position: sticky;
    top: 0;
    overflow: hidden;
`;

export const SidebarHeader = styled.div<{ isCollapsed?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: ${({ isCollapsed }) => (isCollapsed ? 'center' : 'space-between')};
    margin-bottom: ${Spacing.lg};
    padding: ${Spacing.sm};
`;

export const Logo = styled.h2<{ isCollapsed?: boolean }>`
    font-size: ${FontSize['2xl']};
    font-weight: ${FontWeight.bold};
    color: ${Colors.primary};
    white-space: nowrap;
    opacity: ${({ isCollapsed }) => (isCollapsed ? 0 : 1)};
    width: ${({ isCollapsed }) => (isCollapsed ? 0 : 'auto')};
    overflow: hidden;
    transition: all 0.3s ease;
`;

export const MenuButton = styled.button`
    background: none;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    padding: ${Spacing.sm};
    border-radius: ${Spacing.sm};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;

    &:hover {
        background-color: #334155;
        color: white;
    }

    svg {
        width: 24px;
        height: 24px;
    }
`;

export const NavItem = styled(NavLink) <{ isCollapsed?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: ${({ isCollapsed }) => (isCollapsed ? '' : 'flex-start')};
    gap: ${Spacing.md};
    padding: ${({ isCollapsed }) => (isCollapsed ? Spacing.md : Spacing.md)};
    border-radius: ${Spacing.sm};
    color: #94a3b8;
    text-decoration: none;
    transition: all 0.2s;
    font-size: ${FontSize.lg};
    font-weight: ${FontWeight.medium};
    position: relative;

    &:hover {
        background-color: #334155;
        color: white;
    }

    &.active {
        background-color: ${Colors.primary};
        color: white;
    }

    svg {
        width: 22px;
        height: 22px;
        min-width: 22px;
    }

    span {
        white-space: nowrap;
        opacity: ${({ isCollapsed }) => (isCollapsed ? 0 : 1)};
        width: ${({ isCollapsed }) => (isCollapsed ? 0 : 'auto')};
        overflow: hidden;
        transition: all 0.3s ease;
    }
`;

export const NavItemWrapper = styled.div<{ isCollapsed?: boolean }>`
    position: relative;

    &:hover::after {
        content: attr(data-tooltip);
        position: absolute;
        right: calc(100% + 10px);
        top: 50%;
        transform: translateY(-50%);
        background-color: #1e293b;
        color: white;
        padding: ${Spacing.sm} ${Spacing.md};
        border-radius: ${Spacing.sm};
        font-size: ${FontSize.sm};
        white-space: nowrap;
        z-index: 1000;
        opacity: ${({ isCollapsed }) => (isCollapsed ? 1 : 0)};
        visibility: ${({ isCollapsed }) => (isCollapsed ? 'visible' : 'hidden')};
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    }
`;