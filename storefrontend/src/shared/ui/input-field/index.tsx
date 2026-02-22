import { forwardRef } from "react";
import { InputContainer, Label, StyledInput, ErrorMessage } from "./styled";

type Props = {
    label: string;
    error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = forwardRef<HTMLInputElement, Props>(
    ({ label, error, id, ...rest }, ref) => {
        return (
            <InputContainer>
                {label && <Label htmlFor={id || rest.name}>{label}</Label>}

                <StyledInput
                    ref={ref}
                    id={id || rest.name} 
                    $hasError={!!error}  
                    {...rest}
                />

                {error && <ErrorMessage>{error}</ErrorMessage>}
            </InputContainer>
        );
    }
);

InputField.displayName = "InputField";

export default InputField;