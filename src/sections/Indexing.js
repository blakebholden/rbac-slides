import React from 'react';

export default function Indexing() {
  return (
    <section id="indexing" className="section">
      <div className="section-title">Document Classification at Index Time</div>
      <div className="teal-rule" />
      <div className="section-subtitle">
        Before DLS can enforce access, every document needs classification metadata.
        Here's how documents get marked during ingestion.
      </div>

      {/* Document schema */}
      <div className="grid-2" style={{ marginBottom: 28 }}>
        <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--elastic-blue)' }} />
          <div className="pattern-label" style={{ marginTop: 8 }}>DOCUMENT SCHEMA</div>
          <h3>Classification Metadata Fields</h3>
          <div className="teal-rule" />
          <p style={{ marginBottom: 12 }}>
            Every document in your knowledge base carries structured metadata alongside its content and vector embeddings.
            These fields are what DLS queries filter against.
          </p>
          <pre className="code-block">{`{
  "title": "HUMINT Source Report 771",
  "content": "Assessment of asset...",
  "content_vector": [0.12, -0.34, ...],

  // Classification metadata
  "classification":  "TS",
  "compartments":    ["SCI", "HCS"],
  "releasability":   ["USA"],
  "caveats":         ["NOFORN", "ORCON"],
  "source_type":     "HUMINT",
  "date_classified": "2026-01-15",
  "classified_by":   "OCA-ACME-2024-0042",
  "downgrade_date":  "2036-01-15"
}`}</pre>
        </div>

        <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--light-teal)' }} />
          <div className="pattern-label" style={{ marginTop: 8 }}>INDEX MAPPING</div>
          <h3>Elasticsearch Field Definitions</h3>
          <div className="teal-rule" />
          <p style={{ marginBottom: 12 }}>
            Define the mapping so Elasticsearch knows how to store, search, and filter on classification fields.
            Keyword types enable exact-match DLS filtering.
          </p>
          <pre className="code-block">{`PUT /intel-knowledge-base
{
  "mappings": {
    "properties": {
      "title":          { "type": "text" },
      "content":        { "type": "text" },
      "content_vector": {
        "type": "dense_vector",
        "dims": 768
      },
      "classification": { "type": "keyword" },
      "compartments":   { "type": "keyword" },
      "releasability":  { "type": "keyword" },
      "caveats":        { "type": "keyword" },
      "source_type":    { "type": "keyword" },
      "date_classified":{ "type": "date" },
      "classified_by":  { "type": "keyword" },
      "downgrade_date": { "type": "date" }
    }
  }
}`}</pre>
        </div>
      </div>

      {/* Ingestion methods */}
      <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--dark-ink)', marginBottom: 4 }}>
        How Documents Get Marked
      </h3>
      <div className="teal-rule" />
      <p style={{ fontSize: 13, color: 'var(--ink)', marginBottom: 16, lineHeight: 1.6 }}>
        Classification metadata can arrive with the document or be applied during ingestion.
        Three common patterns:
      </p>

      <div className="grid-3" style={{ marginBottom: 28 }}>
        <div className="card">
          <div className="pattern-label">PATTERN 1</div>
          <h3>Source System Markings</h3>
          <div className="teal-rule" />
          <p style={{ marginBottom: 12 }}>
            Documents arrive pre-marked from the originating system — a records management system, CMS, or
            classification authority. The metadata is already part of the document.
          </p>
          <div className="index-flow">
            <div className="index-flow-item">
              <div className="index-flow-icon" style={{ background: '#edf4ff', borderColor: 'var(--elastic-blue)' }}>SRC</div>
              <span>Source system exports with markings</span>
            </div>
            <div className="index-flow-item">
              <div className="index-flow-icon" style={{ background: '#f0faf0', borderColor: '#2e7d32' }}>ES</div>
              <span>Index as-is — metadata preserved</span>
            </div>
          </div>
          <p style={{ fontSize: 12, color: 'var(--ink)', marginTop: 8 }}>
            Best for: systems that already manage classification (JWICS, SIPRNet content)
          </p>
        </div>

        <div className="card">
          <div className="pattern-label">PATTERN 2</div>
          <h3>Ingest Pipeline Enrichment</h3>
          <div className="teal-rule" />
          <p style={{ marginBottom: 12 }}>
            Use Elasticsearch ingest pipelines to automatically tag or validate classification metadata
            as documents are indexed. Rules can derive markings from content patterns or source metadata.
          </p>
          <pre className="code-block" style={{ fontSize: 11 }}>{`PUT _ingest/pipeline/classify
{
  "processors": [
    {
      "set": {
        "if": "ctx.source_type == 'HUMINT'",
        "field": "compartments",
        "value": ["SCI", "HCS"]
      }
    },
    {
      "set": {
        "if": "ctx.classification == null",
        "field": "classification",
        "value": "U"
      }
    }
  ]
}`}</pre>
          <p style={{ fontSize: 12, color: 'var(--ink)', marginTop: 8 }}>
            Best for: automated enrichment and enforcing defaults
          </p>
        </div>

        <div className="card">
          <div className="pattern-label">PATTERN 3</div>
          <h3>Bulk Re-Classification</h3>
          <div className="teal-rule" />
          <p style={{ marginBottom: 12 }}>
            When classification levels change — upgrades, downgrades, or declassification — update documents
            in place using update-by-query. DLS filters apply immediately.
          </p>
          <pre className="code-block" style={{ fontSize: 11 }}>{`POST /intel-*/_update_by_query
{
  "query": {
    "bool": {
      "must": [
        {"term": {
          "classified_by": "OCA-2020-XX"
        }},
        {"range": {
          "downgrade_date": {
            "lte": "now"
          }
        }}
      ]
    }
  },
  "script": {
    "source": """
      ctx._source.classification = 'S';
      ctx._source.caveats.remove(
        ctx._source.caveats.indexOf(
          'NOFORN'))
    """
  }
}`}</pre>
          <p style={{ fontSize: 12, color: 'var(--ink)', marginTop: 8 }}>
            Best for: policy changes, scheduled declassification, corrections
          </p>
        </div>
      </div>

      {/* Validation callout */}
      <div className="callout">
        <strong>Validation at index time:</strong> Ingest pipelines can also reject or quarantine documents
        that arrive without required classification fields — ensuring no unmarked document ever enters the knowledge
        base. If it's not marked, it's not searchable. This prevents unclassified content from accidentally
        appearing in a cleared analyst's RAG context and, equally, prevents unmarked sensitive content from
        being visible to everyone.
      </div>
    </section>
  );
}
