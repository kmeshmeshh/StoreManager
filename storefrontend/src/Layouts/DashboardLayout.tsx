import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './components/sidebar';

const LayoutContainer = styled.div`
    display: flex;
    height: 100vh;
    background-color: #f5f5f5;
`;

const MainContent = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const ContentArea = styled.div`
    flex: 1;
    padding: 24px;
    overflow-y: auto;
`;

const DashboardLayout = () => {
    return (
        <LayoutContainer>
            <Sidebar />
            <MainContent>
                <ContentArea>
                    <Outlet />
                </ContentArea>
            </MainContent>
        </LayoutContainer>
    );
};

export default DashboardLayout;