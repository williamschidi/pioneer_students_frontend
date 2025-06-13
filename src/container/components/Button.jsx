// import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import { useThemes } from './ThemesContext';

const BtnContainer = styled.div`
  width: 100%;
  text-align: ${(props) => props.alignment};

  @media (max-width: 700px) {
    padding-left: 0;
  }
`;

const Btn = styled.button`
  padding: 0.4rem 1rem;
  border: 0.1rem solid #e3fafc;
  border-radius: 0.4rem;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 0.4rem 0.6rem rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &.btn-custom {
    color: #343a40;
    background-color: #fff;
  }
  &:hover {
    background: ${(props) => (props.hover ? props.hover : props.theme.primary)};
    color: #e3fafc;
    font-weight: bold;
  }
  &.active {
    transform: scale(0.9);
    box-shadow: 0 0.2rem 0.3rem rgba(0, 0, 0, 0.4);
  }
`;

function Button({
  children,
  type = 'button',
  alignment = 'center',
  containerStyle = {},
  bgHoverColor = '',
  ...props
}) {
  const [active, setActive] = useState(false);
  const { myTheme } = useThemes();
  const mobile = useMediaQuery({ maxWidth: 700 });

  return (
    <BtnContainer
      isMobile={mobile}
      alignment={alignment}
      style={containerStyle}
    >
      <Btn
        hover={bgHoverColor}
        theme={myTheme}
        type={type}
        onMouseDown={() => setActive(true)}
        onMouseUp={() => setActive(false)}
        onMouseLeave={() => setActive(false)}
        className={`${active ? 'active' : ''} btn-custom`}
        {...props}
      >
        {children}
      </Btn>
    </BtnContainer>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  containerStyle: PropTypes.string,
  alignment: PropTypes.string,
  bgHoverColor: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit']),
};

export default Button;
