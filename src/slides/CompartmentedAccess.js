import React from 'react';

export default function CompartmentedAccess() {
  return (
    <div className="slide">
      <div className="slide-title">Compartmented Access Patterns</div>
      <div className="teal-rule" />
      <div className="slide-subtitle">Three ways to enforce classification in Elasticsearch for AI workloads</div>

      <div className="grid-3" style={{ marginTop: 24 }}>
        {/* Pattern 1 */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 12, color: 'var(--light-teal)', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>PATTERN 1</div>
          <h3>User-Scoped API Keys</h3>
          <div className="teal-rule" />
          <div style={{ flex: 1 }}>
            <p style={{ marginBottom: 12 }}>AI app mints a short-lived API key per user session that inherits their clearance roles.</p>
            <pre className="code-block">{`POST /_security/api_key
{
  "name": "rag-session-analyst-a",
  "expiration": "8h",
  "role_descriptors": {
    "rag_access": {
      "indices": [{
        "names": ["intel-*"],
        "privileges": ["read"],
        "query": {
          "bool": {
            "must": [
              {"terms": {
                "classification":
                  ["U","CUI","S"]
              }},
              {"terms": {
                "compartments":
                  ["SI","NOFORN"]
              }}
            ]
          }
        }
      }]
    }
  }
}`}</pre>
          </div>
        </div>

        {/* Pattern 2 */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 12, color: 'var(--light-teal)', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>PATTERN 2</div>
          <h3>Run-As Impersonation</h3>
          <div className="teal-rule" />
          <div style={{ flex: 1 }}>
            <p style={{ marginBottom: 12 }}>Service account impersonates the calling user. Elasticsearch applies that user's full role set.</p>
            <pre className="code-block">{`// AI service account has
// run_as privilege

GET /intel-*/_search
Authorization: ApiKey <svc_key>
es-security-runas-user: analyst_a

// Elasticsearch resolves
// analyst_a's roles:
//   - clearance: SECRET
//   - compartments: [SI]
//   - NOFORN: true
//
// DLS auto-applied to
// every query`}</pre>
          </div>
          <p style={{ marginTop: 12 }}>Single service key, per-request user context. Full audit trail.</p>
        </div>

        {/* Pattern 3 */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 12, color: 'var(--light-teal)', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>PATTERN 3</div>
          <h3>ABAC with Metadata</h3>
          <div className="teal-rule" />
          <div style={{ flex: 1 }}>
            <p style={{ marginBottom: 12 }}>Documents carry classification metadata. Role templates use attributes for dynamic DLS.</p>
            <pre className="code-block">{`// Document metadata:
{
  "title": "SAT Image Bravo",
  "classification": "TS",
  "compartments": ["SCI","TK"],
  "releasability": ["USA"],
  "content_vector": [0.12, ...]
}

// Role template uses
// user attributes:
"query": {
  "bool": {
    "filter": {
      "terms": {
        "compartments":
          {{user.compartments}}
      }
    }
  }
}`}</pre>
          </div>
        </div>
      </div>

      <div className="elastic-mark">elastic</div>
    </div>
  );
}
