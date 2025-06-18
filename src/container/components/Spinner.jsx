import styled, { keyframes } from 'styled-components';
import { useThemes } from './ThemesContext';

const Rotate = keyframes`
from{
    transform:rotate(0deg)}
to{
transform: rotate(360deg)
}
`;

const Spin = styled.div`
  width: 4rem;
  height: 4rem;
  border: 0.4rem solid #f3f3f3;
  border-top: 0.4rem solid ${(props) => props.theme.primary};
  border-radius: 50%;
  animation: ${Rotate} 1s linear infinite;
  margin: 10rem auto;
`;

function Spinner() {
  const { myTheme } = useThemes();
  return <Spin theme={myTheme}></Spin>;
}

export default Spinner;
