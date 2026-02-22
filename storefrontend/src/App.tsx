import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { SnackbarProvider } from './shared/ui/snack-bar';
import { router } from './Routes';
import { RouterProvider } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SnackbarProvider>
                <RouterProvider router={router} />
            </SnackbarProvider>
        </QueryClientProvider>
    );
}

export default App;