import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { HiChevronDown } from 'react-icons/hi';

const Ul = styled.ul`
  position: fixed;
  left: 100%;
  top: 0;
  width: 100%;
  min-height: 100vh;
  display: block;
  z-index: 98;
  margin-top: 9rem;
  background-color: #212529;
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
  background: linear-gradient(to right, #212529, #495057);
  color: #e3fafc;

  &:hover {
    background: linear-gradient(to right, #343a40, #868e96);
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
  background-color: #212529;
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
  const [openDropDown, setOpenDropDown] = useState(false);
  return (
    <>
      <Bar
        onClick={() => setIsOpen(!isOpen)}
        className={isOpen ? 'active' : ''}
      ></Bar>
      <Ul className={isOpen ? 'show-nav' : ''}>
        <Li>About Us</Li>

        <Li>Motto</Li>

        <Li>Registered Members</Li>
        <Li>
          <Btn
            onClick={() => setOpenDropDown(!openDropDown)}
            className={openDropDown && 'show-menu'}
          >
            Account <DropDownArrow className={openDropDown && 'arrow-right'} />
          </Btn>

          <Dropdown open={openDropDown}>
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
