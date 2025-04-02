import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Nav from '../components/Nav';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTheme } from '../components/ThemeContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.main`
  flex: 1;

  background: ${(props) => props.theme.layoutBg};
`;

function Layout({ isAuth }) {
  const { theme } = useTheme();

  return (
    <Container>
      <Header />
      <Nav isAuth={isAuth} />

      <ContentWrapper theme={theme}>
        <Outlet />
      </ContentWrapper>
      <Footer />
    </Container>
  );
}

Layout.propTypes = {
  isAuth: PropTypes.bool,
};

export default Layout;
