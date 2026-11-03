import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const getHashId = (hash) => {
  const rawId = hash.slice(1);
  try {
    return decodeURIComponent(rawId);
  } catch {
    return rawId;
  }
};

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Preserve scroll position on browser back/forward navigation
    if (navigationType === "POP") return;

    if (hash) {
      const id = getHashId(hash);
      const scrollToTarget = () => {
        let el = document.getElementById(id);
        // Fallback to parent section if sub-topic ID is not immediately found
        if (!el && id.startsWith("academy-")) {
          el = document.getElementById("academy");
        } else if (!el && id.startsWith("quran-")) {
          el = document.getElementById("quran");
        }

        if (el) {
          const prefersReducedMotion =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
          return true;
        }
        return false;
      };

      if (!scrollToTarget()) {
        const timer1 = window.setTimeout(() => {
          if (!scrollToTarget()) {
            window.setTimeout(scrollToTarget, 250);
          }
        }, 80);
        return () => window.clearTimeout(timer1);
      }
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash, navigationType]);

  return null;
}
