import { Link } from "react-router-dom";

// Focused header for the audit route. Two explicit destinations (Individuals,
// Teams) replace the previous vague "back to website" action so a visitor
// always knows exactly where each option leads. No full site navigation.
export default function AuditHeader() {
  const navLinkStyle = {
    color: "#CBD5E1",
    fontSize: "clamp(13px,3.2vw,15px)",
    fontWeight: 700,
    textDecoration: "none",
    whiteSpace: "nowrap",
  };

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
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 16px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
        <Link to="/" aria-label="AI With Sam home" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", minWidth: 0, flex: "0 1 auto", overflow: "hidden" }}>
          <img src="/logo.png" alt="AI With Sam Logo" style={{ height: "30px", width: "30px", objectFit: "contain", flex: "0 0 auto" }} />
          <span style={{ fontWeight: 800, color: "#FFFFFF", fontSize: "clamp(14px,3.6vw,19px)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            <span style={{ color: "#F97316" }}>AI</span> With Sam
          </span>
        </Link>
        <nav aria-label="Choose your path" style={{ display: "flex", alignItems: "center", gap: "clamp(12px,3vw,20px)", flex: "0 0 auto" }}>
          <Link to="/" style={navLinkStyle}>Individuals</Link>
          <Link to="/teams" style={{ ...navLinkStyle, color: "#F97316" }}>Teams</Link>
        </nav>
      </div>
    </header>
  );
}
