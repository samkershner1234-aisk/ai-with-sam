import { useEffect, useRef, useState } from "react";

// Theme tokens matched to the existing site.
export const T = {
  navy: "#0F172A",
  panel: "#111C33",
  card: "#0B1526",
  border: "#1E293B",
  orange: "#F97316",
  white: "#FFFFFF",
  grey: "#CBD5E1",
  greyDim: "#94A3B8",
  radius: "16px",
  radiusPill: "50px",
  font: "'Inter', sans-serif",
  maxWidth: "720px",
};

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = () => setReduced(mq.matches);
    fn();
    mq.addEventListener ? mq.addEventListener("change", fn) : mq.addListener(fn);
    return () => (mq.removeEventListener ? mq.removeEventListener("change", fn) : mq.removeListener(fn));
  }, []);
  return reduced;
}

export function Shell({ children }) {
  return (
    <div style={{ background: T.navy, minHeight: "100vh", fontFamily: T.font, color: T.white }}>
      <div style={{ maxWidth: T.maxWidth, margin: "0 auto", padding: "0 20px", paddingTop: "32px", paddingBottom: "80px" }}>
        {children}
      </div>
    </div>
  );
}

export function Card({ children, style }) {
  return (
    <div style={{ background: T.card, border: "1px solid " + T.border, borderRadius: T.radius, padding: "24px", ...style }}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }) {
  return (
    <div style={{ color: T.orange, fontWeight: 700, fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px" }}>
      {children}
    </div>
  );
}

export function PrimaryButton({ children, disabled, onClick, type = "button", style, ...rest }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? "#3F2A18" : T.orange,
        color: disabled ? "#B98A5E" : T.white,
        fontWeight: 700,
        fontSize: "16px",
        padding: "14px 26px",
        minHeight: "48px",
        border: "none",
        borderRadius: T.radiusPill,
        cursor: disabled ? "not-allowed" : "pointer",
        width: "100%",
        transition: "background 0.15s ease",
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, onClick, style, ...rest }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: "transparent",
        color: T.grey,
        fontWeight: 600,
        fontSize: "15px",
        padding: "14px 20px",
        minHeight: "48px",
        border: "1px solid " + T.border,
        borderRadius: T.radiusPill,
        cursor: "pointer",
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ProgressBar({ current, total, reduced }) {
  const pct = Math.max(0, Math.min(100, (current / total) * 100));
  return (
    <div style={{ marginBottom: "24px" }}>
      <div style={{ color: T.greyDim, fontSize: "13px", fontWeight: 600, marginBottom: "8px" }} aria-live="polite">
        Question {current} of {total}
      </div>
      <div
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        style={{ height: "6px", background: T.border, borderRadius: "999px", overflow: "hidden" }}
      >
        <div style={{ height: "100%", width: pct + "%", background: T.orange, borderRadius: "999px", transition: reduced ? "none" : "width 0.3s ease" }} />
      </div>
    </div>
  );
}

export function OptionCard({ selected, onClick, children, id }) {
  return (
    <button
      type="button"
      id={id}
      role="checkbox"
      aria-checked={selected}
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "100%",
        textAlign: "left",
        background: selected ? "rgba(249,115,22,0.10)" : T.panel,
        border: "2px solid " + (selected ? T.orange : T.border),
        borderRadius: "12px",
        padding: "16px",
        minHeight: "56px",
        color: T.white,
        fontSize: "15px",
        fontWeight: 500,
        cursor: "pointer",
        marginBottom: "10px",
        transition: "border-color 0.15s ease, background 0.15s ease",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          flex: "0 0 auto",
          width: "22px",
          height: "22px",
          borderRadius: "6px",
          border: "2px solid " + (selected ? T.orange : T.greyDim),
          background: selected ? T.orange : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: T.white,
          fontSize: "14px",
          fontWeight: 800,
          lineHeight: 1,
        }}
      >
        {selected ? "\u2713" : ""}
      </span>
      <span>{children}</span>
    </button>
  );
}

export function useHeadingFocus(dep) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.focus({ preventScroll: false });
    }
  }, [dep]);
  return ref;
}

export function escapeText(s) {
  return String(s == null ? "" : s);
}
