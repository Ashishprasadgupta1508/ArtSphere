import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initFirebaseAnalytics, onAuthStateChangedListener } from './firebase'
import { useAuthStore } from './store/useAuthStore'

const root = createRoot(document.getElementById('root')!)
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)

initFirebaseAnalytics().catch(() => {
  // Analytics initialization failed or is unsupported in this environment.
});

if (typeof window !== 'undefined') {
  onAuthStateChangedListener((user) => {
    useAuthStore.getState().setCurrentUser(user);
  });
}
