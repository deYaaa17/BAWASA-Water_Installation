import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './css/index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { ReportProvider } from './context/ReportContext.jsx';
import { InstallationProvider } from './context/InstallationContext.jsx';
import { BillingProvider } from './context/BillingContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ReportProvider>
            <InstallationProvider>
              <BillingProvider>
                <NotificationProvider>
                  <App />
                </NotificationProvider>
              </BillingProvider>
            </InstallationProvider>
          </ReportProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);