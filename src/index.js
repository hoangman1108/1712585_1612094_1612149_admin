// scroll bar
import 'simplebar/src/simplebar.css';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContenxt';
import { DashboardProvider } from './contexts/DashboardContext';
import App from './App';

// ----------------------------------------------------------------------

ReactDOM.render(
  <AuthProvider>
    <DashboardProvider>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </DashboardProvider>
  </AuthProvider>,
  document.getElementById('root')
);

