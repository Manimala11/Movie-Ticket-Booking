import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CartProvider from './Context/CartProvider.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const clientId = "986833560783-bamkkfa3459geed1nhhj8653gqrdjfip.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <CartProvider>
        <App />
      </CartProvider>
    </GoogleOAuthProvider>
    
  </StrictMode>,
)
