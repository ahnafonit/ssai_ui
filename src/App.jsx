import { useState, useEffect } from 'react'
import AIAgentManagement from './AIAgentManagement'
import OnitCRM from './OnitCRM'
import AIDashboard from './AIDashboard'
import RLHFCRMInterface from './RLHFCRMInterface'
import Microservices from './Microservices'
import DirectorDashboard from './DirectorDashboard'
import ManagerDashboard from './ManagerDashboard'
import TeamLeadDashboard from './TeamLeadDashboard'
import LoginDashboard from './LoginDashboard'
import CallAnalysis from './CallAnalysis'
import './index.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeView, setActiveView] = useState('agent') // 'agent', 'crm', 'analytics', 'rlhf', 'microservices', 'director', or 'manager'
  const [darkMode, setDarkMode] = useState(true)

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setActiveView('agent')
  }

  const handleViewChange = (view) => {
    setActiveView(view)
  }

  if (!isAuthenticated) {
    return <LoginDashboard onLoginSuccess={handleLoginSuccess} />
  }

  if (activeView === 'crm') {
    return <OnitCRM onViewChange={handleViewChange} onLogout={handleLogout} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
  }

  if (activeView === 'analytics') {
    return <AIDashboard onViewChange={handleViewChange} onLogout={handleLogout} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
  }

  if (activeView === 'rlhf') {
    return <RLHFCRMInterface onViewChange={handleViewChange} onLogout={handleLogout} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
  }

  if (activeView === 'microservices') {
    return <Microservices onViewChange={handleViewChange} onLogout={handleLogout} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
  }

  if (activeView === 'director') {
    return <DirectorDashboard onViewChange={handleViewChange} onLogout={handleLogout} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
  }

  if (activeView === 'manager') {
    return <ManagerDashboard onViewChange={handleViewChange} onLogout={handleLogout} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
  }

  if (activeView === 'teamlead') {
    return <TeamLeadDashboard onViewChange={handleViewChange} onLogout={handleLogout} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
  }

  if (activeView === 'callanalysis') {
    return <CallAnalysis onViewChange={handleViewChange} onLogout={handleLogout} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
  }

  return <AIAgentManagement onViewChange={handleViewChange} onLogout={handleLogout} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
}

export default App
