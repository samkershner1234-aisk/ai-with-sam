import { CTA_URL, WHATSAPP_URL, SAM_PHOTO } from "./constants";

export default function BioSection() {
  return (
    <section style={{ background: "#fff", padding: "56px 0" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px" }}>
        {/* Section label */}
        <p style={{ color: "#F97316", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 13, textAlign: "center", marginBottom: 10 }}>
          WHO YOU'RE WORKING WITH
        </p>

        {/* Card */}
        <div style={{ background: "#F8FAFC", borderRadius: 20, padding: "36px 32px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Photo + name row */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20 }}>
            <div style={{ position: "relative", marginBottom: 14 }}>
              <img
                src={SAM_PHOTO}
                alt="Sam Kershner"
                style={{ width: 130, height: 130, borderRadius: "50%", objectFit: "cover", border: "4px solid #F97316", display: "block" }}
              />
              <span style={{ position: "absolute", bottom: 6, right: 6, width: 16, height: 16, background: "#22C55E", borderRadius: "50%", border: "2px solid #fff" }} />
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 800, fontSize: 22, color: "#0F172A", marginBottom: 3 }}>Sam Kershner</div>
              <div style={{ color: "#64748B", fontSize: 14, marginBottom: 12 }}>AI Systems Builder · Tel Aviv</div>
              {/* Social links */}
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                <a href="https://www.linkedin.com/in/sam-kershner/" target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#0F172A", color: "#fff", borderRadius: 8, padding: "7px 14px", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
                  💼 LinkedIn
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#22C55E", color: "#fff", borderRadius: 8, padding: "7px 14px", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: "100%", height: 1, background: "#E2E8F0", marginBottom: 20 }} />

          {/* Bio text */}
          <div style={{ textAlign: "center", maxWidth: 520 }}>
            <h2 style={{ fontSize: "clamp(18px,3vw,24px)", fontWeight: 800, color: "#0F172A", marginBottom: 14, lineHeight: 1.3 }}>
              I Build Working AI Systems.<br />One Session. Real Results.
            </h2>
            <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
              Before this, I spent 4+ years as an AI-native professional. I don't just talk about AI tools — I build with them. Every client leaves with something they can use immediately.
            </p>

            {/* CTA */}
            <a
              href={CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block", background: "#F97316", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 32px", borderRadius: 10, textDecoration: "none" }}
            >
              Book Your Free 20-Minute Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
