
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add theme-related code
document.documentElement.classList.add('light')

createRoot(document.getElementById("root")!).render(<App />);
