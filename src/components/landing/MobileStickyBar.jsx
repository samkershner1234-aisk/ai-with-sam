import { CTA_URL } from "./constants";

export default function MobileStickyBar() {
  return (
    <>
      <div className="mobile-sticky-bar" style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "56px",
        background: "#F97316",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}>
        <a href={CTA_URL} target="_blank" rel="noopener noreferrer"
          style={{
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: "16px",
            textDecoration: "none",
          }}>
          Save My Spot →
        </a>
      </div>

      <style>{`
        .mobile-sticky-bar {
          display: none;
        }
        @media (max-width: 768px) {
          .mobile-sticky-bar {
            display: flex !important;
          }
          body {
            padding-bottom: 56px;
          }
        }
      `}</style>
    </>
  );
}
