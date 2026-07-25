import Desk from "./Desk";
import Window from "./Window";
import Phone from "./Phone";
import PrayerMat from "./PrayerMat";
import ClosedQuran from "./ClosedQuran";
import Clock from "./Clock";
import Sunlight from "./Sunlight";
import DustParticles from "./DustParticles";

export default function Room({ progress }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background Wall */}
      <div className="absolute inset-0 bg-[#F7F3EC]" />

      {/* Window Light */}
      <Sunlight progress={progress} />

      {/* Floating Dust */}
      <DustParticles progress={progress} />

      {/* Window */}
      <Window progress={progress} />

      {/* Wall Clock */}
      <Clock progress={progress} />

      {/* Desk */}
      <Desk />

      {/* Prayer Mat */}
      <PrayerMat progress={progress} />

      {/* Closed Quran */}
      <ClosedQuran progress={progress} />

      {/* Phone */}
      <Phone progress={progress} />

      {/* Dark vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
    </div>
  );
}
