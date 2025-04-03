// import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from './ThemeContext';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

const BtnContainer = styled.div`
  width: 100%;
  text-align: center;
  padding-left: ${(props) => (props.IsMobile ? '0' : '5rem')};
  @media (max-width: 700px) {
    padding-left: 0;
  }
`;

const Btn = styled.button`
  padding: 0.4rem 1rem;
  border: 0.1rem solid #e3fafc;
  color: #343a40;
  border-radius: 0.4rem;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 0.4rem 0.6rem rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.btnHoverBg};
    color: #e3fafc;
    font-weight: bold;
  }
  /* &.active {
    transform: translateY(0.3rem);
    background-color: red;
    box-shadow: 0 0.2rem 0.3rem rgba(0, 0, 0, 0.4);
  } */
`;

function Button({ children }) {
  const [active, setActive] = useState(false);
  const { theme } = useTheme();
  const IsMobile = useMediaQuery({ maxWidth: 700 });

  return (
    <BtnContainer IsMobile={IsMobile}>
      <Btn
        theme={theme}
        type="submit"
        onClick={() => setActive(true)}
        className={active ? 'active' : ''}
      >
        {children}
      </Btn>
    </BtnContainer>
  );
}

Button.propTypes = {
  children: PropTypes.string,
  noPadding: PropTypes.bool,
};

export default Button;
