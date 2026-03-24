/**
 * @fileoverview Application Bootstrapper for the Kusharivalables Frontend.
 * Initializes the React Root, attaches top-level Context Providers (like Google OAuth),
 * and renders the primary <App /> component into the DOM.
 * 
 * @author Kusharivalables Development Team
 * @copyright Copyright (c) 2026 Kusharivalables. All rights reserved.
 * @version 1.0.0
 * 
 * @module FrontendEntryPoint
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  'your-google-client-id.apps.googleusercontent.com';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
