import styled from "styled-components";
import Footer from "../components/Footer";
// import Header from "../components/Header";
import Nav from "../components/Nav";
import { Outlet, useLocation } from "react-router-dom";
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

const Wraper = styled.div`
  position: fixed;
  top: 5rem;
  left: 25%;
  max-width: 50rem;
  opacity: 0.7;
  padding: 1.5rem;
  border-radius: 1rem;
  margin: 10rem auto;
  @media (max-width: 750px) {
    max-width: 40rem;
  }
`;

const H1 = styled.p`
  color: #f1f3f5;
  text-align: center;
  font-size: 2.4rem;
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
      <BgLayer style={{ backgroundImage: `url(${bg1})` }} visible={toggle} />
      <BgLayer style={{ backgroundImage: `url(${bg2})` }} visible={!toggle} />
      <Overlay />
      <ContentWrapper>
        {location.pathname === "/" || location.pathname === "/home" ? (
          <Wraper>
            <H1>
              Pioneer Students <br /> of <br /> St. Mark&apos;s Secondary School
              Emene, Enugu.
            </H1>
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
