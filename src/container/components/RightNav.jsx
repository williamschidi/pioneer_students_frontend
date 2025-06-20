import { useMediaQuery } from 'react-responsive';
import CollapseNav from './CollapseNav';
import { useLogoutMutation } from './redux/apiSlice';
import { useThemes } from './ThemesContext';
import { clearUser, resetSearchedMembers } from './redux/userSlice';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { scrollToSection } from './scrollToSection';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const navTabs = ['/members', '/register', '/home'];

const NavListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;
  list-style: none;
`;

const Li = styled.li``;

const StyledNavLink = styled(NavLink)`
  font-size: 1rem;
  text-decoration: none;
  color: ${(props) => props.theme.textColor1};
  padding: 0.3rem 1.2rem;
  text-align: center;
  font-weight: bold;
  cursor: pointer;

  &.login {
    background-color: ${(props) => props.theme.secondary};
    color: ${(props) => props.theme.primary};
    border-radius: 5rem;
  }
  &.active {
    background-color: ${(props) => props.theme.secondary};
    color: ${(props) => props.theme.primary};
    border-radius: 5rem;
  }

  &:hover {
    border-bottom: 0.2rem solid ${(props) => props.theme.secondary};
    color: ${(props) => props.theme.textColor1};
  }
  &.login:hover {
    color: ${(props) => props.theme.textColor1};
  }

  @media (max-width: 900px) {
    font-size: 0.8rem;
    padding: 0.2rem 0.9rem;
  }
  @media (max-width: 750px) {
    padding: 0.8rem 1rem;
  }

  @media (max-width: 650px) {
    padding: 0.6rem 1rem;
  }
`;
function RightNav({ isOpen, setIsOpen }) {
  const { myTheme } = useThemes();
  const [logout] = useLogoutMutation();
  const isMobile = useMediaQuery({ maxWidth: 750 });
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuth);
  const navigate = useNavigate();

  function handleNav() {
    if (location.pathname === '/home') {
      scrollToSection('about');
    } else {
      navigate('/home', { state: { scrollTo: 'about' } });
    }
  }

  async function handlelogout() {
    try {
      await logout().unwrap();
      dispatch(clearUser());
      navigate('/login');
    } catch (err) {
      toast(`Login failed ${err.message}`);
    }
  }

  const hasActiveClass = navTabs.some((path) =>
    location.pathname.startsWith(path)
  );
  const customProps = { handleNav, isOpen, setIsOpen };
  return (
    <NavListContainer>
      {!isMobile ? (
        <>
          <Ul>
            <Li onClick={handleNav}>
              <StyledNavLink to="home" theme={myTheme}>
                About Us
              </StyledNavLink>
            </Li>

            <Li>
              <StyledNavLink
                to="members"
                theme={myTheme}
                onClick={() => {
                  dispatch(resetSearchedMembers());
                }}
              >
                Members
              </StyledNavLink>
            </Li>

            {!isAuthenticated ? (
              <Li>
                <StyledNavLink
                  to="login"
                  className={!hasActiveClass ? 'login' : ''}
                  theme={myTheme}
                >
                  Login
                </StyledNavLink>
              </Li>
            ) : (
              <>
                <Li>
                  <StyledNavLink
                    to="register"
                    className={!hasActiveClass ? 'login' : ''}
                    theme={myTheme}
                  >
                    Register Member
                  </StyledNavLink>
                </Li>

                <Li>
                  <StyledNavLink
                    to="login"
                    className={!hasActiveClass ? 'login' : ''}
                    theme={myTheme}
                    onClick={handlelogout}
                  >
                    Logout
                  </StyledNavLink>
                </Li>
              </>
            )}
          </Ul>
        </>
      ) : (
        <CollapseNav {...customProps} />
      )}
    </NavListContainer>
  );
}

RightNav.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default RightNav;
