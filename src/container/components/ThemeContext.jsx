import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

const darkMode = {
  color: '#e3fafc',
  navBg: '#212529',
  navActiveBg: 'linear-gradient(to right, #212529, #495057)',
  navBorderBottom: '1px solid  #e3fafc',
  layoutBg: 'linear-gradient(to right, #212529, #343a40)',
  fieldsetBg: 'linear-gradient(to right, #212529, #495057)',
  btnHoverBg: 'linear-gradient(to right, #212529, #495057)',
  footerBg: 'linear-gradient(to right, #fff, #e7f5ff)',
  textShadow: '0.3rem 0.4rem 0.5rem rgba(255, 255, 255, 0.5)',
  hoverBg: 'linear-gradient(to right, #212529, #495057)',
  ulHover: 'linear-gradient(to right, #343a40, #868e96)',
};

const lightMode = {
  hoverBg: 'linear-gradient(to right, #ced4da, #868e96)',
  color: '#212529',
  navBg: 'linear-gradient(to right, #a5d8ff, #4dabf7)',
  navActiveBg: 'linear-gradient(to right, #4dabf7, #339af0);',
  navBorderBottom: '1px solid #212529',
  layoutBg: '#e7f5ff',
  fieldsetBg: 'linear-gradient(to right,#339af0, #1c7ed6 )',
  btnHoverBg: 'linear-gradient(to right, #228be6, #1971c2)',
  footerBg: 'linear-gradient(to right, #a5d8ff, #4dabf7)',
  textShadow: ' 0.3rem 0.4rem 0.5rem rgba(0, 0, 0, 0.5)',
  ulHover: 'linear-gradient(to right, #4dabf7, #74c0fc)',
};

const ThemeContext = createContext();

export function ThemeProviderWrapper({ children }) {
  const storedTheme = Cookies.get('theme') || 'light';
  const [theme, setTheme] = useState(
    storedTheme === 'light' ? lightMode : darkMode,
  );

  const [mode, setMode] = useState(storedTheme);

  useEffect(() => {
    Cookies.set('theme', mode, {
      expires: 365,
    });
  }, [mode]);

  function toggleMode() {
    setTheme(theme === lightMode ? darkMode : lightMode);
    setMode(mode === 'light' ? 'dark' : 'light');
    console.log(theme);
  }

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProviderWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTheme = () => useContext(ThemeContext);
