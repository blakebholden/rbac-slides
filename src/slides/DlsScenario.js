import React from 'react';

const docs = [
  { title: 'OSINT Brief - Region Alpha', cls: 'u', label: 'UNCLASS', compartments: [] },
  { title: 'CUI Cable - Embassy Delta', cls: 'cui', label: 'CUI', compartments: [] },
  { title: 'SIGINT Intercept 4492', cls: 's', label: 'SECRET', compartments: ['SI'] },
  { title: 'HUMINT Source Report 771', cls: 'ts', label: 'TS', compartments: ['SCI', 'HCS'] },
  { title: 'SAT Imagery - Site Bravo', cls: 'ts', label: 'TS', compartments: ['SCI', 'TK'] },
  { title: 'NOFORN Assessment 339', cls: 's', label: 'SECRET', compartments: ['NOFORN'] },
];

function canAccess(doc, clearanceLevel, compartments, noforn) {
  const levels = ['u', 'cui', 'c', 's', 'ts'];
  if (levels.indexOf(doc.cls) > levels.indexOf(clearanceLevel)) return false;
  for (const c of doc.compartments) {
    if (c === 'NOFORN' && !noforn) return false;
    if (c !== 'NOFORN' && !compartments.includes(c)) return false;
  }
  return true;
}

function Scenario({ name, clearance, clearanceBadge, compartments, noforn }) {
  return (
    <div>
      <div className="scenario-label">{name}</div>
      <div style={{ marginBottom: 12, display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: 'var(--ink)', marginRight: 4 }}>Clearance:</span>
        <span className={`cls-badge ${clearanceBadge}`}>{clearance}</span>
        {compartments.map(c => <span key={c} className={`cls-badge ${c.toLowerCase()}`}>{c}</span>)}
        {noforn && <span className="cls-badge nf">NOFORN</span>}
      </div>
      <table className="cls-table">
        <thead>
          <tr><th>Document</th><th>Classification</th><th>RAG Access</th></tr>
        </thead>
        <tbody>
          {docs.map((d, i) => {
            const allowed = canAccess(d, clearanceBadge === 'ts' ? 'ts' : clearanceBadge === 's' ? 's' : clearanceBadge, compartments, noforn);
            return (
              <tr key={i}>
                <td style={{ fontSize: 13 }}>{d.title}</td>
                <td>
                  <span className={`cls-badge ${d.cls}`} style={{ fontSize: 10 }}>{d.label}</span>
                  {d.compartments.map(c => (
                    <span key={c} className={`cls-badge ${c.toLowerCase()}`} style={{ fontSize: 10 }}>{c}</span>
                  ))}
                </td>
                <td style={{ fontSize: 14 }}>{allowed ? <span style={{ color: 'var(--light-teal)' }}>RETRIEVED</span> : <span style={{ color: 'var(--light-poppy)', opacity: 0.6 }}>DENIED</span>}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function DlsScenario() {
  return (
    <div className="slide">
      <div className="slide-title">Same Query, Different Clearance</div>
      <div className="teal-rule" />
      <div className="slide-subtitle">DLS ensures each user's RAG context matches their access — automatically</div>

      <div className="grid-2" style={{ marginTop: 16 }}>
        <Scenario
          name="Analyst A — SECRET / SI"
          clearance="SECRET"
          clearanceBadge="s"
          compartments={['SI', 'SCI']}
          noforn={true}
        />
        <Scenario
          name="Analyst B — TS/SCI / HCS / TK"
          clearance="TOP SECRET"
          clearanceBadge="ts"
          compartments={['SCI', 'HCS', 'TK', 'SI']}
          noforn={true}
        />
      </div>

      <div className="callout" style={{ marginTop: 16 }}>
        <strong>Both analysts ask the same question.</strong> Elasticsearch DLS returns different document sets — the LLM generates different answers, each scoped to the user's clearance and compartments.
      </div>

      <div className="elastic-mark">elastic</div>
    </div>
  );
}
