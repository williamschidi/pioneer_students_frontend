import styled, { css, keyframes } from "styled-components";
import { HiOutlineSun } from "react-icons/hi";
import { HiMiniMoon } from "react-icons/hi2";
import { useTheme } from "./ThemeContext";

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
  @media (max-width: 500px) {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
const DarkModeIcon = styled(HiMiniMoon)`
  width: 2rem;
  height: 2rem;
  color: #fff;

  @media (max-width: 450px) {
    width: 1.5rem;
    height: 1.5rem;
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
    width: 1.5rem;
    height: 1.5rem;
  }
`;

function ToggleLightMode() {
  const { mode, toggleMode } = useTheme();

  return (
    <Button onClick={toggleMode} mode={mode} key={mode}>
      {mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
    </Button>
  );
}

export default ToggleLightMode;
