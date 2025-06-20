import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
// import ToggleLightMode from './ToggleLightMode';
import { Link } from 'react-scroll';
import { useDispatch, useSelector } from 'react-redux';
import { useThemes } from './ThemesContext';
import { resetSearchedMembers } from './redux/userSlice';

const Ul = styled.ul`
  position: fixed;
  left: 100%;
  top: 0;
  width: 100%;
  min-height: 100vh;
  display: block;
  z-index: 98;
  margin-top: 5.2rem;
  background: ${(props) => props.theme.primary};
  transition: all 0.8s;

  &.show-nav {
    left: 0;
  }
  @media (max-width: 500px) {
    margin-top: 3.5rem;
  }
`;

const Li = styled.li`
  position: relative;
  display: block;
  width: 100%;
  max-width: 14rem;
  margin: 0 auto 1.2rem;
  text-align: center;
  padding: 1.2rem 1.6rem;
  background: #3c3fba;
  color: #e3fafc;

  &:hover {
    background: #5b5de8;
  }
  &.sub-list {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Bar = styled.div`
  position: relative;
  background: #e3fafc;
  width: 1.4rem;
  top: 0;
  height: 0.15rem;
  @media (max-width: 500px) {
    width: 1.2rem;
    height: 0.1rem;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    background: #e3fafc;
    width: 1.4rem;
    height: 0.15rem;
    transition: all 0.3s ease-in-out;
    @media (max-width: 500px) {
      width: 1.2rem;
      height: 0.1rem;
    }
  }
  &::before {
    top: 0.4rem;
  }
  &::after {
    top: -0.4rem;
  }

  &.active {
    background-color: transparent;
    &::before {
      top: 0;
      transform: rotate(45deg);
    }
    &::after {
      top: 0;
      transform: rotate(-45deg);
    }
  }
`;
const Btn = styled.button`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
  font-size: 1.1rem;
  background: none;
  color: #e3fafc;
  border: none;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;

function CollapseNav({ isOpen, setIsOpen, handleNav }) {
  const { myTheme } = useThemes();
  const isAuthenticated = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  return (
    <>
      <Bar
        onClick={() => setIsOpen(!isOpen)}
        className={isOpen ? 'active' : ''}
      ></Bar>
      <Ul className={isOpen ? 'show-nav' : ''} theme={myTheme}>
        {/* <ToggleContainer>
          <ToggleLightMode />
        </ToggleContainer> */}

        <Li theme={myTheme}>
          <Link
            to="about"
            onClick={() => {
              handleNav();
              setIsOpen(!isOpen);
            }}
          >
            About Us
          </Link>
        </Li>

        <StyledNavLink to="members">
          <Li
            theme={myTheme}
            onClick={() => {
              setIsOpen(!isOpen);
              dispatch(resetSearchedMembers());
            }}
          >
            Members
          </Li>
        </StyledNavLink>

        {!isAuthenticated ? (
          <StyledNavLink to="login">
            <Li theme={myTheme} onClick={() => setIsOpen(!isOpen)}>
              <Btn>Login</Btn>
            </Li>
          </StyledNavLink>
        ) : (
          <>
            <StyledNavLink to="register">
              <Li theme={myTheme} onClick={() => setIsOpen(!isOpen)}>
                <Btn>Register Member</Btn>
              </Li>
            </StyledNavLink>
            <StyledNavLink to="logout">
              <Li theme={myTheme} onClick={() => setIsOpen(!isOpen)}>
                <Btn>Logout</Btn>
              </Li>
            </StyledNavLink>
          </>
        )}
      </Ul>
    </>
  );
}

CollapseNav.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  handleNav: PropTypes.func.isRequired,
};

export default CollapseNav;
