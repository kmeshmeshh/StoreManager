import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import {
    Overlay,
    ModalContainer,
    ModalHeader,
    ModalTitle,
    CloseButton,
    ModalBody,
} from './styled';

type ModalProps = {
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showCloseButton?: boolean;
};

const Modal = ({
    onClose,
    title,
    children,
    size = 'md',
    showCloseButton = true
}: ModalProps) => {

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <Overlay onClick={handleOverlayClick}>
            <ModalContainer $size={size}>
                {(title || showCloseButton) && (
                    <ModalHeader>
                        {title && <ModalTitle>{title}</ModalTitle>}
                        {showCloseButton && (
                            <CloseButton onClick={onClose}>
                                <X size={20} />
                            </CloseButton>
                        )}
                    </ModalHeader>
                )}
                <ModalBody>{children}</ModalBody>
            </ModalContainer>
        </Overlay>,
        document.body
    );
};

export default Modal;
export { ModalFooter } from './styled';