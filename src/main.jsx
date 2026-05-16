import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextShare from './Common/ContextAPI/ContextShare.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import AuthContext from './Common/ContextAPI/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ContextShare>
      <GoogleOAuthProvider clientId="906036637121-9ubst2ojele9qk6h0auft0akllcrl48n.apps.googleusercontent.com"> 
        <AuthContext>   <App />
        </AuthContext>
        </GoogleOAuthProvider>

    </ContextShare>
    </BrowserRouter>
  </StrictMode>
)
