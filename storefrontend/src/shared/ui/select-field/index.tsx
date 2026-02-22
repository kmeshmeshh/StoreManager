import React, { forwardRef } from "react";
import { ChevronDown, AlertCircle } from "lucide-react";
import { Container, Hint, IconWrapper, Label, SelectWrapper, StyledSelect, ErrorMessage } from "./styled";

interface Option {
    label: string;
    value: string | number;
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: Option[];
    hint?: string;
}

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
    ({ label, error, options, hint, disabled, required, ...props }, ref) => {
        return (
            <Container>
                {label && (
                    <Label hasError={!!error}>
                        {label}
                        {required && <span className="required">*</span>}
                    </Label>
                )}

                <SelectWrapper>
                    <StyledSelect
                        ref={ref}
                        disabled={disabled}
                        hasError={!!error}
                        required={required}
                        {...props}
                    >
                        <option value="" disabled>
                            اختر {label}...
                        </option>
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </StyledSelect>

                    <IconWrapper disabled={disabled}>
                        <ChevronDown size={20} />
                    </IconWrapper>
                </SelectWrapper>

                {hint && !error && <Hint>{hint}</Hint>}

                {error && (
                    <ErrorMessage>
                        <AlertCircle size={14} />
                        {error}
                    </ErrorMessage>
                )}
            </Container>
        );
    }
);

SelectField.displayName = "SelectField";

export default SelectField;