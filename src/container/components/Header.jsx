import styled from 'styled-components';
import img1 from './../../assets/image0002.jpg';

const Head = styled.p`
  text-align: center;
  width: 97vw;
  padding: 1rem 0;
  text-transform: uppercase;
  transform: rotate(-1deg);
  display: inline-block;
  font-size: 2rem;
  font-weight: 700;
  background-image: url(${img1});
  background-position: cover;
  background-position: center;
  -webkit-background-clip: text;

  background-clip: text;
  color: transparent;

  @media (max-width: 900px) {
    font-size: 1.6rem;
    font-weight: 600;
  }
  @media (max-width: 750px) {
    font-size: 1.4rem;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
  }
  @media (max-width: 450px) {
    font-size: 0.8rem;
  }
`;

function Header() {
  return <Head>The Pioneer Students of St. Marks Sec Sch Emene.</Head>;
}

export default Header;
