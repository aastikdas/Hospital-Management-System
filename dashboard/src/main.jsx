import { createContext, StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

export const Context = createContext({isAuthenticated:false})

const AppWrapper = ()=>{
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [admin, setAdmin] = useState({})
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(false)
  }

  return (
    <Context.Provider value={{isAuthenticated, setIsAuthenticated, admin, setAdmin, isDark, toggleTheme}}>
      <App/>
    </Context.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)
