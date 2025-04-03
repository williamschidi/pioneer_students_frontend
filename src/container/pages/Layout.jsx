import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Nav from '../components/Nav';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTheme } from '../components/ThemeContext';
import useSticky from '../hooks/useSticky';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.main`
  flex: 1;
  background: ${(props) => props.theme.layoutBg};
`;

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 99;
`;

function Layout({ isAuth, setIsAuth }) {
  const { theme } = useTheme();
  const { isSticky, navRef } = useSticky();

  return (
    <Container>
      <HeaderContainer ref={navRef} className={isSticky ? 'sticky' : ''}>
        <Header />
        <Nav isAuth={isAuth} />
      </HeaderContainer>

      <ContentWrapper theme={theme}>
        <Outlet context={setIsAuth} />
      </ContentWrapper>
      <Footer />
    </Container>
  );
}

Layout.propTypes = {
  isAuth: PropTypes.bool,
  setIsAuth: PropTypes.func,
};

export default Layout;
