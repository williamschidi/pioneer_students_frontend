import styled, { keyframes, css } from "styled-components";
import img1 from "./../../assets/image0002.jpg";
import { HiOutlineSun } from "react-icons/hi";
import { HiMiniMoon } from "react-icons/hi2";
import { useTheme } from "./ThemeContext";

const Main = styled.main`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1.5rem;
  background: #fff;

  @media (max-width: 600px) {
    padding: 0 1rem;
  }
`;

const Rotate = keyframes`
  from{ 
    transform: rotate(0deg);
    
  }
  to{
    transform: rotate(180deg);

  }
`;

const Reverse = keyframes`
  from{
    transform: rotate(180deg);
  }
  to{
    transform: rotate(360deg);
  }
`;

const Button = styled.button`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.4rem;
  border: none;
  /* box-shadow: 0.2rem 0.3rem 0.3rem rgba(0, 0, 0, 0.3); */
  background: transparent;
  animation: ${(props) =>
    props.mode === "light"
      ? css`
          ${Rotate} 1s forwards
        `
      : css`
          ${Reverse} 1s forwards
        `};

  cursor: pointer;

  @media (max-width: 600px) {
    width: 2rem;
    height: 2rem;
  }
  @media (max-width: 600px) {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
const DarkModeIcon = styled(HiMiniMoon)`
  width: 2rem;
  height: 2rem;

  @media (max-width: 450px) {
    width: 1rem;
    height: 1rem;
  }
`;
const LightModeIcon = styled(HiOutlineSun)`
  width: 2rem;
  height: 2rem;

  @media (max-width: 600px) {
    width: 1.5rem;
    height: 1.5rem;
  }
  @media (max-width: 450px) {
    width: 1rem;
    height: 1rem;
  }
`;

const Head = styled.p`
  text-align: center;
  width: 97vw;
  padding: 1rem 0;
  text-transform: uppercase;
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
    width: 100vw;
  }
  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

function Header() {
  const { mode, toggleMode } = useTheme();

  return (
    <Main>
      <Head>Pioneer Students of St. Marks Sec Sch Emene.</Head>
      <Button onClick={toggleMode} mode={mode} key={mode}>
        {mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
      </Button>
    </Main>
  );
}

export default Header;
