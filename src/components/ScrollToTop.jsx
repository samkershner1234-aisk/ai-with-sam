import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls the window to the top whenever the route changes, so cross-page
// navigation (e.g. Home -> "/teams") always opens at the top instead of
// preserving the previous page's scroll position.
//
// Exception: if the destination includes an intentional #anchor (e.g.
// "/#about"), that anchor is scrolled into view instead of the page top.
//
// The site sets "html { scroll-behavior: smooth }" globally. Under that
// rule, a plain scrollTo(0, 0) call (which uses the "auto" behavior) is
// itself animated, which is unreliable for a page-to-page route change and
// can leave the new page scrolled to the previous page's position. We
// disable the CSS smooth-scroll default once, in favour of only ever
// requesting smooth scrolling explicitly (as we already do for anchor
// links below via the { behavior: "smooth" } option, which always wins
// over the CSS default regardless of this setting).
if (typeof document !== "undefined") {
  document.documentElement.style.scrollBehavior = "auto";
}

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
