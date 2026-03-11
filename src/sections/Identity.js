import React from 'react';

export default function Identity() {
  return (
    <section id="identity" className="section">
      <div className="section-title">Identity & Automatic Provisioning</div>
      <div className="teal-rule" />
      <div className="section-subtitle">
        One login, zero Elasticsearch accounts — access control flows from your IdP to the data layer automatically.
      </div>

      {/* Visual flow: IdP -> Attributes -> ES Role Mapping -> DLS/FLS */}
      <div className="identity-flow">
        <div className="id-step">
          <div className="id-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--elastic-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div className="id-label">User signs in</div>
          <div className="id-detail">via SSO / SAML / OIDC</div>
        </div>
        <div className="id-connector" />
        <div className="id-step">
          <div className="id-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--midnight)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <div className="id-label">IdP sends attributes</div>
          <div className="id-detail">clearance, compartments, org</div>
        </div>
        <div className="id-connector" />
        <div className="id-step">
          <div className="id-icon" style={{ background: '#edf4ff' }}>
            <img src="/elastic-favicon.svg" alt="ES" width="32" height="32" />
          </div>
          <div className="id-label">ES auto-creates user</div>
          <div className="id-detail">role mapping assigns roles</div>
        </div>
        <div className="id-connector" />
        <div className="id-step">
          <div className="id-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
          </div>
          <div className="id-label">DLS/FLS enforced</div>
          <div className="id-detail">every query, automatically</div>
        </div>
      </div>

      {/* Two-column deep dive */}
      <div className="grid-2" style={{ marginTop: 36 }}>

        {/* Left: Direct IdP integration */}
        <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--elastic-blue)' }} />
          <div className="pattern-label" style={{ marginTop: 8 }}>DIRECT IDP INTEGRATION</div>
          <h3>Automatic User Creation & Role Assignment</h3>
          <div className="teal-rule" />
          <p style={{ marginBottom: 16 }}>
            When a user signs in through your organization's identity provider — whether that's SAML, OAuth, or OIDC —
            Elasticsearch automatically creates their account on first login. No manual provisioning needed.
          </p>
          <p style={{ marginBottom: 16 }}>
            The IdP sends attributes about the user — clearance level, compartment access, organization — and
            Elasticsearch stores them in the <code style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, background: 'var(--light-grey)', padding: '1px 5px', borderRadius: 3 }}>_user.metadata</code> object.
            Role mappings then use these attributes to automatically assign the right roles.
          </p>

          {/* Vertical stepped mapping */}
          <div className="attr-steps">
            <div className="attr-step">
              <div className="attr-step-label">IdP Attributes → _user.metadata</div>
              <div className="attr-step-content" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="attr-key">SAML:</span>
                  <code className="role-tag" style={{ fontSize: 10 }}>_user.metadata.saml(clearance)</code>
                  <span className="cls-badge ts" style={{ fontSize: 9 }}>TS</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="attr-key">SAML:</span>
                  <code className="role-tag" style={{ fontSize: 10 }}>_user.metadata.saml(compartments)</code>
                  <span className="cls-badge sci" style={{ fontSize: 9 }}>SCI</span>
                  <span className="cls-badge hcs" style={{ fontSize: 9 }}>HCS</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="attr-key">OIDC:</span>
                  <code className="role-tag" style={{ fontSize: 10 }}>_user.metadata.oidc(org)</code>
                  <span style={{ fontSize: 12, color: 'var(--ink)' }}>ACME-INTEL</span>
                </div>
              </div>
            </div>
            <div className="attr-step-arrow">&#8595;</div>
            <div className="attr-step">
              <div className="attr-step-label">Role Template References _user.metadata</div>
              <pre className="code-block" style={{ margin: 0, fontSize: 11 }}>{`"query": {
  "template": {
    "source": {
      "terms": {
        "metadata.compartments":
          "{{_user.metadata.compartments}}"
      }
    }
  }
}`}</pre>
            </div>
            <div className="attr-step-arrow">&#8595;</div>
            <div className="attr-step">
              <div className="attr-step-label">Filters Applied to Every Query</div>
              <div className="attr-step-content">
                <span className="filter-tag">DLS: classification ∈ [U, CUI, C, S, TS]</span>
                <span className="filter-tag">DLS: compartments ∈ [SCI, HCS]</span>
                <span className="filter-tag">FLS: source_id hidden</span>
              </div>
            </div>
          </div>

          <p style={{ marginTop: 16, marginBottom: 0 }}>
            The security team manages access in the IdP — where they already manage everything else.
            The <code style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, background: 'var(--light-grey)', padding: '1px 5px', borderRadius: 3 }}>_user.metadata</code> object stays in sync automatically. No one manually assigns Elasticsearch roles.
          </p>
        </div>

        {/* Right: Application-layer scoped API keys */}
        <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--light-teal)' }} />
          <div className="pattern-label" style={{ marginTop: 8 }}>SEPARATE AI APPLICATION</div>
          <h3>Scoped API Keys — No ES Account Needed</h3>
          <div className="teal-rule" />
          <p style={{ marginBottom: 16 }}>
            When a separate AI application makes calls back to Elasticsearch, the end user doesn't need their own
            Elasticsearch account at all. The user authenticates to your AI app through your IdP — that's the only
            login they ever see.
          </p>

          {/* App flow visual */}
          <div className="app-flow">
            <div className="app-flow-step">
              <div className="app-flow-num">1</div>
              <div>
                <div className="app-flow-title">User logs into AI app</div>
                <div className="app-flow-desc">IdP token contains clearance + compartments</div>
              </div>
            </div>
            <div className="app-flow-step">
              <div className="app-flow-num">2</div>
              <div>
                <div className="app-flow-title">App mints scoped API key</div>
                <div className="app-flow-desc">Short-lived, restricted to user's classification level, compartments, and releasability</div>
              </div>
            </div>
            <div className="app-flow-step">
              <div className="app-flow-num">3</div>
              <div>
                <div className="app-flow-title">Key used for all RAG retrievals</div>
                <div className="app-flow-desc">Elasticsearch enforces restrictions on every query — automatically</div>
              </div>
            </div>
            <div className="app-flow-step">
              <div className="app-flow-num">4</div>
              <div>
                <div className="app-flow-title">Session ends, key expires</div>
                <div className="app-flow-desc">No lingering credentials, no cleanup required</div>
              </div>
            </div>
          </div>

          <div className="callout" style={{ marginTop: 16, borderLeftColor: 'var(--light-teal)' }}>
            <strong>Alternative:</strong> Use a single service account with <code style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, background: 'var(--light-grey)', padding: '2px 6px', borderRadius: 3 }}>run_as</code> impersonation —
            Elasticsearch applies the user's permissions based on IdP attributes. No individual ES account required either way.
          </div>

          <p style={{ marginTop: 16 }}>
            The user logs in once through your front door. The access control follows them all the way
            down to the data layer — without any additional accounts or passwords to manage.
          </p>
        </div>
      </div>

      {/* SAML vs OIDC metadata reference */}
      <div className="grid-2" style={{ marginTop: 24 }}>
        <div className="card">
          <div className="pattern-label">SAML</div>
          <h3>_user.metadata.saml(attribute_name)</h3>
          <div className="teal-rule" />
          <p style={{ marginBottom: 10 }}>
            SAML attributes from the identity provider's assertion are stored in the user's metadata object.
            Access them in role templates using the SAML attribute name as defined in your IdP configuration.
          </p>
          <pre className="code-block" style={{ fontSize: 11 }}>{`// SAML attribute examples:
_user.metadata.saml(clearance)       // "TS"
_user.metadata.saml(compartments)    // ["SCI","HCS"]
_user.metadata.saml(releasability)   // ["USA"]
_user.metadata.saml(organization)    // "ACME-INTEL"

// Custom attributes from your SAML
// provider token are automatically
// available in the same pattern.`}</pre>
        </div>
        <div className="card">
          <div className="pattern-label">OIDC</div>
          <h3>_user.metadata.oidc(claim_name)</h3>
          <div className="teal-rule" />
          <p style={{ marginBottom: 10 }}>
            OIDC claims from the ID Token or User Info response are stored in the user's metadata object.
            The claim name matches exactly what was contained in the token.
          </p>
          <pre className="code-block" style={{ fontSize: 11 }}>{`// OIDC claim examples:
_user.metadata.oidc(clearance)       // "TS"
_user.metadata.oidc(compartments)    // ["SCI","HCS"]
_user.metadata.oidc(releasability)   // ["USA"]
_user.metadata.oidc(org)             // "ACME-INTEL"

// claim_name is the name of the claim
// as it was contained in the ID Token
// or in the User Info response.`}</pre>
        </div>
      </div>

      {/* Bottom takeaway */}
      <div className="callout" style={{ marginTop: 24 }}>
        <strong>Bottom line:</strong> Whether users connect directly through SAML/OIDC or through a separate AI application
        with scoped API keys, the result is the same — classification-based access control enforced at every query,
        managed from a single source of truth, with zero security code in the application layer.
      </div>
    </section>
  );
}
