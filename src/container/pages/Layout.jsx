import styled from "styled-components";
import Footer from "../components/Footer";
// import Header from "../components/Header";
import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import useSticky from "../hooks/useSticky";
import { useEffect, useState } from "react";

const images = [
  "/images/bg1.webp",
  "/images/bg2.webp",
  "/images/bg3.webp",
  "/images/bg4.webp",
  "/images/bg5.webp",
  "/images/bg-01.webp",
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  backgroung-position: center;
  background-repeat: no-repeat;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 3s ease-in-out;
  z-index: 1;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.5;
  z-index: 2;
`;

function Layout({ isAuth, setIsAuth }) {
  const { isSticky, navRef } = useSticky();

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
        <Nav isAuth={isAuth} />
      </HeaderContainer>
      <BgLayer style={{ backgroundImage: `url(${bg1})` }} visible={toggle} />
      <BgLayer style={{ backgroundImage: `url(${bg2})` }} visible={!toggle} />
      <Overlay />
      <ContentWrapper>
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
