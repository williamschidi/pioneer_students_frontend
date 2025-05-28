import styled from "styled-components";
import Footer from "../components/Footer";

import Nav from "../components/Nav";
import { Link, Outlet, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useSticky from "../hooks/useSticky";
import { useEffect, useState } from "react";

const images = [
  "/images/bg2.webp",
  "/images/bg11.webp",
  "/images/bg4.webp",
  "/images/bg-01.webp",
  "/images/bg10.webp",
  "/images/bg7.webp",
];

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${(props) => (props.home === "true" ? "92vh" : "100vh")};
  background-size: cover;
  backgroung-position: center;
  background-repeat: no-repeat;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 3s ease-in-out;
  z-index: 1;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${(props) => (props.home === "true" ? "92vh" : "100vh")};
  background-color: #000;
  opacity: 0.5;
  z-index: 2;
`;

const Wraper = styled.div`
  height: 88vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 2rem;

  @media (max-width: 750px) {
    max-width: 60rem;
    height: 70vh;
  }
`;

const H1 = styled.p`
  color: #f1f3f5;
  text-align: center;
  font-size: 3rem;
  margin-bottom: 1rem;
  font-family: "Ogg";
  font-weight: bold;
  font-style: italic;
  @media (max-width: 750px) {
    font-size: 1.8rem;
  }
  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
  @media (max-width: 450px) {
    font-size: 1.2rem;
  }
`;

const P = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  margin-bottom: 2rem;
  max-width: 60rem;
  color: #fff;
  @media (max-width: 750px) {
    font-size: 1rem;
    max-width: 70rem;
  }
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const StyleLink = styled(Link)`
  background: #ffffff;
  color: #212529;
  padding: 1.5rem 3rem;
  text-decoration: none;
  font-weight: 600;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  &:hover {
    background: #e0e0e0;
    transform: scale(1.05);
  }
  @media (max-width: 750px) {
    padding: 1rem 2rem;
  }

  @media (max-width: 600px) {
    padding: 0.8rem 1.4rem;
    font-size: 0.8rem;
  }
`;

function Layout() {
  const { isSticky, navRef } = useSticky();
  const location = useLocation();

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

  return (
    <Container>
      <HeaderContainer ref={navRef} className={isSticky ? "sticky" : ""}>
        {/* <Header /> */}
        <Nav />
      </HeaderContainer>

      <BgLayer
        style={{ backgroundImage: `url(${bg1})` }}
        visible={toggle}
        home={location.pathname === "/home"}
      />
      <BgLayer
        style={{ backgroundImage: `url(${bg2})` }}
        visible={!toggle}
        home={location.pathname === "/home"}
      />
      <Overlay home={location.pathname === "/home"} />
      <ContentWrapper>
        {location.pathname === "/" || location.pathname === "/home" ? (
          <Wraper>
            <H1>Welcome, Pioneers of St Mark&apos;s!</H1>
            <P>
              Reconnect with fellow pioneer students, share memories, and stay
              updated on event and reunions.
            </P>
            <StyleLink to="">Join the community</StyleLink>
          </Wraper>
        ) : (
          ""
        )}
        <Outlet />
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
