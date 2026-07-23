import { Link } from "react-router-dom";

// Focused header for the audit route. No full site navigation.
export default function AuditHeader() {
  return (
    <header
      style={{
        background: "#0F172A",
        height: "64px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        borderBottom: "1px solid #1E293B",
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 20px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/" aria-label="AI With Sam home" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <img src="/logo.png" alt="AI With Sam Logo" style={{ height: "34px", width: "34px", objectFit: "contain" }} />
          <span style={{ fontWeight: 800, color: "#FFFFFF", fontSize: "19px" }}>
            <span style={{ color: "#F97316" }}>AI</span> With Sam
          </span>
        </Link>
        <Link to="/" aria-label="Back to website" style={{ color: "#CBD5E1", fontSize: "14px", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", minHeight: "44px" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span className="audit-back-label">Back to website</span>
        </Link>
      </div>
    </header>
  );
}
