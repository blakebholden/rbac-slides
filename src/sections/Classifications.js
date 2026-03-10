import React from 'react';

const levels = [
  { badge: 'u', label: 'UNCLASSIFIED', desc: 'Publicly releasable information', esRole: 'role_unclass' },
  { badge: 'cui', label: 'CUI', desc: 'Controlled Unclassified — requires safeguarding', esRole: 'role_cui' },
  { badge: 'c', label: 'CONFIDENTIAL', desc: 'Could cause damage to national security', esRole: 'role_confidential' },
  { badge: 's', label: 'SECRET', desc: 'Could cause serious damage to national security', esRole: 'role_secret' },
  { badge: 'ts', label: 'TOP SECRET', desc: 'Could cause exceptionally grave damage', esRole: 'role_topsecret' },
];

const compartments = [
  { badge: 'sci', label: 'SCI', full: 'Sensitive Compartmented Information', desc: 'Intel sources & methods' },
  { badge: 'tk', label: 'TK', full: 'TALENT KEYHOLE', desc: 'Satellite imagery intelligence' },
  { badge: 'hcs', label: 'HCS', full: 'HUMINT Control System', desc: 'Human intelligence sources' },
  { badge: 'si', label: 'SI', full: 'Special Intelligence', desc: 'SIGINT-derived information' },
  { badge: 'nf', label: 'NOFORN', full: 'Not Releasable to Foreign Nationals', desc: 'US-only dissemination' },
];

export default function Classifications() {
  return (
    <section id="classifications" className="section">
      <div className="section-title">Classification Levels & Compartments</div>
      <div className="teal-rule" />
      <div className="section-subtitle">
        Each classification level and compartment maps to an Elasticsearch role with DLS/FLS restrictions.
        Access requires both the clearance level AND compartment authorization.
      </div>

      <div className="grid-2">
        <div>
          <h3 style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
            Classification Levels (hierarchical)
          </h3>
          <table className="cls-table">
            <thead>
              <tr><th>Level</th><th>Description</th><th>ES Role</th></tr>
            </thead>
            <tbody>
              {levels.map((l) => (
                <tr key={l.badge}>
                  <td><span className={`cls-badge ${l.badge}`}>{l.label}</span></td>
                  <td style={{ fontSize: 12 }}>{l.desc}</td>
                  <td><code style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: 'var(--elastic-blue)' }}>{l.esRole}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3 style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
            SCI Compartments (additive)
          </h3>
          {compartments.map((c) => (
            <div key={c.label} className="card" style={{ marginBottom: 8, padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className={`cls-badge ${c.badge}`}>{c.label}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--dark-ink)' }}>{c.full}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink)' }}>{c.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="callout" style={{ marginTop: 24, borderLeftColor: 'var(--yellow)' }}>
        <strong>Key Principle:</strong> A TS-cleared analyst without TK access cannot retrieve TK documents — even via RAG.
        Elasticsearch DLS enforces compartmented access at query time, automatically.
      </div>
    </section>
  );
}
