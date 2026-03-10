import React from 'react';

export default function WhyItMatters() {
  return (
    <div className="slide slide-blue">
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', textAlign: 'center' }}>

        <div style={{ fontSize: 16, color: 'var(--light-teal)', letterSpacing: 3, fontWeight: 700, marginBottom: 20 }}>
          WHY IT MATTERS
        </div>

        <div style={{ fontSize: 42, fontWeight: 800, color: '#fff', marginBottom: 12, lineHeight: 1.3, maxWidth: 900 }}>
          RAG without classification enforcement is an uncontrolled spillage vector
        </div>

        <div style={{ width: 60, height: 3, background: 'var(--light-teal)', margin: '16px auto 30px' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, maxWidth: 1000, width: '100%' }}>
          <div className="card" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', textAlign: 'left' }}>
            <h3 style={{ color: 'var(--light-poppy)' }}>Without Controls</h3>
            <div className="teal-rule" />
            <ul style={{ paddingLeft: 16 }}>
              <li style={{ color: 'rgba(255,255,255,0.7)' }}>TS data leaked to UNCLASS users via LLM answers</li>
              <li style={{ color: 'rgba(255,255,255,0.7)' }}>SCI compartment boundaries bypassed</li>
              <li style={{ color: 'rgba(255,255,255,0.7)' }}>NOFORN material exposed to foreign partners</li>
              <li style={{ color: 'rgba(255,255,255,0.7)' }}>No audit trail for AI-mediated access</li>
            </ul>
          </div>

          <div className="card" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', textAlign: 'left' }}>
            <h3 style={{ color: 'var(--light-teal)' }}>With Elasticsearch</h3>
            <div className="teal-rule" />
            <ul style={{ paddingLeft: 16 }}>
              <li style={{ color: 'rgba(255,255,255,0.7)' }}>DLS enforces classification at query time</li>
              <li style={{ color: 'rgba(255,255,255,0.7)' }}>FLS redacts sensitive fields</li>
              <li style={{ color: 'rgba(255,255,255,0.7)' }}>Compartment access is role-based</li>
              <li style={{ color: 'rgba(255,255,255,0.7)' }}>Full audit logging of every retrieval</li>
            </ul>
          </div>

          <div className="card" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', textAlign: 'left' }}>
            <h3 style={{ color: 'var(--yellow)' }}>Key Advantage</h3>
            <div className="teal-rule" />
            <ul style={{ paddingLeft: 16 }}>
              <li style={{ color: 'rgba(255,255,255,0.7)' }}>Zero security logic in the AI app</li>
              <li style={{ color: 'rgba(255,255,255,0.7)' }}>Leverage existing IdP / PKI</li>
              <li style={{ color: 'rgba(255,255,255,0.7)' }}>Works with any LLM or framework</li>
              <li style={{ color: 'rgba(255,255,255,0.7)' }}>Same controls for search + RAG</li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: 30, fontSize: 18, color: 'rgba(255,255,255,0.5)', maxWidth: 700 }}>
          Elasticsearch RBAC/ABAC brings the same access control rigor to Gen AI
          that the IC already applies to traditional search and analytics.
        </div>

      </div>
      <div className="elastic-mark" style={{ color: 'rgba(255,255,255,0.3)' }}>elastic</div>
    </div>
  );
}
