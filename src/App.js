import React, { useState } from 'react';
import './App.css';
import Hero from './sections/Hero';
import Classifications from './sections/Classifications';
import Indexing from './sections/Indexing';
import Pipeline from './sections/Pipeline';
import Simulator from './sections/Simulator';
import Patterns from './sections/Patterns';
import Identity from './sections/Identity';
import Summary from './sections/Summary';

const sections = [
  { id: 'hero', label: 'Overview' },
  { id: 'classifications', label: 'Classifications' },
  { id: 'indexing', label: 'Index & Marking' },
  { id: 'pipeline', label: 'RAG Pipeline' },
  { id: 'simulator', label: 'Access Simulator' },
  { id: 'patterns', label: 'Patterns' },
  { id: 'identity', label: 'Identity & IdP' },
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
          <img src="/elastic-favicon.svg" alt="Elastic" width="24" height="24" />
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
      </nav>

      {/* Main content */}
      <main className="main-content" onScroll={handleScroll}>
        <Hero />
        <Classifications />
        <Indexing />
        <Pipeline />
        <Simulator />
        <Patterns />
        <Identity />
        <Summary />
      </main>
    </div>
  );
}

export default App;
