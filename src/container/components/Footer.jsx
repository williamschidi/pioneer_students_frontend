import styled from 'styled-components';
import img1 from './../../assets/logo.png';

import { useThemes } from './ThemesContext';
import { useMediaQuery } from 'react-responsive';

const FooterContainer = styled.footer`
  text-align: center;
  padding: 1rem 0;
  background: ${(props) => props.theme.primary};
  z-index: 100;
  @media (max-width: 600px) {
    padding: 0.8rem 1rem;
  }
`;

const FooterHead = styled.div`
  max-width: 60rem;
  padding: 2rem 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const FooterLogo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.5rem;
  @media (max-width: 600px) {
    align-items: center;
  }
`;

const Title = styled.div`
  color: ${(props) => props.theme.textColor1};
  padding-bottom: 1.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  @media (max-width: 600px) {
    padding-bottom: 1rem;
  }
`;

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.8rem;
  color: ${(props) => props.theme.secondary};
  font-size: 0.8rem;
`;

const ImgContainer = styled.div`
  width: 3rem;
  height: 3rem;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const Text = styled.p`
  color: ${(props) => props.theme.secondary};
  font-size: 0.8rem;
  @media (max-width: 600px) {
    font-size: 0.7rem;
  }
`;

const P = styled.p`
  max-width: 98vw;
  transform: skewX(-20deg);
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 500;
  word-spacing: 0.2rem;
  color: ${(props) => props.theme.textColor1};

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
  const { myTheme } = useThemes();
  const isMobile = useMediaQuery({ maxWidth: 600 });
  return (
    <FooterContainer theme={myTheme}>
      <FooterHead>
        <FooterLogo>
          <ImgContainer>
            <Img src={img1} alt="logo" />
          </ImgContainer>

          <Text theme={myTheme}>
            Keeping pioneer {isMobile ? <br /> : ''}connections alive.
          </Text>
        </FooterLogo>
        <div>
          <Title theme={myTheme}>Quick Link</Title>
          <Ul theme={myTheme}>
            <li>Home</li>
            <li>Team</li>
            <li>Memories</li>
          </Ul>
        </div>
        <div>
          <Title theme={myTheme}>Stay Connected</Title>
          <Ul theme={myTheme}>
            <li>Email</li>
            <li>Contact</li>
            <li>Follow Us</li>
          </Ul>
        </div>
      </FooterHead>
      <hr />
      <P theme={myTheme}>
        &copy; {new Date().getFullYear()} Pioneer Students of St. Marks Sec.
        Sch. Emene. All rights reserved
      </P>
    </FooterContainer>
  );
}

export default Footer;
