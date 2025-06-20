import styled from 'styled-components';
import logo from './../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const LogoContainer = styled.div`
  width: 3rem;
  height: 3rem;
  margin-right: auto;

  @media (max-width: 500px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
`;

function Logo({ setIsOpen, isOpen }) {
  return (
    <LogoContainer>
      <NavLink to="/" onClick={() => (!isOpen ? '' : setIsOpen(!isOpen))}>
        <Img src={logo} alt="logo" id="top" />
      </NavLink>
    </LogoContainer>
  );
}

Logo.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Logo;
