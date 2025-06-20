import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useSticky from '../hooks/useSticky';
import SearchBox from './SearchBox';
import Logo from './Logo';
import RightNav from './RightNav';
import { useThemes } from './ThemesContext';

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

function Nav() {
  const location = useLocation();
  const { isSticky, nav } = useSticky();
  const { myTheme } = useThemes();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const name = location.pathname.slice(1);
    const segment = name.split('/');
    const path =
      segment.length === 2 && segment[0] === 'member'
        ? 'P.S.S.M.S.S | profile'
        : `P.S.S.M.S.S | ${name}`;
    document.title = location.pathname !== '/' ? path : 'P.S.S.M.S.S';

    return () => {
      document.title = 'P.S.S.M.S.S';
    };
  }, [location.pathname]);

  return (
    <Container className={isSticky ? 'sticky' : ''} theme={myTheme} ref={nav}>
      <Logo setIsOpen={setIsOpen} isOpen={isOpen} />
      <SearchBox />
      <RightNav isOpen={isOpen} setIsOpen={setIsOpen} />
    </Container>
  );
}

export default Nav;
