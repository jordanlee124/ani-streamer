import React from "react";
import { StyledButton, ButtonVariant } from "./styled";

interface ButtonProps {
    variant?: ButtonVariant;
    hidden?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
}

const Button: React.FunctionComponent<ButtonProps> = ({ variant = "default", hidden, onClick, children }) => (
    <StyledButton variant={variant} hidden={hidden} onClick={onClick}>
        {children}
    </StyledButton>
);

export default Button;
