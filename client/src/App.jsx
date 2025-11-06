import React, { useState } from 'react'
import WeatherModule from './components/WeatherModule'
import CurrencyConverter from './components/CurrencyConverter'
import QuoteGenerator from './components/QuoteGenerator'

export default function App() {
  const [activeTab, setActiveTab] = useState('Weather')

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>InfoHub</h1>
        <nav className="tabs" role="tablist" aria-label="InfoHub modules">
          {['Weather', 'Currency', 'Quotes'].map(t => (
            <button
              key={t}
              role="tab"
              aria-selected={activeTab === t}
              className={`tab-btn ${activeTab === t ? 'active' : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </nav>
      </header>

      <main className="app-main">
        {activeTab === 'Weather' && <WeatherModule />}
        {activeTab === 'Currency' && <CurrencyConverter />}
        {activeTab === 'Quotes' && <QuoteGenerator />}
      </main>

      <footer className="app-footer">
        <small>InfoHub — ByteXL Challenge</small>
      </footer>
    </div>
  )
}
