import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { SnackbarContainer, Toast, ToastContent, CloseButton } from "./styled";
import { Colors } from "../../../constants/theme.constants";

type SnackbarType = 'success' | 'error' | 'warning' | 'info';

type SnackbarItem = {
    id: number;
    message: string;
    type: SnackbarType;
};

type SnackbarContextType = {
    showSnackbar: (message: string, type?: SnackbarType) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
    const [snackbars, setSnackbars] = useState<SnackbarItem[]>([]);

    const removeSnackbar = useCallback((id: number) => {
        setSnackbars((prev) => prev.filter((item) => item.id !== id));
    }, []);

    const showSnackbar = useCallback((message: string, type: SnackbarType = 'success') => {
        const id = Date.now();
        setSnackbars((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            removeSnackbar(id);
        }, 3000);
    }, [removeSnackbar]);

    const getIcon = (type: SnackbarType) => {
        switch (type) {
            case 'success': return <span style={{ color: Colors.success }}>✔</span>;
            case 'error': return <span style={{ color: Colors.error }}>✖</span>;
            case 'warning': return <span style={{ color: Colors.warning }}>⚠</span>;
            case 'info': return <span style={{ color: Colors.info }}>ℹ</span>;
        }
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}

            <SnackbarContainer>
                {snackbars.map((snackbar) => (
                    <Toast key={snackbar.id} $type={snackbar.type}>
                        <ToastContent>
                            {getIcon(snackbar.type)}
                            {snackbar.message}
                        </ToastContent>
                        <CloseButton onClick={() => removeSnackbar(snackbar.id)}>
                            ✕
                        </CloseButton>
                    </Toast>
                ))}
            </SnackbarContainer>
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error("useSnackbar must be used within a SnackbarProvider");
    }
    return context;
};