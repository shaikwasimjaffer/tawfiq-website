import { useEffect, useRef, useState } from "react";

import "./drift.css";

import Room from "../../shared/room/Room";
import Timeline from "./Timeline";
import Narrative from "./Narrative";

export default function Drift() {
  const sectionRef = useRef(null);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();

      const scrollable = rect.height - window.innerHeight;

      const current = Math.min(Math.max(-rect.top, 0), scrollable);

      setProgress(current / scrollable);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="drift-section">
      <div className="drift-sticky">
        {/* Entire Environment */}
        <Room progress={progress} />

        {/* Story Events */}
        <Timeline progress={progress} />

        {/* Text */}
        <Narrative progress={progress} />
      </div>
    </section>
  );
}
