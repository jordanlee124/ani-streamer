import React from "react";
import { StyledBadge } from "./styled";

interface BadgeProps {
    children: React.ReactNode;
}

const Badge: React.FunctionComponent<BadgeProps> = ({ children }) => (
    <StyledBadge>{children}</StyledBadge>
);

export default Badge;
