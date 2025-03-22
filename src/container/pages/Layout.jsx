import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Nav from '../components/Nav';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

// import HocWithNav from '../components/HocWithNav';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.main`
  flex: 1;
  background: #212529;
`;

function Layout({ isAuth }) {
  return (
    <Container>
      <Header />
      <Nav isAuth={isAuth} />

      <ContentWrapper>
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
