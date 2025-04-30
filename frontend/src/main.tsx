import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import './lib/i18n.ts';
import i18next from 'i18next'
import { ClerkProvider } from '@clerk/clerk-react'
import { Provider } from 'react-redux'
import store from './store.ts'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}
createRoot(document.getElementById('root')!).render(
  <ClerkProvider  publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
  <Provider store={store}>
  <BrowserRouter>
  <I18nextProvider i18n={i18next}>    
    <App />
    </I18nextProvider>
  </BrowserRouter>
  </Provider>
  </ClerkProvider>
)
