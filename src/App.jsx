import React, { useState } from 'react'
import Navbar from './components/Navbar'
import SearchPage from './pages/SearchPage'
import ComparePage from './pages/ComparePage'
import ErrorBoundary from './components/ErrorBoundary'
import { useDarkMode } from './hooks/useDarkMode'

function App() {
  const { isDark, toggle } = useDarkMode()
  const [activeTab, setActiveTab] = useState('search')

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
        <Navbar
          isDark={isDark}
          onToggleDark={toggle}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <main>
          {activeTab === 'search' ? <SearchPage /> : <ComparePage />}
        </main>

        <footer className="text-center py-8 text-xs text-zinc-400 dark:text-zinc-600 font-mono">
          Built with GitHub Public API · Rate limit: 60 req/hr unauthenticated
        </footer>
      </div>
    </ErrorBoundary>
  )
}

export default App
