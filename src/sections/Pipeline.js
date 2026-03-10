import React from 'react';

export default function Pipeline() {
  return (
    <section id="pipeline" className="section">
      <div className="section-title">Classified RAG Pipeline</div>
      <div className="teal-rule" />
      <div className="section-subtitle">
        Elasticsearch enforces classification at retrieval time — the LLM only sees what the analyst's clearance allows.
      </div>

      {/* Flow diagram */}
      <div className="flow-row" style={{ marginBottom: 32, justifyContent: 'center' }}>
        <div className="flow-box">
          <div style={{ fontSize: 16, marginBottom: 2 }}>Analyst</div>
          <div style={{ fontSize: 11, color: 'var(--ink)', fontWeight: 400 }}>asks question</div>
        </div>
        <div className="flow-arrow">&rarr;</div>
        <div className="flow-box">
          <div style={{ fontSize: 13, marginBottom: 4 }}>Identity + Clearance</div>
          <div style={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <span className="cls-badge ts" style={{ fontSize: 9 }}>TS</span>
            <span className="cls-badge sci" style={{ fontSize: 9 }}>SCI</span>
            <span className="cls-badge hcs" style={{ fontSize: 9 }}>HCS</span>
          </div>
        </div>
        <div className="flow-arrow">&rarr;</div>
        <div className="flow-box es">
          <div style={{ fontSize: 14, marginBottom: 2 }}>Elasticsearch</div>
          <div style={{ fontSize: 11, fontWeight: 400 }}>AuthC/Z + DLS + FLS</div>
        </div>
        <div className="flow-arrow">&rarr;</div>
        <div className="flow-box allowed">
          <div style={{ fontSize: 13 }}>Filtered Context</div>
          <div style={{ fontSize: 11, fontWeight: 400 }}>authorized docs only</div>
        </div>
        <div className="flow-arrow">&rarr;</div>
        <div className="flow-box llm">
          <div style={{ fontSize: 14 }}>LLM</div>
          <div style={{ fontSize: 11, fontWeight: 400 }}>generates answer</div>
        </div>
        <div className="flow-arrow">&rarr;</div>
        <div className="flow-box">
          <div style={{ fontSize: 13 }}>Response</div>
        </div>
      </div>

      {/* Three step cards */}
      <div className="grid-3">
        <div className="card">
          <div className="pattern-label">STEP 1</div>
          <h3>Query with Identity</h3>
          <div className="teal-rule" />
          <p>
            The AI app passes the user's credentials or scoped API key with every search.
            Elasticsearch resolves the clearance level and compartment access from the user's role mappings.
          </p>
        </div>
        <div className="card">
          <div className="pattern-label">STEP 2</div>
          <h3>DLS Enforcement</h3>
          <div className="teal-rule" />
          <p style={{ marginBottom: 8 }}>Document-Level Security appends a filter to the query:</p>
          <pre className="code-block">{`"query": {
  "bool": {
    "filter": [
      {"term": {
        "classification": "TS"
      }},
      {"terms": {
        "compartments":
          ["SCI","HCS"]
      }}
    ]
  }
}`}</pre>
        </div>
        <div className="card">
          <div className="pattern-label">STEP 3</div>
          <h3>FLS Redaction</h3>
          <div className="teal-rule" />
          <p>
            Field-Level Security strips fields the role cannot access — for example,
            source identities (HUMINT names) are redacted even from documents the analyst
            can otherwise retrieve. The LLM never sees these fields.
          </p>
        </div>
      </div>

      <div className="callout" style={{ marginTop: 24 }}>
        <strong>Result:</strong> The LLM never sees documents above the analyst's clearance or outside their compartments.
        Zero application-layer security logic required — Elasticsearch handles it all.
      </div>
    </section>
  );
}
