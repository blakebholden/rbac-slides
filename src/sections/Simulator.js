import React, { useState } from 'react';

const analysts = [
  { id: 'unclass', name: 'Public User', clearance: 'u', clearanceLabel: 'UNCLASSIFIED', compartments: [], noforn: false },
  { id: 'secret_si', name: 'Analyst A', clearance: 's', clearanceLabel: 'SECRET', compartments: ['SI'], noforn: true },
  { id: 'ts_sci_hcs', name: 'Analyst B', clearance: 'ts', clearanceLabel: 'TS/SCI', compartments: ['SCI', 'HCS', 'SI'], noforn: true },
  { id: 'ts_all', name: 'Senior Analyst', clearance: 'ts', clearanceLabel: 'TS/SCI', compartments: ['SCI', 'HCS', 'TK', 'SI'], noforn: true },
];

const documents = [
  { title: 'OSINT Brief — Region Alpha', cls: 'u', compartments: [], noforn: false },
  { title: 'CUI Cable — Embassy Delta', cls: 'cui', compartments: [], noforn: false },
  { title: 'SIGINT Intercept 4492', cls: 's', compartments: ['SI'], noforn: true },
  { title: 'NOFORN Assessment 339', cls: 's', compartments: [], noforn: true },
  { title: 'HUMINT Source Report 771', cls: 'ts', compartments: ['SCI', 'HCS'], noforn: true },
  { title: 'SAT Imagery — Site Bravo', cls: 'ts', compartments: ['SCI', 'TK'], noforn: true },
  { title: 'Fused Intel Summary 88', cls: 'ts', compartments: ['SCI'], noforn: false },
  { title: 'Covert Ops Plan — ZEPHYR', cls: 'ts', compartments: ['SCI', 'HCS', 'TK'], noforn: true },
];

const clsOrder = { u: 0, cui: 1, c: 2, s: 3, ts: 4 };
const clsLabels = { u: 'U', cui: 'CUI', s: 'S', ts: 'TS' };
const clsHierarchy = ['U', 'CUI', 'C', 'S', 'TS'];

function getAllowedLevels(clearance) {
  const maxIdx = clsOrder[clearance];
  return clsHierarchy.slice(0, maxIdx + 1);
}

function canAccess(doc, analyst) {
  if (clsOrder[doc.cls] > clsOrder[analyst.clearance]) return false;
  if (doc.noforn && !analyst.noforn) return false;
  for (const c of doc.compartments) {
    if (!analyst.compartments.includes(c)) return false;
  }
  return true;
}

export default function Simulator() {
  const [selected, setSelected] = useState('secret_si');
  const analyst = analysts.find((a) => a.id === selected);
  const results = documents.map((d) => ({ ...d, access: canAccess(d, analyst) }));
  const granted = results.filter((r) => r.access).length;
  const denied = results.length - granted;

  return (
    <section id="simulator" className="section">
      <div className="section-title">Access Control Simulator</div>
      <div className="teal-rule" />
      <div className="section-subtitle">
        Select an analyst profile to see which documents Elasticsearch would return in a RAG query.
      </div>

      {/* Top bar: selector + stats */}
      <div className="sim-top-bar">
        <div className="sim-controls">
          {analysts.map((a) => (
            <button
              key={a.id}
              className={`sim-btn ${selected === a.id ? 'active' : ''}`}
              onClick={() => setSelected(a.id)}
            >
              {a.name}
            </button>
          ))}
        </div>
        <div className="sim-stats">
          <div className="sim-stat">
            <span className="sim-stat-num" style={{ color: '#2e7d32' }}>{granted}</span>
            <span className="sim-stat-label">retrieved</span>
          </div>
          <div className="sim-stat">
            <span className="sim-stat-num" style={{ color: '#c62828' }}>{denied}</span>
            <span className="sim-stat-label">denied</span>
          </div>
          <div className="sim-stat">
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              <span className={`cls-badge ${analyst.clearance}`} style={{ fontSize: 9 }}>{analyst.clearanceLabel}</span>
              {analyst.compartments.map((c) => (
                <span key={c} className={`cls-badge ${c.toLowerCase()}`} style={{ fontSize: 9 }}>{c}</span>
              ))}
              {analyst.noforn && <span className="cls-badge nf" style={{ fontSize: 9 }}>NF</span>}
            </div>
            <span className="sim-stat-label">clearance</span>
          </div>
        </div>
      </div>

      {/* Main content: 3 columns */}
      <div className="sim-grid">
        {/* Left: Document list (compact table) */}
        <div className="sim-col-docs">
          <h3 className="sim-col-header">Knowledge Base</h3>
          <table className="cls-table" style={{ fontSize: 12 }}>
            <thead>
              <tr><th>Status</th><th>Doc</th><th>Class</th></tr>
            </thead>
            <tbody>
              {results.map((doc, i) => (
                <tr key={i} style={{ opacity: doc.access ? 1 : 0.4 }}>
                  <td>
                    <span className="sim-status-dot" style={{ background: doc.access ? '#2e7d32' : '#c62828' }} />
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: doc.access ? '#2e7d32' : '#c62828' }}>
                      {doc.access ? 'OK' : 'NO'}
                    </span>
                  </td>
                  <td style={{ fontSize: 12 }}>{doc.title}</td>
                  <td>
                    <span className={`cls-badge ${doc.cls}`} style={{ fontSize: 8 }}>{clsLabels[doc.cls] || doc.cls.toUpperCase()}</span>
                    {doc.compartments.map((c) => (
                      <span key={c} className={`cls-badge ${c.toLowerCase()}`} style={{ fontSize: 8 }}>{c}</span>
                    ))}
                    {doc.noforn && <span className="cls-badge nf" style={{ fontSize: 8 }}>NF</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Middle: What the app sends */}
        <div className="sim-col-query">
          <h3 className="sim-col-header">App Sends</h3>
          <pre className="code-block" style={{ fontSize: 11 }}>{`GET /intel-*/_search
{
  "query": {
    "match": {
      "content": "<query>"
    }
  }
}`}</pre>
          <div style={{ fontSize: 11, color: 'var(--ink)', marginTop: 8, fontStyle: 'italic' }}>
            No security logic — just the search.
          </div>
        </div>

        {/* Right: What ES executes */}
        <div className="sim-col-query">
          <h3 className="sim-col-header">ES Executes (with DLS)</h3>
          <pre className="code-block" style={{ fontSize: 11 }}>{`GET /intel-*/_search
{
  "query": {
    "bool": {
      "must": {
        "match": {
          "content": "<query>"
        }
      },
      "filter": [
        { "terms": {
            "classification":
              ${JSON.stringify(getAllowedLevels(analyst.clearance))}
        }},${analyst.compartments.length > 0 ? `
        { "terms": {
            "compartments":
              ${JSON.stringify(analyst.compartments)}
        }},` : ''}
        { "term": {
            "releasability":
              "${analyst.noforn ? 'USA' : '*'}"
        }}
      ]
    }
  }
}`}</pre>
        </div>
      </div>

      <div className="callout" style={{ marginTop: 20 }}>
        <strong>The LLM only sees {granted} document{granted !== 1 ? 's' : ''}.</strong> The remaining {denied} are
        never retrieved, never in the prompt, and cannot be leaked in the response.
      </div>
    </section>
  );
}
