import React from 'react';

export default function TitleSlide() {
  return (
    <div className="slide slide-blue" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <div className="banner top ts">TOP SECRET // SCI // NOFORN</div>

      <div style={{ fontSize: 13, color: 'var(--light-teal)', letterSpacing: 4, fontWeight: 700, marginBottom: 24, fontFamily: "'Space Mono', monospace" }}>
        CLASSIFICATION-BASED ACCESS CONTROL
      </div>

      <div style={{ fontSize: 48, fontWeight: 800, color: '#fff', marginBottom: 16, lineHeight: 1.2 }}>
        RBAC / ABAC for<br />Classified RAG
      </div>

      <div style={{ width: 60, height: 3, background: 'var(--light-teal)', margin: '0 auto 24px' }} />

      <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', marginBottom: 36, maxWidth: 650 }}>
        Enforcing national security classification markings in Elasticsearch
        to secure Gen AI retrieval pipelines
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 36 }}>
        <span className="cls-badge u">UNCLASSIFIED</span>
        <span className="cls-badge cui">CUI</span>
        <span className="cls-badge c">CONFIDENTIAL</span>
        <span className="cls-badge s">SECRET</span>
        <span className="cls-badge ts">TOP SECRET</span>
        <span className="cls-badge sci">TS/SCI</span>
        <span className="cls-badge tk">TK</span>
        <span className="cls-badge hcs">HCS</span>
        <span className="cls-badge nf">NOFORN</span>
      </div>

      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontFamily: "'Space Mono', monospace" }}>
        Elasticsearch + Document-Level Security + Field-Level Security
      </div>

      <div className="banner bottom ts">TOP SECRET // SCI // NOFORN</div>
      <div className="elastic-mark" style={{ color: 'rgba(255,255,255,0.3)' }}>elastic</div>
    </div>
  );
}
