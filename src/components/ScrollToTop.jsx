import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls the window to the top whenever the route changes, so cross-page
// navigation (e.g. Home -> "/teams") always opens at the top instead of
// preserving the previous page's scroll position.
//
// Exception: if the destination includes an intentional #anchor (e.g.
// "/#about"), that anchor is scrolled into view instead of the page top.
//
// The site sets "html { scroll-behavior: smooth }" globally, which means a
// plain window.scrollTo(0, 0) would animate instead of jumping instantly.
// We explicitly request "instant" behavior here so a page-to-page route
// change always lands at the top immediately and reliably.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el && el.scrollIntoView) {
        // Give the destination page a moment to render before scrolling.
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
