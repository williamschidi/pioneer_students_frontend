import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from './../../assets/logo.png';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

import CollapseNav from './CollapseNav';
import { useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

import { useThemes } from './ThemesContext';

import {
  useLazyGetSearchMembersQuery,
  useLogoutMutation,
} from './redux/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearUser,
  resetSearchedMembers,
  setSearchedMembers,
} from './redux/userSlice';
import { scrollToSection } from './scrollToSection';
import { toast } from 'react-toastify';

const navTabs = ['/members', '/register', '/home'];

const Container = styled.nav`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 3rem;
  background: ${(props) => props.theme.primary};

  &.sticky {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 99;
  }
  @media (max-width: 900px) {
    padding: 0 1.2rem;
  }
  @media (max-width: 900px) {
    padding: 0.3rem 1rem;
  }
`;
const LogoContainer = styled.div`
  width: 3rem;
  height: 3rem;
  margin-right: auto;

  @media (max-width: 500px) {
    width: 2rem;
    height: 2rem;
  }
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
`;

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

const SearchContainer = styled.div`
  position: relative;
  margin-right: 3rem;

  @media (max-width: 1000px) {
    margin: 0 2rem 0 1rem;
  }
`;

const Search = styled.input`
  width: 18rem;
  padding: 0.4rem 1rem;
  border: 1px solid gray;
  border-radius: 1rem;
  outline: none;

  &:focus {
    border: none;
    border-left: 2px solid gray;
    border-bottom: 2px solid gray;
    background-color: #fff4e6;
    box-shadow: 0 0 0.5rem rgba(0, 0, 255, 0.5);
  }

  @media (max-width: 1000px) {
    width: 16rem;
    font-size: 0.7rem;
    padding: 0.3rem 0.8rem;
  }
  @media (max-width: 600px) {
    width: 14rem;
    padding: 0.2rem 0.7rem;
  }
  @media (max-width: 450px) {
    width: 12rem;
    font-size: 0.6rem;
  }
`;

const SearchIcon = styled(HiOutlineSearch)`
  position: absolute;
  top: 0.5rem;
  right: 0.8rem;
  @media (max-width: 900px) {
    top: 0.4rem;
  }
  @media (max-width: 600px) {
    width: 0.8rem;
    height: 0.8rem;
    top: 0.4rem;
    right: 0.6rem;
  }
`;

function Nav() {
  const location = useLocation();
  const { myTheme } = useThemes();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuth);

  const dispatch = useDispatch();

  const [fetchData] = useLazyGetSearchMembersQuery();

  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 750 });

  const hasActiveClass = navTabs.some((path) =>
    location.pathname.startsWith(path)
  );

  async function handleSearch(e) {
    if (e.key === 'Enter' && search) {
      try {
        const response = await fetchData(search).unwrap();
        dispatch(setSearchedMembers(response));
        navigate('/members');
        setSearch('');
      } catch (err) {
        const errorMessage =
          err?.data?.message || err?.error || 'Something went wrong';
        toast.error(errorMessage, {
          style: {
            color: 'red',
            borderLeft: '0.6rem solid red',
            marginTop: '4rem',
            width: '50rem',
            maxWidth: '70vw',
            fontSize: '.8rem',
          },
        });
      }
    }
  }

  function handleOnChange(e) {
    setSearch(() => e.target.value);
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

  function handleNav() {
    if (location.pathname === '/home') {
      scrollToSection('about');
    } else {
      navigate('/home', { state: { scrollTo: 'about' } });
    }
  }

  const customProps = { handleNav, isOpen, setIsOpen };

  return (
    <Container theme={myTheme}>
      <LogoContainer>
        <NavLink to="/" onClick={() => setIsOpen(!open)}>
          <Img src={logo} alt="logo" id="top" />
        </NavLink>
      </LogoContainer>
      <SearchContainer>
        <Search
          type="text"
          name="search"
          value={search}
          placeholder="search member by last name"
          onChange={handleOnChange}
          onKeyDown={handleSearch}
        />
        <SearchIcon />
      </SearchContainer>
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
    </Container>
  );
}

export default Nav;
