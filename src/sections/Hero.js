import React from 'react';

export default function Hero() {
  return (
    <section id="hero" className="section-hero">
      <div className="section-inner">
        <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
          <span className="cls-badge u">U</span>
          <span className="cls-badge cui">CUI</span>
          <span className="cls-badge c">C</span>
          <span className="cls-badge s">S</span>
          <span className="cls-badge ts">TS</span>
          <span className="cls-badge sci">SCI</span>
          <span className="cls-badge tk">TK</span>
          <span className="cls-badge hcs">HCS</span>
          <span className="cls-badge nf">NOFORN</span>
        </div>

        <h1 style={{ fontSize: 44, fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>
          RBAC / ABAC for Classified RAG
        </h1>
        <div style={{ width: 50, height: 3, background: 'var(--light-teal)', marginBottom: 16 }} />
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.75)', maxWidth: 700, lineHeight: 1.6, marginBottom: 40 }}>
          Enforcing IC/DoD classification markings in Elasticsearch to secure
          Gen AI retrieval-augmented generation pipelines. Document-Level Security
          and Field-Level Security ensure the LLM only sees what clearance allows.
        </p>

        <div className="grid-4">
          <div className="stat-card" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div className="stat-number" style={{ color: 'var(--light-teal)' }}>DLS</div>
            <div className="stat-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Document-Level Security filters by classification</div>
          </div>
          <div className="stat-card" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div className="stat-number" style={{ color: 'var(--light-teal)' }}>FLS</div>
            <div className="stat-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Field-Level Security redacts sensitive fields</div>
          </div>
          <div className="stat-card" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div className="stat-number" style={{ color: 'var(--light-teal)' }}>0</div>
            <div className="stat-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Lines of security code in your AI application</div>
          </div>
          <div className="stat-card" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div className="stat-number" style={{ color: 'var(--light-teal)' }}>100%</div>
            <div className="stat-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Queries filtered in real-time at retrieval</div>
          </div>
        </div>
      </div>
    </section>
  );
}
