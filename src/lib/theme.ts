import { createGlobalStyle } from "styled-components";
import PoppinsBold from "../styles/fonts/poppins/Poppins-Bold.ttf";
import PoppinsRegular from "../styles/fonts/poppins/Poppins-Regular.ttf";

export const theme = {
  background: "#000000"
};

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  };

  @font-face {
    font-family: 'Poppins Bold';
    src: url(${PoppinsBold});
  };

  @font-face {
    font-family: 'Poppins Regular';
    src: url(${PoppinsRegular});
  }

  body {
    box-sizing: border-box;
    font-family: 'Poppins Regular';
    background-color: ${theme.background};
  }

  h1 {
    font-family: 'Poppins Bold';
  }

  input {
    font-family: 'Poppins Regular';
  }
`;