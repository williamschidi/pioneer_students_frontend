import styled from "styled-components";
import img1 from "./../../assets/image0002.jpg";
import { useTheme } from "./ThemeContext";

const FooterContainer = styled.footer`
  text-align: center;
  padding: 1rem 1.4rem;
  background: ${(props) => props.theme.footerBg};
  height: 8vh;
  z-index: 100;
  @media (max-width: 600px) {
    padding: 0.8rem 1rem;
  }
`;

const P = styled.p`
  max-width: 98vw;
  text-transform: uppercase;
  transform: skewX(-20deg);
  display: inline-block;
  font-size: 1rem;
  font-weight: 600;
  word-spacing: 0.2rem;
  background-image: url(${img1});
  background-position: cover;
  background-position: center;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  @media (max-width: 900px) {
    font-size: 0.8rem;
  }
  @media (max-width: 700px) {
    font-size: 0.6rem;
  }
  @media (max-width: 600px) {
    font-size: 0.5rem;
    word-spacing: 0.15rem;
  }
  @media (max-width: 450px) {
    font-size: 0.4rem;
    word-spacing: 0.12rem;
  }
`;

function Footer() {
  const { theme } = useTheme();
  return (
    <FooterContainer theme={theme}>
      <P>
        &copy; {new Date().getFullYear()} Pioneer Students of St. Marks Sec.
        Sch. Emene. All rights reserved
      </P>
    </FooterContainer>
  );
}

export default Footer;
