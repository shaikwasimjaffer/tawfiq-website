import HeroText from "./HeroText";
import HeroCTA from "./HeroCTA";

export default function Hero() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden bg-[#F7F3EC]">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-amber-200/40 blur-[140px]" />
      </div>

      {/* Soft Grain */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.png')]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <HeroText />

        <HeroCTA />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 flex flex-col items-center gap-3">
        <span className="text-xs uppercase tracking-[0.4em] text-neutral-500">
          Scroll
        </span>

        <div className="h-12 w-[1px] bg-gradient-to-b from-neutral-400 to-transparent" />
      </div>
    </section>
  );
}
