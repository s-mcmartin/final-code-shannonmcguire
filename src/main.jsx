import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { store } from './app/store';

import './index.css';
import App from './App';
import About from './routes/public/About';
import Home from './routes/public/Home';
import Projects from './routes/public/Projects';
import Contact from './routes/public/Contact';
import Login from './routes/public/Login';

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
