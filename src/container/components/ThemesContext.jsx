import PropTypes from "prop-types";
import { createContext, useContext } from "react";


const myTheme = {
  primary: "#2c3e94",
  secondary: "#f4b400",
  textColor: "#212529",
  textColor1: "#e3fafc"
}

const ThemeContext = createContext();

export function ThemesContextWrapper({ children }) {
  return (
    <ThemeContext.Provider value={{ myTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}


ThemesContextWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}


export const useThemes = () => useContext(ThemeContext);