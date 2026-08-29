import { useEffect } from "react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import { T } from "../audit/ui";

const PROD_ORIGIN = "https://www.aiforeveryrole.com";
const PRIVACY_PATH = "/privacy";
const CANONICAL_URL = PROD_ORIGIN + PRIVACY_PATH;
const DESCRIPTION = "Privacy notice explaining how AI With Sam collects and uses limited professional contact information for business-to-business communications.";

function upsertNamedMeta(name, content) {
  try {
    let el = document.head.querySelector('meta[name="' + name + '"]');
    if (!el) { el = document.createElement("meta"); el.setAttribute("name", name); document.head.appendChild(el); }
    el.setAttribute("content", content);
  } catch (e) { /* ignore */ }
}

function upsertPropertyMeta(prop, content) {
  try {
    let el = document.head.querySelector('meta[property="' + prop + '"]');
    if (!el) { el = document.createElement("meta"); el.setAttribute("property", prop); document.head.appendChild(el); }
    el.setAttribute("content", content);
  } catch (e) { /* ignore */ }
}

function upsertCanonical(href) {
  try {
    let el = document.head.querySelector('link[rel="canonical"]');
    if (!el) { el = document.createElement("link"); el.setAttribute("rel", "canonical"); document.head.appendChild(el); }
    el.setAttribute("href", href);
  } catch (e) { /* ignore */ }
}

function Section({ title, children }) {
  return (
    <section style={{ marginTop: "44px" }}>
      <h2 style={{ color: T.white, fontWeight: 800, fontSize: "clamp(20px,3vw,24px)", lineHeight: 1.3, margin: "0 0 14px", letterSpacing: "-0.3px" }}>
        {title}
      </h2>
      <div style={{ color: T.grey, fontSize: "16px", lineHeight: 1.75 }}>{children}</div>
    </section>
  );
}

function P({ children, style }) {
  return <p style={{ margin: "0 0 16px", ...style }}>{children}</p>;
}

function List({ items }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px", display: "grid", gap: "10px" }}>
      {items.map((it, i) => (
        <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
          <span aria-hidden="true" style={{ color: T.orange, fontWeight: 800, flex: "0 0 auto" }}>-</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Privacy() {
  useEffect(() => {
    document.title = "Privacy Policy | AI With Sam";
    upsertNamedMeta("description", DESCRIPTION);
    upsertNamedMeta("robots", "index, follow");
    upsertCanonical(CANONICAL_URL);
    upsertPropertyMeta("og:title", "Privacy Policy | AI With Sam");
    upsertPropertyMeta("og:description", DESCRIPTION);
    upsertPropertyMeta("og:type", "website");
    upsertPropertyMeta("og:url", CANONICAL_URL);
    upsertNamedMeta("twitter:card", "summary_large_image");
    upsertNamedMeta("twitter:title", "Privacy Policy | AI With Sam");
    upsertNamedMeta("twitter:description", DESCRIPTION);
  }, []);

  return (
    <div style={{ fontFamily: T.font, background: T.navy, minHeight: "100vh" }}>
      <Navbar />
      <main style={{ padding: "clamp(40px,7vw,72px) 20px 96px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ color: T.orange, fontWeight: 800, fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px" }}>
            Legal
          </div>
          <h1 style={{ color: T.white, fontWeight: 900, fontSize: "clamp(30px,5vw,44px)", lineHeight: 1.15, margin: "0 0 12px", letterSpacing: "-0.5px" }}>
            Privacy Notice
          </h1>
          <p style={{ color: T.greyDim, fontSize: "14px", margin: "0 0 40px" }}>Last updated: August 2026</p>

          <div style={{ color: T.grey, fontSize: "16px", lineHeight: 1.75 }}>
            <P>AI For Every Role uses limited professional contact information, such as your name, job title, company and business email address, to contact relevant professionals about our services.</P>
            <P>We may obtain this information from publicly available professional sources, company websites and business data providers.</P>
            <P>Where applicable, we process this information on the basis of our legitimate interests in marketing our services to businesses that we reasonably believe may benefit from them.</P>
            <P>We only use this information for relevant business-to-business communications and do not sell your personal information.</P>
            <P>You have the right to object to your information being used for direct marketing at any time. To opt out, simply reply to any email asking not to be contacted. We will add your details to our suppression list to ensure that you are not contacted again for marketing purposes.</P>
            <P>If you would like to know what personal information we hold about you, ask us to correct it, delete it where applicable, restrict its use, or exercise any other applicable data protection rights, contact us at:</P>
            <P>
              <a href="mailto:samtheaicoach@gmail.com" style={{ color: T.orange, textDecoration: "none", fontWeight: 600 }}>samtheaicoach@gmail.com</a>
            </P>
          </div>

          <Section title="Where we get information from">
            <P>We may collect professional contact information from:</P>
            <List items={["Public company websites", "Public professional profiles", "Publicly available business directories", "Business data providers", "Information provided directly to us"]} />
          </Section>

          <Section title="How we use your information">
            <P>We may use professional contact information to:</P>
            <List items={["Identify businesses and professionals who may be relevant to our services", "Send relevant business-to-business communications", "Respond to enquiries", "Manage opt-out requests", "Maintain a suppression list so we do not contact people who have asked us not to"]} />
          </Section>

          <Section title="Legal basis">
            <P>Where UK GDPR applies, we may rely on legitimate interests as our lawful basis for processing professional contact information for relevant business-to-business outreach.</P>
            <P>We consider the nature of the information, the professional context in which it is used, the relevance of the communication, and the individual's rights and reasonable expectations.</P>
            <P>You can object to the use of your personal information for direct marketing at any time.</P>
          </Section>

          <Section title="Data retention">
            <P>We keep professional contact information only for as long as reasonably necessary for the purposes described above.</P>
            <P>If you opt out, we may retain the minimum information necessary on a suppression list so we can make sure we do not contact you again for marketing purposes.</P>
          </Section>

          <Section title="Sharing your information">
            <P>We do not sell your personal information.</P>
            <P>We may use trusted service providers where necessary to operate our website, email systems, CRM, scheduling, or other business tools.</P>
          </Section>

          <Section title="International processing">
            <P style={{ margin: 0 }}>Some of the services we use may process data outside the country where you are located. Where applicable, we take reasonable steps to use appropriate safeguards.</P>
          </Section>

          <Section title="Your rights">
            <P>Depending on the laws that apply to you, you may have rights including:</P>
            <List items={["Access to your personal information", "Correction of inaccurate information", "Deletion in certain circumstances", "Restriction of processing", "Objection to processing", "Data portability where applicable", "The right to complain to the relevant data protection authority"]} />
            <P style={{ margin: 0 }}>For direct marketing, you can object at any time.</P>
          </Section>

          <Section title="Contact">
            <div style={{ background: T.card, border: "1.5px solid " + T.border, borderRadius: "16px", padding: "24px", display: "grid", gap: "8px" }}>
              <p style={{ color: T.white, fontWeight: 700, fontSize: "16px", margin: 0 }}>AI For Every Role</p>
              <p style={{ margin: 0 }}>
                Email: <a href="mailto:samtheaicoach@gmail.com" style={{ color: T.orange, textDecoration: "none", fontWeight: 600 }}>samtheaicoach@gmail.com</a>
              </p>
              <p style={{ margin: 0 }}>
                Website: <a href="https://www.aiforeveryrole.com/" style={{ color: T.orange, textDecoration: "none", fontWeight: 600 }}>https://www.aiforeveryrole.com/</a>
              </p>
            </div>
          </Section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
