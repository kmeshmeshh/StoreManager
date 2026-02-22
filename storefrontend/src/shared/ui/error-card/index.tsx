import React from "react";
import Button from "../button";
import {
    CardContainer,
    IconWrapper,
    ErrorTitle,
    ErrorDescription
} from "./styled";

interface ErrorCardProps {
    title?: string;
    description?: string;
    onRetry?: () => void;
}

const ErrorCard: React.FC<ErrorCardProps> = ({
    title = "حدث خطأ ما",
    description = "لم نتمكن من تحميل البيانات. يرجى المحاولة مرة أخرى.",
    onRetry,
}) => {
    return (
        <CardContainer>
            <IconWrapper>⚠️</IconWrapper>

            <ErrorTitle>
                {title}
            </ErrorTitle>

            <ErrorDescription>
                {description}
            </ErrorDescription>

            {onRetry && (
                <Button variant="danger" onClick={onRetry}>
                    إعادة المحاولة
                </Button>
            )}
        </CardContainer>
    );
};

export default ErrorCard;