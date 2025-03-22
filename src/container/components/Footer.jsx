import styled from 'styled-components';
import img1 from './../../assets/image0002.jpg';

const FooterContainer = styled.footer`
  text-align: center;
  padding: 1rem 1.4rem;
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
`;

function Footer() {
  return (
    <FooterContainer>
      <P>
        &copy; {new Date().getFullYear()} The Pioneer Students of St. Marks Sec.
        Sch. Emene. All rights reserved
      </P>
    </FooterContainer>
  );
}

export default Footer;
