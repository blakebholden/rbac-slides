import React from 'react';

export default function Patterns() {
  return (
    <section id="patterns" className="section">
      <div className="section-title">Compartmented Access Patterns</div>
      <div className="teal-rule" />
      <div className="section-subtitle">
        Three implementation patterns for enforcing classification in Elasticsearch for AI workloads.
      </div>

      <div className="grid-3">
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="pattern-label">PATTERN 1</div>
          <h3>User-Scoped API Keys</h3>
          <div className="teal-rule" />
          <p style={{ marginBottom: 12 }}>
            The AI app mints a short-lived API key per user session that inherits their clearance roles.
          </p>
          <pre className="code-block" style={{ flex: 1 }}>{`POST /_security/api_key
{
  "name": "rag-analyst-a",
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
          <p style={{ marginTop: 12, fontSize: 12 }}>Short-lived, scoped, revocable. No credentials in the AI app.</p>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="pattern-label">PATTERN 2</div>
          <h3>Run-As Impersonation</h3>
          <div className="teal-rule" />
          <p style={{ marginBottom: 12 }}>
            A service account impersonates the calling user. Elasticsearch applies that user's full role set.
          </p>
          <pre className="code-block" style={{ flex: 1 }}>{`// Service account has run_as privilege

GET /intel-*/_search
Authorization: ApiKey <svc_key>
es-security-runas-user: analyst_a

// Elasticsearch resolves
// analyst_a's roles:
//
//   clearance:    SECRET
//   compartments: [SI]
//   NOFORN:       true
//
// DLS automatically applied
// to every search query
//
// Audit log records:
//   who: analyst_a (via svc)
//   what: searched intel-*
//   when: 2026-03-10T16:30Z`}</pre>
          <p style={{ marginTop: 12, fontSize: 12 }}>Single service key, per-request user context, full audit trail.</p>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="pattern-label">PATTERN 3</div>
          <h3>ABAC with Document Metadata</h3>
          <div className="teal-rule" />
          <p style={{ marginBottom: 12 }}>
            Documents carry classification metadata. Role templates use user attributes for dynamic DLS.
          </p>
          <pre className="code-block" style={{ flex: 1 }}>{`// Document metadata:
{
  "title": "SAT Image Bravo",
  "classification": "TS",
  "compartments": ["SCI","TK"],
  "releasability": ["USA"],
  "content_vector": [0.12, ...]
}

// Role template uses user attrs:
{
  "indices": [{
    "names": ["intel-*"],
    "privileges": ["read"],
    "query": {
      "template": {
        "source": {
          "terms": {
            "compartments":
              "{{_user.compartments}}"
          }
        }
      }
    }
  }]
}`}</pre>
          <p style={{ marginTop: 12, fontSize: 12 }}>Attribute-driven, scales with org structure. No role-per-user overhead.</p>
        </div>
      </div>
    </section>
  );
}
