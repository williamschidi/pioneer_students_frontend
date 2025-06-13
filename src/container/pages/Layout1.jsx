import styled from 'styled-components';
import Nav from '../components/Nav';
import { Link, Outlet, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import useSticky from '../hooks/useSticky';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { useThemes } from '../components/ThemesContext';
import { useMediaQuery } from 'react-responsive';
import { ToastContainer } from 'react-toastify';

const images = [
  '/images/bg2.webp',
  '/images/bg11.webp',
  '/images/bg4.webp',
  '/images/bg-01.webp',
  '/images/bg10.webp',
  '/images/bg7.webp',
];

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
`;

const ContentWrapper = styled.main`
  flex: 1;
  transition: background 1s ease;
  z-index: 10;
`;

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 99;
`;

const BgLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${(props) => (props.home === 'true' ? '92vh' : '100vh')};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 3s ease-in-out;
  z-index: 1;
  @media (max-width: 600px) {
    background-position: top;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${(props) => (props.home === 'true' ? '98vh' : '100vh')};

  background-image: linear-gradient(
    to right,
    rgba(44, 62, 148, 0.6),
    rgba(244, 180, 0, 0.3)
  );

  z-index: 2;

  @media (max-width: 600px) {
    background-image: linear-gradient(
      to right,
      rgba(44, 62, 148, 0.3),
      rgba(244, 180, 0, 0.2)
    );
  }
`;

const Wraper = styled.div`
  box-sizing: border-box;
  height: 90vh;
  max-width: 75rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 0 5rem 5rem;

  @media (max-width: 750px) {
    max-width: 55rem;
  }
  @media (max-width: 600px) {
    max-width: 50rem;
    justify-content: center;
    align-items: center;
    padding: 2rem 0 0 0;
  }
`;

const H1 = styled.p`
  color: #f1f3f5;
  font-size: 2.4rem;
  margin-bottom: 1rem;
  font-family: 'Ogg';
  font-weight: bold;
  font-style: italic;
  @media (max-width: 750px) {
    font-size: 1.8rem;
  }
  @media (max-width: 600px) {
    font-size: 1.4rem;
    margin-bottom: 0.1rem;
  }
  @media (max-width: 450px) {
    font-size: 1.2rem;
  }
`;

const P = styled.p`
  font-size: 1rem;
  font-weight: 300;
  font-family: playfair;
  margin-bottom: 2rem;
  max-width: 60rem;
  color: #fff;
  @media (max-width: 750px) {
    font-size: 0.9rem;
    max-width: 70rem;
  }
  @media (max-width: 600px) {
    font-size: 0.8rem;
    margin-bottom: 1.4rem;
    max-width: 60rem;
  }
  @media (max-width: 400px) {
    font-size: 0.8rem;
    max-width: 40rem;
  }
`;

const StyleLink = styled(Link)`
  color: ${(props) => props.theme.textColor1};
  padding: 1rem 2rem;
  text-decoration: none;
  font-weight: 600;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  &.join {
    background: ${(props) => props.theme.secondary};
  }
  &:hover {
    background: ${(props) => props.theme.textColor1};
    color: ${(props) => props.theme.textColor};
    transform: scale(1.05);
  }
  @media (max-width: 750px) {
    padding: 1rem 2rem;
  }

  @media (max-width: 600px) {
    padding: 0.8rem 1.4rem;
    font-size: 0.8rem;
  }
  @media (max-width: 400px) {
    padding: 0.5rem 0.8rem;
  }
`;

const ActionCotainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

function Layout1() {
  const { isSticky, navRef } = useSticky();
  const location = useLocation();
  const { myTheme } = useThemes();
  const isMobile = useMediaQuery({ maxWidth: 600 });

  const [index, setIndex] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [bg1, setBg1] = useState(images[0]);
  const [bg2, setBg2] = useState(images[1]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % images.length;
      const nextImage = images[nextIndex];

      if (toggle) {
        setBg2(nextImage);
      } else {
        setBg1(nextImage);
      }
      setToggle(!toggle);
      setIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [index, toggle]);

  const isHome = location.pathname === '/' || location.pathname === '/home';

  return (
    <Container>
      <HeaderContainer ref={navRef} className={isSticky ? 'sticky' : ''}>
        {/* <Header /> */}
        <Nav />
        <ToastContainer position="top-center" autoClose={5000} />
      </HeaderContainer>

      <BgLayer
        style={{ backgroundImage: `url(${bg1})` }}
        visible={toggle}
        home={location.pathname === '/home'}
      />
      <BgLayer
        style={{ backgroundImage: `url(${bg2})` }}
        visible={!toggle}
        home={location.pathname === '/home'}
      />
      <Overlay home={location.pathname === '/home'} />

      <ContentWrapper isHome={isHome}>
        {isHome ? (
          <Wraper>
            <H1>
              Reconnect with your Pioneer {isMobile ? '' : <br />}
              Classmates
            </H1>

            <P>
              Meet up share memories and stay updated on events and reunions
            </P>
            <ActionCotainer>
              <StyleLink to="" className="join" theme={myTheme}>
                Join the community
              </StyleLink>
              <StyleLink to="login" theme={myTheme}>
                Login
              </StyleLink>
            </ActionCotainer>
          </Wraper>
        ) : (
          ''
        )}
        <Outlet />
      </ContentWrapper>

      <Footer />
    </Container>
  );
}

Layout1.propTypes = {
  isAuth: PropTypes.bool,
  setIsAuth: PropTypes.func,
};

export default Layout1;
