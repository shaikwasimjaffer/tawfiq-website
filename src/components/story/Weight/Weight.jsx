import { useMemo } from "react";
import WeightScene from "./WeightScene";
import WeightNarrative from "./WeightNarrative";

export default function Weight({ progress }) {
  const state = useMemo(() => {
    return {
      roomDarkness: Math.min(progress * 1.2, 1),
      notificationOpacity: Math.max(0, 1 - progress * 2),
      calendarProgress: progress,
    };
  }, [progress]);

  return (
    <section className="relative h-[300vh] bg-[#F4EFE7]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <WeightScene state={state} />
        <WeightNarrative progress={progress} />
      </div>
    </section>
  );
}
