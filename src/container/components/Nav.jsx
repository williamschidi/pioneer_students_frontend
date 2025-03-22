import { NavLink } from 'react-router-dom';
import logo from './../../assets/pioneer-students-logo.jpeg';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

import CollapseNav from './CollapseNav';
import useSticky from '../hooks/useSticky';

import PropTypes from 'prop-types';

const Container = styled.nav`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 2rem;
  background: #212529;
  border-bottom: 1px solid #e3fafc;
  &.sticky {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 99;
  }
  @media (max-width: 900px) {
    padding: 0 1.2rem;
  }
`;
const LogoContainer = styled.div`
  width: 5rem;
  height: 5rem;
  margin-right: auto;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;

  list-style: none;
`;
const Li = styled.li`
  color: #e3fafc;
  font-size: 1rem;
  font-weight: bold;
  padding: 1rem 2rem;
  cursor: pointer;
  &:hover {
  }
  @media (max-width: 900px) {
    font-size: 0.8rem;
    padding: 1rem;
  }
  @media (max-width: 750px) {
    padding: 0.8rem 1rem;
  }

  @media (max-width: 650px) {
    padding: 0.6rem 1rem;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  &.active {
    background: linear-gradient(to right, #212529, #343a40);
    border-radius: 0.5rem;
    box-shadow: 0.2rem 0.3rem rgba(0, 0, 0, 0.4);
  }
`;
// const Bar = styled.div`
//   position: relative;
//   background: #e3fafc;
//   width: 1.4rem;
//   height: 0.15rem;

//   &::before,
//   &::after {
//     content: '';
//     position: absolute;
//     background: #e3fafc;
//     width: 1.4rem;
//     height: 0.15rem;
//     transition: all 0.3s ease-in-out;
//   }
//   &::before {
//     top: 0.6rem;
//   }
//   &::after {
//     top: -0.6rem;
//   }

//   &.active {
//     background-color: transparent;
//     &::before {
//       top: 0;
//       transform: rotate(45deg);
//     }
//     &::after {
//       top: 0;
//       transform: rotate(-45deg);
//     }
//   }
// `;

const Dropdown = styled.ul`
  position: absolute;
  top: 4rem;
  right: 1rem;
  list-style: none;
  display: none;
  width: 8rem;
  border-radius: 0.5rem;
  background-color: #343a40;

  ${Li}:hover & {
    display: block;
  }
`;

const DropdownItem = styled.li`
  padding: 0.8rem;
  color: #e3fafc;
  font-size: 0.8rem;
  font-weight: 600;

  &.active {
    border-radius: 0.5rem;
    box-shadow: 0.2rem 0.3rem rgba(0, 0, 0, 0.4);
    background: linear-gradient(to right, #212529, #343a40);
  }
  &:hover {
    border-radius: 0.5rem;
    box-shadow: 0.2rem 0.3rem rgba(0, 0, 0, 0.4);
    background: linear-gradient(to right, #212529, #343a40);
  }
`;

function Nav({ isAuth }) {
  const isMobile = useMediaQuery({ maxWidth: 750 });

  const { isSticky, navRef } = useSticky();

  return (
    <Container ref={navRef} className={isSticky ? 'sticky' : ''}>
      <LogoContainer>
        <Img src={logo} alt="logo" />
      </LogoContainer>

      {!isMobile ? (
        <Ul>
          <StyledNavLink to="about">
            <Li>About Us</Li>
          </StyledNavLink>

          <StyledNavLink to="motto">
            <Li>Motto</Li>
          </StyledNavLink>

          <StyledNavLink to="members">
            <Li>Members</Li>
          </StyledNavLink>

          {!isAuth ? (
            <Li>
              Account
              <Dropdown>
                <StyledNavLink to="signup">
                  <DropdownItem>Sign up</DropdownItem>
                </StyledNavLink>
                <StyledNavLink to="login">
                  <DropdownItem>Login</DropdownItem>
                </StyledNavLink>
              </Dropdown>
            </Li>
          ) : (
            <StyledNavLink to="member">
              <Li>Register Member</Li>
            </StyledNavLink>
          )}
        </Ul>
      ) : (
        <CollapseNav />
      )}
    </Container>
  );
}

Nav.propTypes = {
  isAuth: PropTypes.bool,
};

export default Nav;
