import type { ButtonHTMLAttributes, ReactNode, StyleHTMLAttributes } from "react";
import { StyledButton, Spinner, IconWrapper } from "./styled";
import {
    ButtonVariant,
    type ButtonVariantType,
    ButtonSize,
    type ButtonSizeType
} from "../../../constants/theme.constants";
import type { CSSProperties } from "styled-components";

type ButtonProps = {
    children: ReactNode;
    variant?: ButtonVariantType;
    size?: ButtonSizeType;
    fullWidth?: boolean;
    isLoading?: boolean;
    icon?: ReactNode;
    style?: CSSProperties;

} & ButtonHTMLAttributes<HTMLButtonElement>;


const Button = ({
    children,
    variant = ButtonVariant.Primary,
    size = ButtonSize.Md,
    fullWidth = false,
    isLoading = false,
    disabled,
    icon,
    ...rest
}: ButtonProps) => {
    return (
        <StyledButton
            $variant={variant}
            $size={size}
            $fullWidth={fullWidth}
            disabled={disabled || isLoading}
            {...rest}
        >
            {isLoading && <Spinner />}

            {!isLoading && icon && (
                <IconWrapper>
                    {icon}
                </IconWrapper>
            )}

            {children}
        </StyledButton>
    );
};

export default Button;