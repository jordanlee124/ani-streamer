import styled, { css } from "styled-components";
import { UniversalColours } from "../../../styles/colours/UniversalColours";

export type ButtonVariant = "default" | "ghost";

export const StyledButton = styled.button<{ variant?: ButtonVariant; hidden?: boolean }>`
    font-family: 'Poppins Regular', sans-serif;
    border-radius: 0.4em;
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    visibility: ${({ hidden }) => (hidden ? "hidden" : "visible")};

    ${({ variant }) =>
        variant === "ghost"
            ? css`
                background: none;
                border: 1px solid ${UniversalColours.border};
                color: ${UniversalColours.textSecondary};
                font-size: 0.78rem;
                padding: 0.2em 0.6em;

                &:hover {
                    color: ${UniversalColours.textPrimary};
                    border-color: ${UniversalColours.textSecondary};
                }
            `
            : css`
                background-color: ${UniversalColours.surface};
                border: 1px solid ${UniversalColours.border};
                color: ${UniversalColours.textPrimary};
                font-size: 1.4rem;
                width: 2em;
                height: 3em;
                flex-shrink: 0;

                &:hover {
                    background-color: ${UniversalColours.surfaceHover};
                    color: ${UniversalColours.accent};
                }
            `}
`;
