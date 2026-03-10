import React, { useState } from 'react';
import './App.css';
import Hero from './sections/Hero';
import Classifications from './sections/Classifications';
import Pipeline from './sections/Pipeline';
import Simulator from './sections/Simulator';
import Patterns from './sections/Patterns';
import Summary from './sections/Summary';

const sections = [
  { id: 'hero', label: 'Overview' },
  { id: 'classifications', label: 'Classifications' },
  { id: 'pipeline', label: 'RAG Pipeline' },
  { id: 'simulator', label: 'Access Simulator' },
  { id: 'patterns', label: 'Patterns' },
  { id: 'summary', label: 'Summary' },
];

function App() {
  const [active, setActive] = useState('hero');

  const handleScroll = (e) => {
    const container = e.target;
    for (const s of [...sections].reverse()) {
      const el = document.getElementById(s.id);
      if (el && el.offsetTop - container.scrollTop < 300) {
        setActive(s.id);
        break;
      }
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-layout">
      {/* Classification banner */}
      <div className="top-banner">
        <span className="demo-label">DEMONSTRATION PURPOSES ONLY</span>
        ALL CLASSIFICATION MARKINGS ARE FICTIONAL — NO CLASSIFIED INFORMATION IS CONTAINED HEREIN
      </div>

      {/* Sidebar nav */}
      <nav className="sidebar">
        <div className="sidebar-logo">
          <svg width="24" height="24" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#FEC514"/><circle cx="32" cy="32" r="20" fill="#48EFCF"/><circle cx="32" cy="32" r="10" fill="#F04E98"/></svg>
          <span>elastic</span>
        </div>
        <div className="sidebar-title">RBAC/ABAC<br/>for Classified RAG</div>
        <div className="sidebar-links">
          {sections.map((s) => (
            <button
              key={s.id}
              className={`sidebar-link ${active === s.id ? 'active' : ''}`}
              onClick={() => scrollTo(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="sidebar-footer">
          <span className="cls-badge ts" style={{ fontSize: 9 }}>TS/SCI</span>
          <span style={{ fontSize: 11, color: 'var(--ink)', marginLeft: 6 }}>Demo Environment</span>
        </div>
      </nav>

      {/* Main content */}
      <main className="main-content" onScroll={handleScroll}>
        <Hero />
        <Classifications />
        <Pipeline />
        <Simulator />
        <Patterns />
        <Summary />
      </main>

      {/* Bottom banner */}
      <div className="bottom-banner">TOP SECRET // SCI // NOFORN</div>
    </div>
  );
}

export default App;
