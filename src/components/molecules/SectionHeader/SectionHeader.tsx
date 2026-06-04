import React from "react";
import { Button } from "../../atoms";
import * as Styled from "./styled";

interface SectionHeaderProps {
    title: string;
    onClear?: () => void;
}

const SectionHeader: React.FunctionComponent<SectionHeaderProps> = ({ title, onClear }) => (
    <Styled.Container>
        <Styled.Title>{title}</Styled.Title>
        {onClear && (
            <Button variant="ghost" onClick={onClear}>
                Clear
            </Button>
        )}
    </Styled.Container>
);

export default SectionHeader;
