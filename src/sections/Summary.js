import React from 'react';

export default function Summary() {
  return (
    <section id="summary" className="section-summary">
      <div className="section-inner">
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: 'var(--light-teal)', letterSpacing: 4, fontWeight: 700, marginBottom: 16, fontFamily: "'Space Mono', monospace" }}>
            WHY IT MATTERS
          </div>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 8, lineHeight: 1.3 }}>
            RAG without classification enforcement<br />is an uncontrolled spillage vector
          </h2>
          <div style={{ width: 50, height: 3, background: 'var(--light-teal)', margin: '16px auto 0' }} />
        </div>

        <div className="grid-3">
          <div className="card">
            <h3 style={{ color: 'var(--light-poppy)' }}>Without Controls</h3>
            <div className="teal-rule" />
            <ul>
              <li>TS data leaked to UNCLASS users via LLM answers</li>
              <li>SCI compartment boundaries bypassed</li>
              <li>NOFORN material exposed to foreign partners</li>
              <li>No audit trail for AI-mediated access</li>
              <li>Spillage incidents require full damage assessment</li>
            </ul>
          </div>

          <div className="card">
            <h3 style={{ color: 'var(--light-teal)' }}>With Elasticsearch</h3>
            <div className="teal-rule" />
            <ul>
              <li>DLS enforces classification at every query</li>
              <li>FLS redacts sensitive source fields</li>
              <li>Compartment access is role-based and auditable</li>
              <li>Integrates with existing CAC/PKI/SAML</li>
              <li>Same controls for search, analytics, and RAG</li>
            </ul>
          </div>

          <div className="card">
            <h3 style={{ color: 'var(--yellow)' }}>Key Advantages</h3>
            <div className="teal-rule" />
            <ul>
              <li>Zero security logic in the AI application</li>
              <li>Leverage existing IdP and role infrastructure</li>
              <li>Works with any LLM or AI framework</li>
              <li>Real-time enforcement — no batch sync</li>
              <li>Proven at scale in national security environments</li>
            </ul>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 48, color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.6 }}>
          Elasticsearch RBAC/ABAC brings the same access control rigor to Gen AI<br />
          that national security organizations already apply to traditional search and analytics.
        </div>
      </div>
    </section>
  );
}
