import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./container/pages/Login";
import Register from "./container/pages/Register";
import Signup from "./container/pages/Signup";
import Home from "./container/pages/Home.jsx";
import Layout from "./container/pages/Layout.jsx";
import Profile from "./container/pages/Profile.jsx";
import PageNotFount from "./container/pages/PageNotFount.jsx";
import Members from "./container/pages/Members.jsx";

// import About from "./container/components/About.jsx";
import Motto from "./container/components/Motto.jsx";
import ProtectedRoute from "./container/components/ProtectedRoute.jsx";
import { useState } from "react";

const GlobalStyle = createGlobalStyle`
    *{
        margin:0;
        padding: 0;
        box-sizing: border-box;
    }


  @font-face {
    font-family: 'Ogg';
    src: url('/fonts/Ogg-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Ogg';
    src: url('/fonts/Ogg-Italic.ttf') format('truetype');
    font-weight: normal;
    font-style: italic;
  }

 body{
        font-family:tahoma ,'Ogg', serif;
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
        <Route
          path="/"
          element={<Layout isAuth={isAuth} setIsAuth={setIsAuth} />}
        >
          <Route index element={<Home />} />

          <Route path="login" element={<Login />} />
          <Route
            path="member"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Register />
              </ProtectedRoute>
            }
          />

          <Route path="signup" element={<Signup />} />
          <Route path="home" element={<Home />} />

          <Route path="members" element={<Members />} />
          <Route path="members/:id" element={<Profile />} />
          {/* <Route path="about" element={<About />} /> */}
          <Route path="motto" element={<Motto />} />
        </Route>
        <Route path="*" element={<PageNotFount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
