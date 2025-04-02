import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './container/components/redux/store.js';
import { ThemeProviderWrapper } from './container/components/ThemeContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProviderWrapper>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProviderWrapper>
  </React.StrictMode>,
);
