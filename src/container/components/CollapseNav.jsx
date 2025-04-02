import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { HiChevronDown } from 'react-icons/hi';
import { useTheme } from './ThemeContext';

const Ul = styled.ul`
  position: fixed;
  left: 100%;
  top: 0;
  width: 100%;
  min-height: 100vh;
  display: block;
  z-index: 98;
  margin-top: 9rem;
  background: ${(props) => props.theme.layoutBg};
  transition: all 0.8s;

  &.show-nav {
    left: 0;
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
  background: ${(props) => props.theme.fieldsetBg};
  color: #e3fafc;

  &:hover {
    background: ${(props) => props.theme.ulHover};
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
    top: 0.6rem;
  }
  &::after {
    top: -0.6rem;
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

const Dropdown = styled.ul`
  position: absolute;
  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  width: 10rem;
  top: 4rem;
  left: 2.4rem;
`;
const Dropdownlist = styled.li`
  list-style: none;
  width: 100%;
  margin: 0 auto 1rem;
  text-align: center;
  padding: 0.7rem 1.2rem;
  background: linear-gradient(to right, #343a40, #495057);
  color: #e3fafc;

  &:hover {
    background: linear-gradient(to right, #adb5bd, #495057);
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;

const DropDownArrow = styled(HiChevronDown)`
  transition: all 0.3s;

  &.arrow-right {
    transform: rotate(180deg);
  }
`;

function CollapseNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const { theme } = useTheme();

  function toggleOpenDropDown(menu) {
    if (menu === 'account') {
      setActiveMenu((prevMenu) => (prevMenu === menu ? null : menu));
    } else {
      setActiveMenu(null);
    }
  }
  return (
    <>
      <Bar
        onClick={() => setIsOpen(!isOpen)}
        className={isOpen ? 'active' : ''}
      ></Bar>
      <Ul className={isOpen ? 'show-nav' : ''} theme={theme}>
        <Li theme={theme} onClick={() => toggleOpenDropDown('about')}>
          About Us
        </Li>

        <Li theme={theme} onClick={() => toggleOpenDropDown('motto')}>
          Motto
        </Li>

        <Li
          theme={theme}
          onClick={() => toggleOpenDropDown('registered members')}
        >
          Registered Members
        </Li>
        <Li theme={theme}>
          <Btn
            onClick={() => toggleOpenDropDown('account')}
            className={activeMenu && 'show-menu'}
          >
            Account <DropDownArrow className={activeMenu && 'arrow-right'} />
          </Btn>

          <Dropdown open={activeMenu}>
            <StyledNavLink to="signup" onClick={() => setIsOpen(!isOpen)}>
              <Dropdownlist>Sign up</Dropdownlist>
            </StyledNavLink>
            <StyledNavLink to="login" onClick={() => setIsOpen(!isOpen)}>
              <Dropdownlist>Login</Dropdownlist>
            </StyledNavLink>
          </Dropdown>
        </Li>
      </Ul>
    </>
  );
}

export default CollapseNav;
