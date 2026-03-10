import React from 'react';

const levels = [
  { badge: 'u', label: 'UNCLASSIFIED', desc: 'Publicly releasable information', esRole: 'role_unclass' },
  { badge: 'cui', label: 'CUI', desc: 'Controlled Unclassified — requires safeguarding', esRole: 'role_cui' },
  { badge: 'c', label: 'CONFIDENTIAL', desc: 'Could cause damage to national security', esRole: 'role_confidential' },
  { badge: 's', label: 'SECRET', desc: 'Could cause serious damage to national security', esRole: 'role_secret' },
  { badge: 'ts', label: 'TOP SECRET', desc: 'Could cause exceptionally grave damage', esRole: 'role_topsecret' },
];

const compartments = [
  { badge: 'sci', label: 'SCI', desc: 'Sensitive Compartmented Information — intel sources & methods' },
  { badge: 'tk', label: 'TK', desc: 'TALENT KEYHOLE — satellite imagery intelligence' },
  { badge: 'hcs', label: 'HCS', desc: 'HUMINT Control System — human intelligence sources' },
  { badge: 'nf', label: 'NOFORN', desc: 'Not releasable to foreign nationals' },
];

export default function ClassificationOverview() {
  return (
    <div className="slide">
      <div className="slide-title">Classification Levels & Compartments</div>
      <div className="teal-rule" />
      <div className="slide-subtitle">Each maps to an Elasticsearch role with DLS/FLS restrictions</div>

      <div className="grid-2" style={{ gap: 30 }}>
        <div>
          <table className="cls-table">
            <thead>
              <tr>
                <th>Level</th>
                <th>Description</th>
                <th>ES Role</th>
              </tr>
            </thead>
            <tbody>
              {levels.map((l) => (
                <tr key={l.badge}>
                  <td><span className={`cls-badge ${l.badge}`}>{l.label}</span></td>
                  <td style={{ fontSize: 12 }}>{l.desc}</td>
                  <td style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: 'var(--elastic-blue)' }}>{l.esRole}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <div style={{ fontSize: 12, color: 'var(--ink)', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>
            SCI Compartments (additive)
          </div>
          {compartments.map((c) => (
            <div key={c.label} className="card" style={{ marginBottom: 8, padding: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className={`cls-badge ${c.badge}`}>{c.label}</span>
                <span style={{ fontSize: 12, color: 'var(--ink)' }}>{c.desc}</span>
              </div>
            </div>
          ))}

          <div className="callout" style={{ marginTop: 14, borderLeftColor: 'var(--yellow)' }}>
            <strong>Key Principle:</strong> Access requires <strong>clearance level AND compartment access</strong>.
            A TS-cleared analyst without TK cannot retrieve TK documents — even via RAG.
            Elasticsearch DLS enforces this at query time.
          </div>
        </div>
      </div>

      <div className="elastic-mark">elastic</div>
    </div>
  );
}
