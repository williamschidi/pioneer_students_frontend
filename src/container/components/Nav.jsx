import { NavLink, useLocation } from "react-router-dom";
import logo from "./../../assets/logo.jpeg";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

import CollapseNav from "./CollapseNav";

import PropTypes from "prop-types";
import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { useTheme } from "./ThemeContext";
import { Link } from "react-scroll";
import ToggleLightMode from "./ToggleLightMode";

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
  border-bottom: 0.1rem solid ${(props) => props.theme.navBg};
  ${StyledNavLink}.active & {
    // background: ${(props) => props.theme.navActiveBg};
    border-radius: 0.5rem;
    // box-shadow: 0.2rem 0.3rem 0.4rem rgba(0, 0, 0, 0.4);
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

const Dropdown = styled.ul`
  position: absolute;
  top: 5rem;
  right: 0;
  list-style: none;
  display: ${(props) => (props.active ? "flex" : "none")};
  flex-direction: column;
  justify-content: space-between;
  width: 8rem;
  height: 6rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  background: ${(props) => props.theme.navBg};
  opacity: 0.8;
`;

const DropdownItem = styled.li`
  padding: 0.8rem 0;
  color: #e3fafc;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  border: 0.2rem solid ${(props) => props.theme.navBg};
  border-radius: 0.5rem;
  &:last-child {
    margin-bottom: 0rem;
  }

  &:hover {
    border: 0.2rem solid #e3fafc;
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

function Nav({ isAuth }) {
  const location = useLocation();
  const { theme } = useTheme();
  const [search, setSearch] = useState();
  const [active, setActive] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 750 });

  function handleSearch(e) {
    if (e.key === "Enter") {
      setSearch("");
    }
  }

  function handleOnChange(e) {
    setSearch(() => e.target.value);
  }

  function toggleClass(e) {
    if (e.target === e.currentTarget) {
      setActive(!active);
    }
  }

  return (
    <Container theme={theme}>
      <LogoContainer>
        <NavLink to="home">
          <Img src={logo} alt="logo" />
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
              {location.pathname === "/home" && (
                <Li theme={theme} onClick={() => setActive(false)}>
                  <Link to="about" smooth={true} duration={500} offset={-60}>
                    About Us
                  </Link>
                </Li>
              )}

              <StyledNavLink to="members">
                <Li theme={theme} onClick={() => setActive(false)}>
                  Members
                </Li>
              </StyledNavLink>

              {!isAuth ? (
                <Li theme={theme} onClick={toggleClass}>
                  Account
                  <Dropdown theme={theme} active={active}>
                    <StyledNavLink to="signup">
                      <DropdownItem theme={theme}>Sign up</DropdownItem>
                    </StyledNavLink>
                    <StyledNavLink to="login">
                      <DropdownItem theme={theme}>Login</DropdownItem>
                    </StyledNavLink>
                  </Dropdown>
                </Li>
              ) : (
                <StyledNavLink to="member">
                  <Li>Register Member</Li>
                </StyledNavLink>
              )}
            </Ul>
            <ToggleLightMode />
          </>
        ) : (
          <CollapseNav />
        )}
      </NavListContainer>
    </Container>
  );
}

Nav.propTypes = {
  isAuth: PropTypes.bool,
};

export default Nav;
