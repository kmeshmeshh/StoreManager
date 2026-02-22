import { createBrowserRouter, Navigate } from 'react-router-dom';
import DashboardLayout from '../Layouts/DashboardLayout';
import ProductList from '../Pages/Products/components/product-list';
import Orders from '../Pages/Orders/components';
import CustomersList from '../Pages/Customers/components';
import Returns from '../Pages/Returns/components';
import Dashboard from '../Pages/Dashboard/components';
import Sales from '../Pages/Sales/components';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/orders" replace />,
            },
            {
                path: 'dashboard',
                element: <Dashboard />,
            }, {
                path: 'products',
                element: <ProductList />,
            },
            {
                path: 'orders',
                element: <Orders />,
            },
            {
                path: 'sales',
                element: <Sales />,
            },
            {
                path: 'customers',
                element: <CustomersList />,
            },
            {
                path: 'returns',
                element: <Returns />,
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to="/orders" replace />,
    },
]);