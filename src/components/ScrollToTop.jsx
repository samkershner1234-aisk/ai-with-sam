import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls the window to the top whenever the route changes, so cross-page
// navigation (e.g. Home -> "/teams") always opens at the top instead of
// preserving the previous page's scroll position.
//
// Exception: if the destination includes an intentional #anchor (e.g.
// "/#about"), that anchor is scrolled into view instead of the page top.
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
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
