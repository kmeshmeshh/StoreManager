import { Package, ShoppingCart, Users, RotateCcw, LayoutDashboard, Menu, ChevronRight, ChevronLeft, TrendingUp } from 'lucide-react';
import { Logo, NavItem, SidebarContainer, SidebarHeader, MenuButton, NavItemWrapper } from './styled';
import { useState } from 'react';

interface NavItemData {
    to: string;
    icon: React.ReactNode;
    label: string;
}

const navItems: NavItemData[] = [
    { to: "/dashboard", icon: <LayoutDashboard />, label: "الرئيسية" },
    { to: "/orders", icon: <ShoppingCart />, label: "طلب جديد" },
    { to: "/products", icon: <Package />, label: "المنتجات" },
    { to: "/sales", icon: <TrendingUp />, label: "المببيعات" },
    { to: "/customers", icon: <Users />, label: "العملاء" },
    { to: "/returns", icon: <RotateCcw />, label: "المرتجعات" },
];

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <SidebarContainer isCollapsed={isCollapsed}>
            <SidebarHeader isCollapsed={isCollapsed}>
                <Logo isCollapsed={isCollapsed}>ICONIC</Logo>
                <MenuButton onClick={() => setIsCollapsed(prev => !prev)}>
                    {isCollapsed ? <ChevronLeft /> : <ChevronRight />}
                </MenuButton>
            </SidebarHeader>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {navItems.map((item) => (
                    <NavItemWrapper
                        key={item.to}
                        isCollapsed={isCollapsed}
                        data-tooltip={item.label}
                    >
                        <NavItem to={item.to} isCollapsed={isCollapsed}>
                            {item.icon}
                            <span>{item.label}</span>
                        </NavItem>
                    </NavItemWrapper>
                ))}
            </nav>
        </SidebarContainer>
    );
};

export default Sidebar;