import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import { Sparkles } from "lucide-react";

// Premium Number Animation Hook
function AnimatedNumber({ value }) {
  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const currentVal = parseInt((node.textContent || "").replace(/,/g, ""), 10) || 0;

    const controls = animate(currentVal, value, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(val) {
        if (node) {
          node.textContent = Math.round(val).toLocaleString();
        }
      },
    });

    return () => controls.stop();
  }, [value]);

  return <span ref={nodeRef}>{value.toLocaleString()}</span>;
}

// Helper: Calculation Constants
const PRAYER_MULTIPLIERS = {
  never: 1.0,
  sometimes: 0.6,
  usually: 0.2,
  always: 0.0,
};

const SCHOLAR_MODIFIERS = {
  conservative: 0.85,
  moderate: 1.0,
  maximum: 1.15,
};

const PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
const HABITS = ["Never", "Sometimes", "Usually", "Always"];

export default function Qaza() {
  // Routing State
  const [isStandalone, setIsStandalone] = useState(false);

  // App State
  const [hasEstimated, setHasEstimated] = useState(false);
  const [totalOwed, setTotalOwed] = useState(0);
  const [modalStep, setModalStep] = useState(1);
  
  // Button State
  const [isClicked, setIsClicked] = useState(false);

  // Check if we are in the "New Tab" Full Form view
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#qaza-calculator") {
      setIsStandalone(true);
      // Lock background scrolling just in case the original page is long
      document.body.style.overflow = "hidden";
    }
  }, []);

  // Global Settings
  const [gender, setGender] = useState("");
  const [currentAge, setCurrentAge] = useState(0);
  const [pubertyAge, setPubertyAge] = useState(0);
  const [subtractMenses, setSubtractMenses] = useState(false);

  // Consistency State
  const [prayerStatus, setPrayerStatus] = useState("consistent");
  const [prayingAge, setPrayingAge] = useState(0);

  // Estimation State
  const [scholarMode, setScholarMode] = useState("moderate");
  const [showScholarInfo, setShowScholarInfo] = useState(false);
  const [manualAdjustment, setManualAdjustment] = useState(0);
  const [dailyPace, setDailyPace] = useState(3);
  const [customPace, setCustomPace] = useState("");

  const [phases, setPhases] = useState([
    {
      id: 1,
      startAge: 0,
      endAge: 0,
      prayers: {
        Fajr: "Never",
        Dhuhr: "Never",
        Asr: "Never",
        Maghrib: "Never",
        Isha: "Never",
      },
    },
  ]);

  // --- Core Validation & Dependency Logic ---
  useEffect(() => {
    if (pubertyAge > currentAge) setPubertyAge(currentAge);
    if (prayingAge > currentAge) setPrayingAge(currentAge);
    if (prayingAge < pubertyAge) setPrayingAge(pubertyAge);
  }, [currentAge, pubertyAge, prayingAge]);

  useEffect(() => {
    if (prayerStatus === "never") return;

    setPhases((prev) => {
      const safePuberty = Math.min(pubertyAge, currentAge);
      const endLimit = Math.max(safePuberty, Math.min(prayingAge, currentAge));

      let newP = prev.map((p) => ({ ...p }));

      newP[0].startAge = safePuberty;

      for (let i = 0; i < newP.length; i++) {
        if (i > 0) newP[i].startAge = newP[i - 1].endAge;
        if (newP[i].endAge < newP[i].startAge)
          newP[i].endAge = newP[i].startAge;
        if (newP[i].endAge > endLimit) newP[i].endAge = endLimit;
      }

      newP[newP.length - 1].endAge = endLimit;

      for (let i = newP.length - 1; i > 0; i--) {
        if (newP[i].startAge > newP[i].endAge) {
          newP[i].startAge = newP[i].endAge;
          newP[i - 1].endAge = newP[i].startAge;
        }
      }

      newP[0].startAge = safePuberty;

      if (JSON.stringify(prev) === JSON.stringify(newP)) return prev;
      return newP;
    });
  }, [currentAge, pubertyAge, prayingAge, prayerStatus]);

  // --- Helpers for Phase Management ---
  const handleAddPhase = () => {
    setPhases((prev) => {
      const last = prev[prev.length - 1];
      if (last.endAge - last.startAge <= 1) {
        alert("This phase is too short to divide further.");
        return prev;
      }
      const mid = Math.floor((last.startAge + last.endAge) / 2);
      const newPhases = [...prev];
      newPhases[newPhases.length - 1] = { ...last, endAge: mid };
      newPhases.push({
        id: Date.now(),
        startAge: mid,
        endAge: last.endAge,
        prayers: { ...last.prayers },
      });
      return newPhases;
    });
  };

  const handleDeletePhase = (indexToRemove) => {
    if (phases.length <= 1) return;
    setPhases((prev) => {
      const newPhases = [...prev];
      if (indexToRemove === 0) {
        newPhases[1].startAge = newPhases[0].startAge;
      } else {
        newPhases[indexToRemove - 1].endAge = newPhases[indexToRemove].endAge;
      }
      newPhases.splice(indexToRemove, 1);
      return newPhases;
    });
  };

  const updatePhaseBoundary = (index, value) => {
    const val = parseInt(value) || 0;
    setPhases((prev) => {
      const newP = prev.map((p) => ({ ...p }));
      if (index < newP.length - 1) {
        const minEnd = newP[index].startAge;
        const maxEnd = newP[index + 1].endAge;
        const clamped = Math.max(minEnd, Math.min(val, maxEnd));

        newP[index].endAge = clamped;
        newP[index + 1].startAge = clamped;
      }
      return newP;
    });
  };

  const updatePrayerHabit = (phaseIndex, prayer, habit) => {
    setPhases((prev) => {
      const newP = [...prev];
      newP[phaseIndex].prayers = {
        ...newP[phaseIndex].prayers,
        [prayer]: habit,
      };
      return newP;
    });
  };

  // --- Core Calculation Logic ---
  const estimates = useMemo(() => {
    let baseTotal = 0;
    const daysPerYear = gender === "female" && subtractMenses ? 281 : 365;

    if (prayerStatus === "never") {
      const years = currentAge - pubertyAge;
      if (years > 0) {
        const totalDays = years * daysPerYear;
        let phaseDebt = totalDays * 5;
        phaseDebt = Math.round(phaseDebt * SCHOLAR_MODIFIERS[scholarMode]);
        baseTotal += phaseDebt;
      }
    } else {
      phases.forEach((phase) => {
        const years = phase.endAge - phase.startAge;
        if (years <= 0) return;

        const totalDays = years * daysPerYear;
        let phaseDebt = 0;

        PRAYERS.forEach((prayer) => {
          const habit = phase.prayers[prayer];
          const multiplier = PRAYER_MULTIPLIERS[habit.toLowerCase()];
          phaseDebt += totalDays * multiplier;
        });

        phaseDebt = Math.round(phaseDebt * SCHOLAR_MODIFIERS[scholarMode]);
        baseTotal += phaseDebt;
      });
    }

    let finalTotal = Math.max(0, baseTotal + manualAdjustment);
    return { baseTotal, finalTotal };
  }, [phases, gender, subtractMenses, scholarMode, manualAdjustment, prayerStatus, currentAge, pubertyAge]);

  const activePace = customPace ? parseInt(customPace) || dailyPace : dailyPace;

  const calculateHorizon = (total) => {
    if (total <= 0 || activePace <= 0) return "—";
    const daysRemaining = total / activePace;
    const date = new Date();
    date.setDate(date.getDate() + daysRemaining);
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  const handleCommitEstimate = () => {
    setTotalOwed(estimates.finalTotal);
    setHasEstimated(true);
    setModalStep(1);
    
    // Scroll the fixed container to top
    const container = document.getElementById("qaza-standalone-container");
    if (container) container.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenFormNewTab = () => {
    // Add glow click effect before opening
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      const url = new URL(window.location.href);
      url.hash = "qaza-calculator";
      window.open(url.toString(), "_blank", "noopener,noreferrer");
    }, 200);
  };

  // ==========================================
  // UI: FULL SCREEN FORM (NEW TAB)
  // ==========================================
  if (isStandalone) {
    return (
      <div 
        id="qaza-standalone-container"
        className="fixed inset-0 z-[9999] w-screen h-screen bg-[#F0FDF4] flex flex-col selection:bg-[#16A34A] selection:text-white overflow-y-auto overflow-x-hidden"
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .custom-scrollbar::-webkit-scrollbar { width: 8px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background-color: #86EFAC;
                border-radius: 999px;
                border: 2px solid #F0FDF4;
                background-clip: padding-box; 
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #22C55E; }
            .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #86EFAC transparent; }
          `,
          }}
        />

        <div className="w-full flex-grow pt-16 pb-24 px-6 md:px-12 lg:px-20">
          <AnimatePresence mode="wait">
            {!hasEstimated ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-6xl mx-auto relative"
              >
                <AnimatePresence mode="wait">
                  {/* --- STEP 1 --- */}
                  {modalStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="font-['Newsreader',serif] font-medium text-[clamp(2.5rem,4vw,3.5rem)] text-green-950 mb-6 tracking-[-0.02em] leading-[1.1]">
                        Estimate Your Missed Prayers
                      </h3>
                      <p className="font-['Manrope'] text-[clamp(1.125rem,2vw,1.25rem)] text-green-600 leading-[1.7] mb-12 max-w-2xl">
                        Answer a few questions to build an accurate starting point.
                      </p>

                      <div className="space-y-12">
                        {/* Core Setup */}
                        <div className="space-y-10">
                          <div className="space-y-4">
                            <label className="block font-['Manrope'] font-medium text-[clamp(1rem,2vw,1.125rem)] text-green-950 mb-4">
                              Select your gender
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                              {[
                                { id: "male", label: "Male" },
                                { id: "female", label: "Female" },
                              ].map((option) => (
                                <button
                                  key={option.id}
                                  onClick={() => {
                                    setGender(option.id);
                                    if (option.id === "male") setSubtractMenses(false);
                                  }}
                                  className={`w-full text-center px-6 py-4 border transition-colors duration-200 font-['Manrope'] text-[clamp(1rem,2vw,1.125rem)] cursor-pointer ${
                                    gender === option.id
                                      ? "border-green-950 bg-green-950/5 text-green-950 font-medium"
                                      : "border-green-200 bg-white/50 text-green-700 hover:border-[#16A34A]"
                                  }`}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <AnimatePresence>
                            {gender === "female" && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                              >
                                <label className="flex items-center gap-4 cursor-pointer group">
                                  <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={subtractMenses}
                                    onChange={() => setSubtractMenses(!subtractMenses)}
                                  />
                                  <div
                                    className={`w-5 h-5 flex items-center justify-center border transition-colors duration-200 ${
                                      subtractMenses
                                        ? "border-green-950 bg-green-950"
                                        : "border-green-200 bg-white/50 group-hover:border-[#16A34A]"
                                    }`}
                                  >
                                    {subtractMenses && (
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                      </svg>
                                    )}
                                  </div>
                                  <span className="font-['Manrope'] text-[clamp(1rem,2vw,1.125rem)] text-green-950">
                                    Exclude menstruation days
                                  </span>
                                </label>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Tactile Slider: Current Age */}
                          <div>
                            <div className="flex justify-between items-center mb-4">
                              <label className="font-['Manrope'] font-medium text-[clamp(1rem,2vw,1.125rem)] text-green-950">
                                Current Age?
                              </label>
                              <span className="font-['Manrope'] text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-[#16A34A]">
                                {currentAge}
                              </span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="90"
                              step="1"
                              value={currentAge}
                              onChange={(e) => setCurrentAge(Number(e.target.value))}
                              className="w-full accent-[#16A34A] bg-green-200 h-2 rounded-lg cursor-pointer"
                            />
                            <div className="flex justify-between text-[clamp(0.875rem,1.5vw,1rem)] text-green-500 font-['Manrope'] mt-2 tracking-wider font-semibold">
                              <span>0</span>
                              <span>90</span>
                            </div>
                          </div>

                          {/* Tactile Slider: Puberty Age */}
                          <div>
                            <div className="flex justify-between items-center mb-4">
                              <label className="font-['Manrope'] font-medium text-[clamp(1rem,2vw,1.125rem)] text-green-950">
                                Puberty Age?
                              </label>
                              <span className="font-['Manrope'] text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-[#16A34A]">
                                {pubertyAge}
                              </span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max={Math.max(1, currentAge)}
                              step="1"
                              value={pubertyAge}
                              onChange={(e) => setPubertyAge(Number(e.target.value))}
                              className="w-full accent-[#16A34A] bg-green-200 h-2 rounded-lg cursor-pointer"
                            />
                            <div className="flex justify-between text-[clamp(0.875rem,1.5vw,1rem)] text-green-500 font-['Manrope'] mt-2 tracking-wider font-semibold">
                              <span>0</span>
                              <span>{Math.max(1, currentAge)}</span>
                            </div>
                          </div>

                          {/* Prayer Consistency Logic */}
                          <div className="pt-4">
                            <label className="block font-['Manrope'] font-medium text-[clamp(1rem,2vw,1.125rem)] text-green-950 mb-4">
                              Prayer Consistency
                            </label>

                            <div className="space-y-3 mb-8">
                              <label
                                className={`flex items-center gap-4 p-4 border cursor-pointer transition-colors ${
                                  prayerStatus === "consistent" ? "border-green-950 bg-green-950/5 font-medium" : "border-green-200 bg-white/50 hover:border-[#16A34A]"
                                }`}
                              >
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${prayerStatus === "consistent" ? "border-green-950" : "border-green-400"}`}>
                                  {prayerStatus === "consistent" && <div className="w-2.5 h-2.5 bg-green-950 rounded-full" />}
                                </div>
                                <input
                                  type="radio"
                                  className="hidden"
                                  name="prayerStatus"
                                  checked={prayerStatus === "consistent"}
                                  onChange={() => setPrayerStatus("consistent")}
                                />
                                <span className="font-['Manrope'] text-[clamp(1rem,2vw,1.125rem)] text-green-950">
                                  I began praying consistently
                                </span>
                              </label>

                              <label
                                className={`flex items-center gap-4 p-4 border cursor-pointer transition-colors ${
                                  prayerStatus === "never" ? "border-green-950 bg-green-950/5 font-medium" : "border-green-200 bg-white/50 hover:border-[#16A34A]"
                                }`}
                              >
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${prayerStatus === "never" ? "border-green-950" : "border-green-400"}`}>
                                  {prayerStatus === "never" && <div className="w-2.5 h-2.5 bg-green-950 rounded-full" />}
                                </div>
                                <input
                                  type="radio"
                                  className="hidden"
                                  name="prayerStatus"
                                  checked={prayerStatus === "never"}
                                  onChange={() => setPrayerStatus("never")}
                                />
                                <span className="font-['Manrope'] text-[clamp(1rem,2vw,1.125rem)] text-green-950">
                                  I have never prayed consistently
                                </span>
                              </label>
                            </div>

                            {/* Tactile Slider: Praying Age */}
                            <AnimatePresence>
                              {prayerStatus === "consistent" && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pb-2">
                                    <div className="flex justify-between items-center mb-4">
                                      <label className="font-['Manrope'] font-medium text-[clamp(1rem,2vw,1.125rem)] text-green-950">
                                        When did you begin praying consistently?
                                      </label>
                                      <span className="font-['Manrope'] text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-[#16A34A]">
                                        {prayingAge}
                                      </span>
                                    </div>
                                    <input
                                      type="range"
                                      min={pubertyAge}
                                      max={Math.max(pubertyAge + 1, currentAge)}
                                      step="1"
                                      value={prayingAge}
                                      onChange={(e) => setPrayingAge(Number(e.target.value))}
                                      className="w-full accent-[#16A34A] bg-green-200 h-2 rounded-lg cursor-pointer"
                                    />
                                    <div className="flex justify-between text-[clamp(0.875rem,1.5vw,1rem)] text-green-500 font-['Manrope'] mt-2 tracking-wider font-semibold">
                                      <span>{pubertyAge}</span>
                                      <span>{Math.max(pubertyAge + 1, currentAge)}</span>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Scholar Mode */}
                          <div className="pt-4">
                            <div className="flex justify-between items-center mb-4">
                              <label className="font-['Manrope'] font-medium text-[clamp(1rem,2vw,1.125rem)] text-green-950">
                                Calculation Method
                              </label>
                              <button
                                onClick={() => setShowScholarInfo(!showScholarInfo)}
                                className="text-[clamp(0.875rem,1.5vw,1rem)] uppercase tracking-widest font-['Manrope'] text-[#16A34A] hover:text-green-950 underline underline-offset-2 font-semibold cursor-pointer"
                              >
                                Learn More
                              </button>
                            </div>

                            <AnimatePresence>
                              {showScholarInfo && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="overflow-hidden"
                                >
                                  <p className="text-[clamp(0.875rem,1.5vw,1rem)] text-green-700 font-['Manrope'] mb-4 p-4 bg-white/50 border border-green-200 font-light">
                                    Provides different estimation models based on varying fiqh assumptions. Does not dictate which opinion is correct.
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <div className="grid grid-cols-3 gap-3">
                              {["conservative", "moderate", "maximum"].map((mode) => (
                                <button
                                  key={mode}
                                  onClick={() => setScholarMode(mode)}
                                  className={`py-4 text-[clamp(0.875rem,1.5vw,1rem)] font-['Manrope'] capitalize border transition-colors cursor-pointer ${
                                    scholarMode === mode
                                      ? "border-green-950 bg-green-950/5 font-medium text-green-950"
                                      : "border-green-200 text-green-700 hover:border-[#16A34A]"
                                  }`}
                                >
                                  {mode}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end pt-8 border-t border-green-200">
                          <button
                            onClick={() => setModalStep(prayerStatus === "consistent" ? 2 : 3)}
                            className="bg-green-950 text-white font-['Manrope'] text-[clamp(1rem,1.5vw,1.125rem)] font-medium tracking-tight py-4 px-10 rounded-full hover:bg-[#16A34A] transition-colors duration-300 shadow-sm cursor-pointer"
                          >
                            Next Step
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* --- STEP 2: Phased Habits --- */}
                  {modalStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="font-['Newsreader',serif] font-medium text-[clamp(2.5rem,4vw,3.5rem)] text-green-950 mb-6 tracking-[-0.02em] leading-[1.1]">
                        Detail Your Journey
                      </h3>
                      <p className="font-['Manrope'] text-[clamp(1.125rem,2vw,1.25rem)] text-green-600 leading-[1.7] mb-12 max-w-2xl">
                        Break down the years between {pubertyAge} and {prayingAge} to reflect when your habits changed.
                      </p>

                      <div className="space-y-8">
                        {phases.map((phase, index) => (
                          <div key={phase.id} className="p-6 md:p-8 border border-green-200 bg-white/50 relative">
                            {phases.length > 1 && (
                              <button
                                onClick={() => handleDeletePhase(index)}
                                className="absolute top-6 right-6 text-green-500 hover:text-red-500 transition-colors"
                              >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </button>
                            )}

                            <h4 className="font-['Manrope'] text-[clamp(1.125rem,2vw,1.25rem)] font-medium text-green-950 mb-6">
                              Ages {phase.startAge} to {phase.endAge}
                            </h4>

                            {index < phases.length - 1 && (
                              <div className="mb-8">
                                <label className="block text-[clamp(0.875rem,1.5vw,1rem)] text-green-800 mb-3">
                                  Adjust End Age
                                </label>
                                <input
                                  type="range"
                                  min={phase.startAge + 1}
                                  max={phases[index + 1].endAge - 1}
                                  step="1"
                                  value={phase.endAge}
                                  onChange={(e) => updatePhaseBoundary(index, e.target.value)}
                                  className="w-full accent-[#16A34A] bg-green-200 h-2 rounded-lg cursor-pointer"
                                />
                              </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {PRAYERS.map((prayer) => (
                                <div key={prayer} className="flex justify-between items-center bg-[#F0FDF4] p-3 px-4 border border-green-100">
                                  <span className="font-['Manrope'] font-medium text-green-900 text-[clamp(1rem,1.5vw,1.125rem)]">
                                    {prayer}
                                  </span>
                                  <select
                                    value={phase.prayers[prayer]}
                                    onChange={(e) => updatePrayerHabit(index, prayer, e.target.value)}
                                    className="bg-transparent text-[clamp(1rem,1.5vw,1.125rem)] text-green-800 font-['Manrope'] outline-none cursor-pointer"
                                  >
                                    {HABITS.map((habit) => (
                                      <option key={habit} value={habit}>
                                        {habit}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}

                        <button
                          onClick={handleAddPhase}
                          className="w-full py-4 border border-dashed border-green-400 text-green-700 font-['Manrope'] text-[clamp(1rem,1.5vw,1.125rem)] hover:bg-green-100 transition-colors"
                        >
                          + Split into another phase
                        </button>

                        <div className="flex justify-between pt-8 border-t border-green-200">
                          <button
                            onClick={() => setModalStep(1)}
                            className="text-green-700 font-['Manrope'] text-[clamp(1rem,1.5vw,1.125rem)] font-medium hover:text-green-950 transition-colors"
                          >
                            Back
                          </button>
                          <button
                            onClick={() => setModalStep(3)}
                            className="bg-green-950 text-white font-['Manrope'] text-[clamp(1rem,1.5vw,1.125rem)] font-medium tracking-tight py-4 px-10 rounded-full hover:bg-[#16A34A] transition-colors duration-300 shadow-sm"
                          >
                            Next Step
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* --- STEP 3: Final Tweaks --- */}
                  {modalStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="font-['Newsreader',serif] font-medium text-[clamp(2.5rem,4vw,3.5rem)] text-green-950 mb-6 tracking-[-0.02em] leading-[1.1]">
                        Pace & Refinement
                      </h3>
                      <p className="font-['Manrope'] text-[clamp(1.125rem,2vw,1.25rem)] text-green-600 leading-[1.7] mb-12 max-w-2xl">
                        Finalize your plan by setting your daily recovery pace and any manual adjustments.
                      </p>

                      <div className="space-y-10">
                        <div>
                          <label className="block font-['Manrope'] font-medium text-[clamp(1rem,2vw,1.125rem)] text-green-950 mb-3">
                            Manual Adjustment (Optional)
                          </label>
                          <p className="text-[clamp(0.875rem,1.5vw,1rem)] text-green-600 mb-4">
                            Add or subtract specific prayers if you have previously made some up.
                          </p>
                          <input
                            type="number"
                            value={manualAdjustment}
                            onChange={(e) => setManualAdjustment(Number(e.target.value))}
                            className="w-full bg-white/50 border border-green-200 p-4 font-['Manrope'] text-green-950 text-[clamp(1rem,1.5vw,1.125rem)] outline-none focus:border-[#16A34A]"
                            placeholder="e.g. -500"
                          />
                        </div>

                        <div>
                          <label className="block font-['Manrope'] font-medium text-[clamp(1rem,2vw,1.125rem)] text-green-950 mb-3">
                            Daily Pace
                          </label>
                          <p className="text-[clamp(0.875rem,1.5vw,1rem)] text-green-600 mb-4">
                            How many Qaza prayers do you plan to make up each day?
                          </p>
                          <div className="grid grid-cols-4 gap-3 mb-4">
                            {[1, 3, 5, 10].map((pace) => (
                              <button
                                key={pace}
                                onClick={() => {
                                  setDailyPace(pace);
                                  setCustomPace("");
                                }}
                                className={`py-4 text-[clamp(1rem,1.5vw,1.125rem)] font-['Manrope'] border transition-colors ${
                                  dailyPace === pace && !customPace
                                    ? "border-green-950 bg-green-950/5 font-medium text-green-950"
                                    : "border-green-200 text-green-700 hover:border-[#16A34A]"
                                }`}
                              >
                                {pace}
                              </button>
                            ))}
                          </div>
                          <input
                            type="number"
                            value={customPace}
                            onChange={(e) => setCustomPace(e.target.value)}
                            className="w-full bg-white/50 border border-green-200 p-4 font-['Manrope'] text-green-950 text-[clamp(1rem,1.5vw,1.125rem)] outline-none focus:border-[#16A34A]"
                            placeholder="Or enter a custom number..."
                          />
                        </div>

                        <div className="flex justify-between pt-8 border-t border-green-200">
                          <button
                            onClick={() => setModalStep(prayerStatus === "consistent" ? 2 : 1)}
                            className="text-green-700 font-['Manrope'] text-[clamp(1rem,1.5vw,1.125rem)] font-medium hover:text-green-950 transition-colors"
                          >
                            Back
                          </button>
                          <button
                            onClick={handleCommitEstimate}
                            className="bg-[#16A34A] text-white font-['Manrope'] text-[clamp(1rem,1.5vw,1.125rem)] font-medium tracking-tight py-4 px-10 rounded-full hover:bg-green-600 transition-colors duration-300 shadow-sm"
                          >
                            Finalize Estimate
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              // --- RESULT TRACKER (NEW TAB) ---
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl mx-auto text-center"
              >
                <div className="space-y-12 py-16">
                  <p className="text-xs md:text-sm font-['Geist',sans-serif] tracking-[0.25em] uppercase text-green-600 font-semibold">
                    The Journey
                  </p>

                  <div className="flex flex-col md:flex-row items-center md:items-baseline justify-center gap-4 md:gap-6">
                    <span className="font-['Newsreader',serif] font-medium text-[clamp(5rem,10vw,8rem)] leading-none tracking-[-0.04em] text-green-950">
                      <AnimatedNumber value={totalOwed} />
                    </span>
                    <span className="font-['Manrope'] text-[clamp(1.5rem,2.5vw,2.25rem)] text-green-700 italic font-light">
                      prayers remain.
                    </span>
                  </div>

                  <p className="font-['Manrope'] text-[clamp(1.25rem,2vw,1.5rem)] text-green-900 font-light leading-relaxed max-w-2xl mx-auto">
                    At your current pace, you will complete this journey in{" "}
                    <span className="italic font-medium text-[#16A34A]">
                      {calculateHorizon(totalOwed)}
                    </span>
                  </p>
                  
                  <div className="pt-8">
                    <button
                      onClick={() => setHasEstimated(false)}
                      className="bg-green-950 text-white font-['Manrope'] text-[clamp(1rem,1.5vw,1.125rem)] py-4 px-10 rounded-full hover:bg-[#16A34A] transition-colors duration-300 shadow-sm"
                    >
                      Recalculate Estimate
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // ==========================================
  // UI: LANDING PAGE SECTION
  // ==========================================
  return (
    <section id="qaza" className="relative bg-[#F0FDF4] py-24 md:py-32 overflow-hidden selection:bg-[#16A34A] selection:text-white">
      <div className="max-w-4xl mx-auto px-6 md:px-10 pb-12 md:pb-16 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-['Newsreader',serif] font-light text-3xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-[-0.02em] text-green-950 mb-6"
          >
            Missed prayers don't have to stay{" "}
            <span className="italic font-normal text-[#16A34A]">unfinished.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col items-center space-y-4"
          >
            <p className="font-['Manrope'] text-[clamp(1.1rem,1.5vw,1.25rem)] md:text-[clamp(1.25rem,2vw,1.5rem)] text-green-600 leading-[1.7] font-light max-w-xl mb-4">
              Recover your Qaza with clarity, structure, and consistency.
            </p>

            <div className="relative group inline-flex items-center justify-center pt-2">
              <div 
                className={`absolute inset-0 bg-[#16A34A] rounded-full blur-md transition-all duration-300 pointer-events-none mt-2 ${
                  isClicked ? "opacity-100 scale-110" : "opacity-0 group-hover:opacity-60"
                }`} 
              />
              
              <button
                onClick={handleOpenFormNewTab}
                data-state={isClicked ? "clicked" : undefined}
                className="glow-btn relative bg-green-950 text-white font-['Manrope'] font-medium text-[clamp(0.875rem,1.5vw,1rem)] py-3.5 px-6 md:px-8 rounded-full border border-[#16A34A]/30 shadow-[0_0_15px_rgba(21,128,61,0.4)] hover:shadow-[0_0_25px_rgba(21,128,61,0.7)] data-[state=clicked]:shadow-[0_0_40px_rgba(21,128,61,0.9)] hover:bg-[#15803D] transition-all duration-300 cursor-pointer z-10"
              >
                <span className="flex items-center justify-center gap-1.5">
                  Estimate Your Qaza
                  <Sparkles size={16} className="ml-1 opacity-90" />
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}