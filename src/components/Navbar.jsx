import React from 'react'

const Navbar = ({ isDark, onToggleDark, activeTab, onTabChange }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white text-sm font-bold font-mono">
            {'</>'}
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            DevAnalyzer
          </span>
        </div>

        {/* Tabs */}
        <nav className="hidden sm:flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl p-1">
          <TabButton
            active={activeTab === 'search'}
            onClick={() => onTabChange('search')}
          >
            Search
          </TabButton>
          <TabButton
            active={activeTab === 'compare'}
            onClick={() => onTabChange('compare')}
          >
            Compare
          </TabButton>
        </nav>

        {/* Dark mode toggle */}
        <button
          onClick={onToggleDark}
          aria-label="Toggle dark mode"
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200 text-lg"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Mobile tabs */}
      <div className="sm:hidden flex border-t border-zinc-200 dark:border-zinc-800">
        <MobileTab active={activeTab === 'search'} onClick={() => onTabChange('search')}>
          Search
        </MobileTab>
        <MobileTab active={activeTab === 'compare'} onClick={() => onTabChange('compare')}>
          Compare
        </MobileTab>
      </div>
    </header>
  )
}

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
      active
        ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm'
        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
    }`}
  >
    {children}
  </button>
)

const MobileTab = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`flex-1 py-2.5 text-sm font-medium transition-colors duration-200 ${
      active
        ? 'text-brand-600 border-b-2 border-brand-600'
        : 'text-zinc-500 dark:text-zinc-400'
    }`}
  >
    {children}
  </button>
)

export default Navbar
