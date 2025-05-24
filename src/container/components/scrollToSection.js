import { scroller } from "react-scroll";

export function scrollToSection(id) {
  scroller.scrollTo(id, {
    duration: 500,
    smooth: true,
    offset: -60,
  });
}
