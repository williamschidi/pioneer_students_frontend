import { createGlobalStyle } from 'styled-components';
import Login from './container/pages/Login';
import Register from './container/pages/Register';
import Signup from './container/pages/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './container/pages/Layout.jsx';
import PageNotFount from './container/pages/PageNotFount.jsx';
import About from './container/components/About.jsx';
import Motto from './container/components/Motto.jsx';
import ProtectedRoute from './container/components/ProtectedRoute.jsx';
import { useState } from 'react';
import Members from './container/pages/Members.jsx';

const GlobalStyle = createGlobalStyle`
    *{
        margin:0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        font-family:tahoma;
        width: 100%;
        max-width: 140rem;
    }

   
`;

function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <BrowserRouter>
      <GlobalStyle />

      <Routes>
        <Route path="/" element={<Layout isAuth={isAuth} />}>
          <Route index element={<Login setIsAuth={setIsAuth} />} />

          <Route path="login" element={<Login setIsAuth={setIsAuth} />} />
          <Route
            path="member"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Register />
              </ProtectedRoute>
            }
          />

          <Route path="signup" element={<Signup />} />

          <Route path="members" element={<Members />} />
          <Route path="about" element={<About />} />
          <Route path="motto" element={<Motto />} />
        </Route>
        <Route path="*" element={<PageNotFount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
