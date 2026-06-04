import React from "react";
import { StyledTag } from "./styled";

interface TagProps {
    children: React.ReactNode;
}

const Tag: React.FunctionComponent<TagProps> = ({ children }) => (
    <StyledTag>{children}</StyledTag>
);

export default Tag;
