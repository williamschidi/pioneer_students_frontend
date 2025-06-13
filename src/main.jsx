import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './container/components/redux/store.js';
import 'react-toastify/dist/ReactToastify.css';

import { ThemesContextWrapper } from './container/components/ThemesContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemesContextWrapper>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemesContextWrapper>
  </React.StrictMode>
);
