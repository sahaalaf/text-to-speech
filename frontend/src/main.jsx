import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="996970118720-bl0sn92ir8brk72pcmmligr2smv8gq3b.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>;
  </StrictMode>,
)
