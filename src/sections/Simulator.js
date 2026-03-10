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
const clsLabels = { u: 'UNCLASS', cui: 'CUI', c: 'CONF', s: 'SECRET', ts: 'TOP SECRET' };
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

  return (
    <section id="simulator" className="section">
      <div className="section-title">Access Control Simulator</div>
      <div className="teal-rule" />
      <div className="section-subtitle">
        Select an analyst profile to see which documents Elasticsearch would return in a RAG query.
        The same search query produces different results based on clearance and compartments.
      </div>

      {/* Analyst selector */}
      <div className="sim-controls">
        {analysts.map((a) => (
          <button
            key={a.id}
            className={`sim-btn ${selected === a.id ? 'active' : ''}`}
            onClick={() => setSelected(a.id)}
          >
            {a.name} — <span className={`cls-badge ${a.clearance}`} style={{ fontSize: 9, margin: '0 2px' }}>{a.clearanceLabel}</span>
            {a.compartments.map((c) => (
              <span key={c} className={`cls-badge ${c.toLowerCase()}`} style={{ fontSize: 9, margin: '0 1px' }}>{c}</span>
            ))}
            {a.noforn && <span className="cls-badge nf" style={{ fontSize: 9, margin: '0 1px' }}>NOFORN</span>}
          </button>
        ))}
      </div>

      <div className="grid-2">
        {/* Document list */}
        <div>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
            Knowledge Base Documents
          </h3>
          {results.map((doc, i) => (
            <div key={i} className={`sim-result ${doc.access ? 'granted' : 'denied'}`}>
              <span className="status">{doc.access ? 'GRANTED' : 'DENIED'}</span>
              <span className={`cls-badge ${doc.cls}`} style={{ fontSize: 9 }}>{clsLabels[doc.cls]}</span>
              {doc.compartments.map((c) => (
                <span key={c} className={`cls-badge ${c.toLowerCase()}`} style={{ fontSize: 9 }}>{c}</span>
              ))}
              {doc.noforn && <span className="cls-badge nf" style={{ fontSize: 9 }}>NF</span>}
              <span style={{ fontSize: 13, color: doc.access ? 'var(--dark-ink)' : 'var(--ink)' }}>{doc.title}</span>
            </div>
          ))}
        </div>

        {/* Summary panel */}
        <div>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
            RAG Context for {analyst.name}
          </h3>

          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Clearance:</span>
              <span className={`cls-badge ${analyst.clearance}`}>{analyst.clearanceLabel}</span>
              {analyst.compartments.map((c) => (
                <span key={c} className={`cls-badge ${c.toLowerCase()}`}>{c}</span>
              ))}
              {analyst.noforn && <span className="cls-badge nf">NOFORN</span>}
            </div>
            <div style={{ fontSize: 42, fontWeight: 800, color: 'var(--elastic-blue)', fontFamily: "'Space Mono', monospace" }}>
              {granted} / {documents.length}
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink)' }}>documents retrieved for LLM context</div>
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <h3>What the AI App Sends</h3>
            <div className="teal-rule" />
            <pre className="code-block">{`GET /intel-*/_search
{
  "query": {
    "match": { "content": "<user query>" }
  }
}`}</pre>
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <h3>What Elasticsearch Actually Executes</h3>
            <div className="teal-rule" />
            <p style={{ marginBottom: 8 }}>DLS merges the user's role filters into the query automatically:</p>
            <pre className="code-block">{`GET /intel-*/_search
{
  "query": {
    "bool": {
      "must": {
        "match": { "content": "<user query>" }
      },
      "filter": [
        { "terms": {
            "classification": ${JSON.stringify(getAllowedLevels(analyst.clearance))}
        }},${analyst.compartments.length > 0 ? `
        { "terms": {
            "compartments": ${JSON.stringify(analyst.compartments)}
        }},` : ''}
        { "term": {
            "releasability": "${analyst.noforn ? 'USA' : '*'}"
        }}
      ]
    }
  }
}`}</pre>
          </div>

          <div className="callout">
            <strong>The LLM only sees {granted} document{granted !== 1 ? 's' : ''}.</strong> All other documents are invisible —
            they are never retrieved, never in the prompt, and cannot be leaked in the response.
          </div>
        </div>
      </div>
    </section>
  );
}
