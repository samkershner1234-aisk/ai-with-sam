import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls the window to the top whenever the route changes, so cross-page
// navigation (e.g. Home -> "/teams") always opens at the top instead of
// preserving the previous page's scroll position.
//
// Exception: if the destination includes an intentional #anchor (e.g.
// "/#about"), that anchor is scrolled into view instead of the page top.
//
// The site sets "html { scroll-behavior: smooth }" globally. The "auto"
// behavior used by a plain scrollTo(0, 0) call respects that CSS setting,
// which can turn a route change into a slow (or unreliable) animated
// scroll instead of landing at the top immediately. We briefly disable
// smooth scrolling on the root element so the jump to top is instant and
// reliable, then restore the CSS setting right after.
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
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previousScrollBehavior;
  }, [pathname, hash]);

  return null;
}
