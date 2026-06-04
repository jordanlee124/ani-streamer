import React from "react";
import { Badge } from "../../atoms";
import * as Styled from "./styled";

interface MangaCardProps {
    title: string;
    image?: string;
    ranking?: number;
    onClick?: () => void;
}

const MangaCard: React.FunctionComponent<MangaCardProps> = ({ title, image, ranking, onClick }) => (
    <Styled.CardContainer onClick={onClick}>
        <Styled.ImageWrapper>
            <Styled.CoverImage src={image} alt={title} />
            {ranking && <Badge>{ranking}</Badge>}
        </Styled.ImageWrapper>
        <Styled.Title>{title}</Styled.Title>
    </Styled.CardContainer>
);

export default MangaCard;
