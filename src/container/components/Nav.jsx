import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "./../../assets/logo.jpeg";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

import CollapseNav from "./CollapseNav";
import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { useTheme } from "./ThemeContext";

import ToggleLightMode from "./ToggleLightMode";
import { useLogoutMutation } from "./redux/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "./redux/userSlice";
import { scrollToSection } from "./scrollToSection";

const Container = styled.nav`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  background: ${(props) => props.theme.navBg};
  border-bottom: ${(props) => props.theme.navBorderBottom};
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

  @media (max-width: 500px) {
    width: 3.5rem;
    height: 3.5rem;
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
  list-style: none;
`;
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;

const Li = styled.li`
  color: #e3fafc;
  font-size: 1rem;
  font-weight: bold;
  padding: 1rem 1.6rem;
  text-align: center;

  ${StyledNavLink}.active & {
    border-radius: 0.5rem;
    border-bottom: 0.1rem solid #e3fafc;
  }
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

const Btn = styled.button`
  border: none;
  background-color: transparent;
  color: #e3fafc;
  font-weight: bold;
  font-size: 1rem;
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
  padding: 0.5rem 1rem;
  border: 1px solid gray;
  border-radius: 0.8rem;
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
    font-size: 0.8rem;
  }
  @media (max-width: 500px) {
    width: 14rem;
    padding: 0.3rem 0.7rem;
  }
  @media (max-width: 450px) {
    width: 12rem;
    font-size: 0.6rem;
  }
`;

const SearchIcon = styled(HiOutlineSearch)`
  position: absolute;
  top: 0.6rem;
  right: 0.8rem;
  @media (max-width: 500px) {
    top: 0.4rem;
    right: 0.6rem;
  }
  @media (max-width: 450px) {
    width: 0.8rem;
    height: 0.8rem;
  }
`;

function Nav() {
  const location = useLocation();
  const { theme } = useTheme();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuth);
  const disPatch = useDispatch();

  const [search, setSearch] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 750 });

  function handleSearch(e) {
    if (e.key === "Enter") {
      setSearch("");
    }
  }

  function handleOnChange(e) {
    setSearch(() => e.target.value);
  }

  async function handlelogout() {
    try {
      await logout().unwrap();
      disPatch(clearUser());
      navigate("/login");
    } catch (err) {
      console.log("Login failed", err.stack);
    }
  }

  function handleNav() {
    if (location.pathname === "/home") {
      scrollToSection("about");
    } else {
      navigate("/home", { state: { scrollTo: "about" } });
    }
  }

  const customProps = { handleNav, isOpen, setIsOpen };

  return (
    <Container theme={theme}>
      <LogoContainer>
        <NavLink to="home" onClick={() => setIsOpen(!open)}>
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
              <Li theme={theme} onClick={handleNav}>
                About Us
              </Li>

              <StyledNavLink to="members">
                <Li theme={theme}>Members</Li>
              </StyledNavLink>

              {!isAuthenticated ? (
                <StyledNavLink to="login">
                  <Li theme={theme}>Login</Li>
                </StyledNavLink>
              ) : (
                <>
                  <StyledNavLink to="register">
                    <Li>Register Member</Li>
                  </StyledNavLink>
                  <StyledNavLink>
                    <Li>
                      <Btn onClick={handlelogout}>Logout</Btn>
                    </Li>
                  </StyledNavLink>
                </>
              )}
            </Ul>
            <ToggleLightMode />
          </>
        ) : (
          <CollapseNav {...customProps} />
        )}
      </NavListContainer>
    </Container>
  );
}

export default Nav;
