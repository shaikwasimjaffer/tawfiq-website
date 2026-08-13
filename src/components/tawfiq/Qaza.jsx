import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";

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
  // App State
  const [hasEstimated, setHasEstimated] = useState(false);
  const [totalOwed, setTotalOwed] = useState(0);

  // Modal & Wizard State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);

  // Global Settings
  const [gender, setGender] = useState("");
  const [currentAge, setCurrentAge] = useState(25);
  const [pubertyAge, setPubertyAge] = useState(12);
  const [subtractMenses, setSubtractMenses] = useState(false);

  // Consistency State
  const [prayerStatus, setPrayerStatus] = useState("consistent");
  const [prayingAge, setPrayingAge] = useState(18);

  // Estimation State
  const [scholarMode, setScholarMode] = useState("moderate");
  const [showScholarInfo, setShowScholarInfo] = useState(false);
  const [manualAdjustment, setManualAdjustment] = useState(0);
  const [dailyPace, setDailyPace] = useState(3);
  const [customPace, setCustomPace] = useState("");

  const [phases, setPhases] = useState([
    {
      id: 1,
      startAge: 12,
      endAge: 18,
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

  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";

    // Handle Escape key to close modal
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isModalOpen]);

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
    const breakdowns = [];
    const daysPerYear = gender === "female" && subtractMenses ? 281 : 365;

    if (prayerStatus === "never") {
      const years = currentAge - pubertyAge;
      if (years > 0) {
        const totalDays = years * daysPerYear;
        let phaseDebt = totalDays * 5;
        phaseDebt = Math.round(phaseDebt * SCHOLAR_MODIFIERS[scholarMode]);
        baseTotal += phaseDebt;

        breakdowns.push({
          id: "never-consistent",
          startAge: pubertyAge,
          endAge: currentAge,
          years,
          days: totalDays,
          debt: phaseDebt,
        });
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

        breakdowns.push({
          ...phase,
          years,
          days: totalDays,
          debt: phaseDebt,
        });
      });
    }

    let finalTotal = Math.max(0, baseTotal + manualAdjustment);
    let conf = 3;
    let detailPoints = prayerStatus === "consistent" ? phases.length : 2;

    if (prayerStatus === "consistent") {
      const hasVariedHabits = phases.some((p) =>
        Object.values(p.prayers).some((h) => h !== "Never"),
      );
      if (hasVariedHabits) detailPoints += 1;
      detailPoints += 1;
    }
    if (manualAdjustment !== 0) detailPoints += 1;

    if (detailPoints >= 4) conf = 5;
    else if (detailPoints >= 2) conf = 4;
    else conf = 3;

    let spread = 0.12;
    if (conf === 4) spread = 0.08;
    if (conf === 5) spread = 0.04;

    const low = Math.floor(finalTotal * (1 - spread));
    const high = Math.ceil(finalTotal * (1 + spread));

    return { baseTotal, finalTotal, breakdowns, conf, low, high };
  }, [
    phases,
    gender,
    subtractMenses,
    scholarMode,
    manualAdjustment,
    prayerStatus,
    currentAge,
    pubertyAge,
  ]);

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
    setIsModalOpen(false);
    setModalStep(1);

    const element = document.getElementById("qaza-tracker");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="qaza"
      className="relative bg-[#F0FDF4] py-24 md:py-32 overflow-hidden selection:bg-[#16A34A] selection:text-white"
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

      {/* 1. Header */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 pb-12 md:pb-16 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-['Newsreader',serif] font-light text-[clamp(2.5rem,5vw,5rem)] leading-[1.1] tracking-[-0.02em] text-green-950 mb-6"
          >
            Missed prayers don't have to stay{" "}
            <span className="italic font-normal text-[#16A34A]">
              unfinished.
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col items-center space-y-4"
          >
            <p className="font-['Manrope'] text-[clamp(1.1rem,1.5vw,1.25rem)] md:text-[clamp(1.25rem,2vw,1.5rem)] text-green-600 leading-[1.7] font-light max-w-xl">
              Recover your Qaza with clarity, structure, and consistency.
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-950 text-white font-['Manrope'] font-medium text-[clamp(0.875rem,1.5vw,1rem)] py-3.5 px-6 md:px-8 rounded-full hover:bg-[#16A34A] transition-colors duration-300 shadow-sm font-[clamp(0.875rem,1.5vw,1rem)]"
            >
              {hasEstimated ? "Update Estimate" : "Estimate Your Qaza"}
            </button>
          </motion.div>
        </div>
      </div>

      {/* 2. Tracker Reading */}
      <AnimatePresence initial={false}>
        {hasEstimated && (
          <motion.div
            id="qaza-tracker"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-2xl mx-auto px-6 md:px-10"
          >
            <div className="text-center space-y-6">
              {/* Eyebrow Label */}
              <p className="text-[11px] font-['Geist',sans-serif] tracking-[0.25em] uppercase text-green-600 font-semibold">
                The Journey
              </p>

              {/* Main Number */}
              <div className="flex items-baseline gap-4">
                <AnimatedNumber value={totalOwed} className="font-['Manrope'] font-light text-[clamp(4rem,10vw,6rem)] leading-[0.9] tracking-[-0.02em] text-green-950" />
                <p className="font-['Manrope'] text-2xl md:text-3xl text-green-700 italic font-light leading-[0.9]">
                  prayers remain.
                </p>
              </div>

              {/* Completion Timeline */}
              <p className="font-['Manrope'] text-[clamp(1.25rem,2vw,1.5rem)] text-green-900 font-light leading-[1.6] max-w-xl mx-auto">
                At your current pace, you will complete this journey in{" "}
                <span className="italic font-normal text-[#16A34A]">
                  {calculateHorizon(totalOwed)}
                </span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Luxury Editorial Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-green-950/60 backdrop-blur-[4px] z-40"
            />

            <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="custom-scrollbar bg-[#F0FDF4] border border-green-200/80 w-full max-w-[36rem] p-6 md:p-8 shadow-2xl relative pointer-events-auto text-left flex flex-col max-h-[90vh] overflow-y-auto"
                style={{ borderRadius: "0.5rem" }}
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-green-400 hover:text-green-800 transition-colors z-10 h-8 w-8 flex items-center justify-center rounded-hover:bg-green-100"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>

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
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-[10px] font-['Geist',sans-serif] tracking-[0.25em] uppercase text-green-500 font-semibold">
                          Step 1 of 3
                        </p>
                      </div>

                      <h3 className="font-['Newsreader',serif] font-medium text-[clamp(1.875rem,3vw,2.25rem)] md:text-[clamp(2.25rem,4vw,2.75rem)] text-green-950 mb-6 tracking-[-0.02em] leading-[1.2]">
                        Estimate Your Missed Prayers
                      </h3>
                      <p className="font-['Manrope'] text-[clamp(1rem,1.5vw,1.125rem)] text-green-600 leading-[1.7] mb-6">
                        Answer a few questions to build an accurate starting point.
                      </p>

                      <div className="space-y-10">
                        {/* Core Setup */}
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <label className="block font-['Manrope'] font-medium text-[clamp(0.875rem,1.5vw,1rem)] text-green-950 mb-3">
                              Select your gender
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                              {[
                                { id: "male", label: "Male" },
                                { id: "female", label: "Female" },
                              ].map((option) => (
                                <button
                                  key={option.id}
                                  onClick={() => {
                                    setGender(option.id);
                                    if (option.id === "male")
                                      setSubtractMenses(false);
                                  }}
                                  className={`w-full text-center px-4 py-3 border transition-colors duration-200 font-['Manrope'] text-[clamp(0.875rem,1.5vw,1rem)] cursor-pointer ${
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
                                <label className="flex items-center gap-3 cursor-pointer group">
                                  <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={subtractMenses}
                                    onChange={() =>
                                      setSubtractMenses(!subtractMenses)
                                    }
                                  />
                                  <div
                                    className={`w-4 h-4 flex items-center justify-center border transition-colors duration-200 ${
                                      subtractMenses
                                        ? "border-green-950 bg-green-950"
                                        : "border-green-200 bg-white/50 group-hover:border-[#16A34A]"
                                    }`}
                                  >
                                    {subtractMenses && (
                                      <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                      </svg>
                                    )}
                                  </div>
                                  <span className="font-['Manrope'] text-[clamp(0.875rem,1.5vw,1rem)] text-green-950">
                                    Exclude menstruation days
                                  </span>
                                </label>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Tactile Slider: Current Age */}
                          <div>
                            <div className="flex justify-between items-center mb-3">
                              <label className="font-['Manrope'] font-medium text-[clamp(0.875rem,1.5vw,1rem)] text-green-950">
                                Current Age?
                              </label>
                              <span className="font-['Manrope'] text-[clamp(0.875rem,1.5vw,1rem)] font-semibold text-[#16A34A]">
                                {currentAge}
                              </span>
                            </div>
                            <input
                              type="range"
                              min="9"
                              max="90"
                              step="1"
                              value={currentAge}
                              onChange={(e) =>
                                setCurrentAge(Number(e.target.value))
                              }
                              className="w-full accent-[#16A34A] bg-green-200 h-1.5 rounded-lg cursor-pointer"
                            />
                            <div className="flex justify-between text-[clamp(0.75rem,1.5vw,0.875rem)] text-green-500 font-['Manrope'] mt-1.5 tracking-wider font-semibold">
                              <span>9</span>
                              <span>90</span>
                            </div>
                          </div>

                          {/* Tactile Slider: Puberty Age */}
                          <div>
                            <div className="flex justify-between items-center mb-3">
                              <label className="font-['Manrope'] font-medium text-[clamp(0.875rem,1.5vw,1rem)] text-green-950">
                                Puberty Age?
                              </label>
                              <span className="font-['Manrope'] text-[clamp(0.875rem,1.5vw,1rem)] font-semibold text-[#16A34A]">
                                {pubertyAge}
                              </span>
                            </div>
                            <input
                              type="range"
                              min="9"
                              max={currentAge}
                              step="1"
                              value={pubertyAge}
                              onChange={(e) =>
                                setPubertyAge(Number(e.target.value))
                              }
                              className="w-full accent-[#16A34A] bg-green-200 h-1.5 rounded-lg cursor-pointer"
                            />
                            <div className="flex justify-between text-[clamp(0.75rem,1.5vw,0.875rem)] text-green-500 font-['Manrope'] mt-1.5 tracking-wider font-semibold">
                              <span>9</span>
                              <span>{currentAge}</span>
                            </div>
                          </div>

                          {/* Prayer Consistency Logic */}
                          <div className="pt-2">
                            <label className="block font-['Manrope'] font-medium text-[clamp(0.875rem,1.5vw,1rem)] text-green-950 mb-3">
                              Prayer Consistency
                            </label>

                            <div className="space-y-2 mb-5">
                              <label
                                className={`flex items-center gap-3 p-3 border cursor-pointer transition-colors ${
                                  prayerStatus === "consistent"
                                    ? "border-green-950 bg-green-950/5 font-medium"
                                    : "border-green-200 bg-white/50 hover:border-[#16A34A]"
                                }`}
                              >
                                <div
                                  className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                                    prayerStatus === "consistent"
                                      ? "border-green-950"
                                      : "border-green-400"
                                  }`}
                                >
                                  {prayerStatus === "consistent" && (
                                    <div className="w-2 h-2 bg-green-950 rounded-full" />
                                  )}
                                </div>
                                <input
                                  type="radio"
                                  className="hidden"
                                  name="prayerStatus"
                                  checked={prayerStatus === "consistent"}
                                  onChange={() => setPrayerStatus("consistent")}
                                />
                                <span className="font-['Manrope'] text-[clamp(0.875rem,1.5vw,1rem)] text-green-950">
                                  I began praying consistently
                                </span>
                              </label>

                              <label
                                className={`flex items-center gap-3 p-3 border cursor-pointer transition-colors ${
                                  prayerStatus === "never"
                                    ? "border-green-950 bg-green-950/5 font-medium"
                                    : "border-green-200 bg-white/50 hover:border-[#16A34A]"
                                }`}
                              >
                                <div
                                  className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                                    prayerStatus === "never"
                                      ? "border-green-950"
                                      : "border-green-400"
                                  }`}
                                >
                                  {prayerStatus === "never" && (
                                    <div className="w-2 h-2 bg-green-950 rounded-full" />
                                  )}
                                </div>
                                <input
                                  type="radio"
                                  className="hidden"
                                  name="prayerStatus"
                                  checked={prayerStatus === "never"}
                                  onChange={() => setPrayerStatus("never")}
                                />
                                <span className="font-['Manrope'] text-[clamp(0.875rem,1.5vw,1rem)] text-green-950">
                                  I have never prayed consistently
                                </span>
                              </label>
                            </div>

                            {/* Tactile Slider: Praying Age */}
                            <div
                              className={`transition-all duration-300 ${
                                prayerStatus === "never"
                                  ? "opacity-30 pointer-events-none grayscale"
                                  : "opacity-100"
                              }`}
                            >
                              <div className="flex justify-between items-center mb-3">
                                <label className="font-['Manrope'] font-medium text-[1.1rem] text-green-950">
                                  When did you begin praying consistently?
                                </label>
                                <span className="font-['Manrope'] text-lg font-semibold text-[#16A34A]">
                                  {prayingAge}
                                </span>
                              </div>
                              <input
                                type="range"
                                min={pubertyAge}
                                max={currentAge}
                                step="1"
                                value={prayingAge}
                                onChange={(e) =>
                                  setPrayingAge(Number(e.target.value))
                                }
                                disabled={prayerStatus === "never"}
                                className="w-full accent-[#16A34A] bg-green-200 h-1.5 rounded-lg cursor-pointer disabled:cursor-not-allowed"
                              />
                              <div className="flex justify-between text-[10px] text-green-500 font-['Manrope'] mt-1.5 tracking-wider font-semibold">
                                <span>{pubertyAge}</span>
                                <span>{currentAge}</span>
                              </div>
                            </div>
                          </div>

                          {/* Scholar Mode */}
                          <div className="pt-2">
                            <div className="flex justify-between items-center mb-3">
                              <label className="font-['Manrope'] font-medium text-[clamp(0.875rem,1.5vw,1rem)] text-green-950">
                                Calculation Method
                              </label>
                              <button
                                onClick={() =>
                                  setShowScholarInfo(!showScholarInfo)
                                }
                                className="text-[clamp(0.75rem,1.5vw,0.875rem)] uppercase tracking-widest font-['Manrope'] text-[#16A34A] hover:text-green-950 underline underline-offset-2 font-semibold cursor-pointer"
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
                                  <p className="text-[clamp(0.75rem,1.5vw,0.875rem)] text-green-700 font-['Manrope'] mb-3 p-3 bg-white/50 border border-green-200 font-light">
                                    Provides different estimation models based
                                    on varying fiqh assumptions. Does not
                                    dictate which opinion is correct.
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <div className="grid grid-cols-3 gap-2">
                              {["conservative", "moderate", "maximum"].map(
                                (mode) => (
                                  <button
                                    key={mode}
                                    onClick={() => setScholarMode(mode)}
                                    className={`py-3 text-[14px] font-['Manrope'] capitalize border transition-colors cursor-pointer ${
                                      scholarMode === mode
                                        ? "border-green-950 bg-green-950/5 font-medium text-green-950"
                                        : "border-green-200 text-green-700 hover:border-[#16A34A]"
                                    }`}
                                  >
                                    {mode}
                                  </button>
                                ),
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-green-200">
                          <button
                            onClick={() =>
                              setModalStep(
                                prayerStatus === "consistent" ? 2 : 3,
                              )
                            }
                            className="bg-green-950 text-white font-['Manrope'] text-[clamp(0.875rem,1.5vw,1rem)] font-medium tracking-tight py-3 px-8 rounded-full hover:bg-[#16A34A] transition-colors duration-300 shadow-sm cursor-pointer"
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
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-[10px] font-['Geist',sans-serif] tracking-[0.25em] uppercase text-green-500 font-semibold">
                          Step 2 of 3
                        </p>
                      </div>

                      <h3 className="font-['Newsreader',serif] font-medium text-[clamp(1.875rem,3vw,2.25rem)] md:text-[clamp(2.25rem,4vw,2.75rem)] text-green-950 mb-6 tracking-[-0.02em] leading-[1.2]">
                        Detail Your Journey
                      </h3>
                      <p className="font-['Manrope'] text-[clamp(1rem,1.5vw,1.125rem)] text-green-600 leading-[1.7] mb-6">
                        Break down the years between {pubertyAge} and{" "}
                        {prayingAge} to reflect when your habits changed.
                      </p>

                      <div className="space-y-6">
                        {phases.map((phase, index) => (
                          <div
                            key={phase.id}
                            className="p-5 border border-green-200 bg-white/50 relative"
                          >
                            {phases.length > 1 && (
                              <button
                                onClick={() => handleDeletePhase(index)}
                                className="absolute top-4 right-4 text-green-500 hover:text-red-500 transition-colors"
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </button>
                            )}

                            <h4 className="font-['Manrope'] text-[clamp(1rem,1.5vw,1.125rem)] font-medium text-green-950 mb-4">
                              Ages {phase.startAge} to {phase.endAge}
                            </h4>

                            {index < phases.length - 1 && (
                              <div className="mb-6">
                                <label className="block text-[clamp(0.75rem,1.5vw,0.875rem)] text-green-800 mb-2">
                                  Adjust End Age
                                </label>
                                <input
                                  type="range"
                                  min={phase.startAge + 1}
                                  max={phases[index + 1].endAge - 1}
                                  step="1"
                                  value={phase.endAge}
                                  onChange={(e) =>
                                    updatePhaseBoundary(index, e.target.value)
                                  }
                                  className="w-full accent-[#16A34A] bg-green-200 h-1.5 rounded-lg cursor-pointer"
                                />
                              </div>
                            )}

                            <div className="space-y-3">
                              {PRAYERS.map((prayer) => (
                                <div
                                  key={prayer}
                                  className="flex justify-between items-center bg-[#F0FDF4] p-2 px-3 border border-green-100"
                                >
                                  <span className="font-['Manrope'] font-medium text-green-900 text-[clamp(0.875rem,1.5vw,1rem)]">
                                    {prayer}
                                  </span>
                                  <select
                                    value={phase.prayers[prayer]}
                                    onChange={(e) =>
                                      updatePrayerHabit(
                                        index,
                                        prayer,
                                        e.target.value,
                                      )
                                    }
                                    className="bg-transparent text-[clamp(0.875rem,1.5vw,1rem)] text-green-800 font-['Manrope'] outline-none cursor-pointer"
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
                          className="w-full py-3 border border-dashed border-green-400 text-green-700 font-['Manrope'] text-[14px] hover:bg-green-100 transition-colors"
                        >
                          + Split into another phase
                        </button>

                        <div className="flex justify-between pt-6 border-t border-green-200">
                          <button
                            onClick={() => setModalStep(1)}
                            className="text-green-700 font-['Manrope'] text-[clamp(0.875rem,1.5vw,1rem)] font-medium hover:text-green-950 transition-colors"
                          >
                            Back
                          </button>
                          <button
                            onClick={() => setModalStep(3)}
                            className="bg-green-950 text-white font-['Manrope'] text-[clamp(0.875rem,1.5vw,1rem)] font-medium tracking-tight py-3 px-8 rounded-full hover:bg-[#16A34A] transition-colors duration-300 shadow-sm"
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
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-[10px] font-['Geist',sans-serif] tracking-[0.25em] uppercase text-green-500 font-semibold">
                          Step 3 of 3
                        </p>
                      </div>

                      <h3 className="font-['Newsreader',serif] font-medium text-[clamp(1.875rem,3vw,2.25rem)] md:text-[clamp(2.25rem,4vw,2.75rem)] text-green-950 mb-6 tracking-[-0.02em] leading-[1.2]">
                        Pace & Refinement
                      </h3>
                      <p className="font-['Manrope'] text-[clamp(1rem,1.5vw,1.125rem)] text-green-600 leading-[1.7] mb-6">
                        Finalize your plan by setting your daily recovery pace
                        and any manual adjustments.
                      </p>

                      <div className="space-y-8">
                        <div>
                          <label className="block font-['Manrope'] font-medium text-[clamp(0.875rem,1.5vw,1rem)] text-green-950 mb-3">
                            Manual Adjustment (Optional)
                          </label>
                          <p className="text-[clamp(0.75rem,1.5vw,0.875rem)] text-green-600 mb-3">
                            Add or subtract specific prayers if you have
                            previously made some up.
                          </p>
                          <input
                            type="number"
                            value={manualAdjustment}
                            onChange={(e) =>
                              setManualAdjustment(Number(e.target.value))
                            }
                            className="w-full bg-white/50 border border-green-200 p-3 font-['Manrope'] text-green-950 text-[clamp(0.875rem,1.5vw,1rem)] outline-none focus:border-[#16A34A]"
                            placeholder="e.g. -500"
                          />
                        </div>

                        <div>
                          <label className="block font-['Manrope'] font-medium text-[clamp(0.875rem,1.5vw,1rem)] text-green-950 mb-3">
                            Daily Pace
                          </label>
                          <p className="text-[clamp(0.75rem,1.5vw,0.875rem)] text-green-600 mb-3">
                            How many Qaza prayers do you plan to make up each
                            day?
                          </p>
                          <div className="grid grid-cols-4 gap-2 mb-3">
                            {[1, 3, 5, 10].map((pace) => (
                              <button
                                key={pace}
                                onClick={() => {
                                  setDailyPace(pace);
                                  setCustomPace("");
                                }}
                                className={`py-2 text-[clamp(0.875rem,1.5vw,1rem)] font-['Manrope'] border transition-colors ${
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
                            className="w-full bg-white/50 border border-green-200 p-3 font-['Manrope'] text-green-950 text-[clamp(0.875rem,1.5vw,1rem)] outline-none focus:border-[#16A34A]"
                            placeholder="Or enter a custom number..."
                          />
                        </div>

                        <div className="flex justify-between pt-6 border-t border-green-200">
                          <button
                            onClick={() =>
                              setModalStep(
                                prayerStatus === "consistent" ? 2 : 1,
                              )
                            }
                            className="text-green-700 font-['Manrope'] text-[clamp(0.875rem,1.5vw,1rem)] font-medium hover:text-green-950 transition-colors"
                          >
                            Back
                          </button>
                          <button
                            onClick={handleCommitEstimate}
                            className="bg-[#16A34A] text-white font-['Manrope'] text-[clamp(0.875rem,1.5vw,1rem)] font-medium tracking-tight py-3 px-8 rounded-full hover:bg-green-600 transition-colors duration-300 shadow-sm"
                          >
                            Finalize Estimate
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
