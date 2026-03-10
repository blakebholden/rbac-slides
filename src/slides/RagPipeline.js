import React from 'react';

export default function RagPipeline() {
  return (
    <div className="slide">
      <div className="slide-title">Classified RAG Pipeline</div>
      <div className="teal-rule" />
      <div className="slide-subtitle">Elasticsearch enforces classification at retrieval — the LLM only sees what clearance allows</div>

      <div className="flow-row" style={{ marginTop: 30 }}>
        <div className="flow-box">
          <div style={{ fontSize: 22, marginBottom: 4 }}>Analyst</div>
          <div style={{ fontSize: 12, color: 'var(--ink)' }}>"Summarize HUMINT<br/>on target X"</div>
        </div>
        <div className="flow-arrow">&#8594;</div>
        <div className="flow-box">
          <div style={{ fontSize: 13, marginBottom: 4 }}>Identity + Clearance</div>
          <span className="cls-badge ts" style={{ fontSize: 10 }}>TS</span>
          <span className="cls-badge sci" style={{ fontSize: 10 }}>SCI</span>
          <span className="cls-badge hcs" style={{ fontSize: 10 }}>HCS</span>
        </div>
        <div className="flow-arrow">&#8594;</div>
        <div className="flow-box es">
          <div style={{ fontSize: 13, marginBottom: 4 }}>Elasticsearch</div>
          <div style={{ fontSize: 11 }}>AuthC/Z + DLS + FLS</div>
        </div>
        <div className="flow-arrow">&#8594;</div>
        <div className="flow-box allowed">
          <div style={{ fontSize: 13 }}>Filtered Results</div>
          <div style={{ fontSize: 11 }}>only TS/SCI/HCS docs</div>
        </div>
        <div className="flow-arrow">&#8594;</div>
        <div className="flow-box llm">
          <div style={{ fontSize: 13 }}>LLM</div>
          <div style={{ fontSize: 11 }}>generates answer</div>
        </div>
        <div className="flow-arrow">&#8594;</div>
        <div className="flow-box">
          <div style={{ fontSize: 13 }}>Response</div>
          <div style={{ fontSize: 11 }}>to analyst</div>
        </div>
      </div>

      <div className="grid-3" style={{ marginTop: 30 }}>
        <div className="card">
          <h3>1. Query with Identity</h3>
          <div className="teal-rule" />
          <p>
            AI app passes the user's credentials or scoped API key.
            Elasticsearch resolves clearance level + compartments from
            the user's role mappings.
          </p>
        </div>
        <div className="card">
          <h3>2. DLS Enforcement</h3>
          <div className="teal-rule" />
          <p>
            Document-Level Security appends a filter:
          </p>
          <pre className="code-block">{`"query": {
  "bool": {
    "filter": [
      {"term":{"classification":"TS"}},
      {"terms":{"compartments":
        ["SCI","HCS"]}}
    ]
  }
}`}</pre>
        </div>
        <div className="card">
          <h3>3. FLS Redaction</h3>
          <div className="teal-rule" />
          <p>
            Field-Level Security strips fields the role cannot see —
            e.g., source identities (HUMINT names) are redacted even
            from documents the analyst can otherwise access.
          </p>
        </div>
      </div>

      <div className="callout" style={{ marginTop: 20 }}>
        <strong>Result:</strong> The LLM never sees documents above the analyst's clearance or outside their compartments. Zero application-layer security logic required.
      </div>

      <div className="elastic-mark">elastic</div>
    </div>
  );
}
