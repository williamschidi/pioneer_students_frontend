import { useLocation } from "react-router-dom";
import About from "../components/About";

import { useEffect } from "react";

import { scrollToSection } from "../components/scrollToSection";

function Home() {
  const location = useLocation();
  useEffect(() => {
    if (location.state?.scrollTo) {
      scrollToSection(location.state.scrollTo);

      window.history.replaceState({}, document.title);
    }
  }, []);
  return <About />;
}

export default Home;
