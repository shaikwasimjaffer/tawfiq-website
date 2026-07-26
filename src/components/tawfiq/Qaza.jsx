import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";

const ACCENT = "#C89A52";

// Premium Number Animation Hook
function AnimatedNumber({ value }) {
  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const currentVal = parseInt(node.textContent.replace(/,/g, "")) || 0;

    const controls = animate(currentVal, value, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(val) {
        node.textContent = Math.round(val).toLocaleString();
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
  const [prayerStatus, setPrayerStatus] = useState("consistent"); // 'consistent' | 'never'
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

  // 1. Ensure Puberty Age & Praying Age never exceed Current Age logically
  useEffect(() => {
    if (pubertyAge > currentAge) setPubertyAge(currentAge);
    if (prayingAge > currentAge) setPrayingAge(currentAge);
    if (prayingAge < pubertyAge) setPrayingAge(pubertyAge);
  }, [currentAge, pubertyAge, prayingAge]);

  // 2. Cascade changes through Life Phases strictly left-to-right
  useEffect(() => {
    if (prayerStatus === "never") return;

    setPhases((prev) => {
      const safePuberty = Math.min(pubertyAge, currentAge);
      const endLimit = Math.max(safePuberty, Math.min(prayingAge, currentAge));

      let newP = prev.map((p) => ({ ...p }));

      // Step A: First phase must always start at Puberty Age
      newP[0].startAge = safePuberty;

      // Step B: Cascade constraints forward
      for (let i = 0; i < newP.length; i++) {
        if (i > 0) {
          newP[i].startAge = newP[i - 1].endAge;
        }
        if (newP[i].endAge < newP[i].startAge) {
          newP[i].endAge = newP[i].startAge;
        }
        if (newP[i].endAge > endLimit) {
          newP[i].endAge = endLimit;
        }
      }

      // Step C: The last phase MUST end exactly at the endLimit
      newP[newP.length - 1].endAge = endLimit;

      // Step D: Cascade backwards if locking the final phase squashed previous phases
      for (let i = newP.length - 1; i > 0; i--) {
        if (newP[i].startAge > newP[i].endAge) {
          newP[i].startAge = newP[i].endAge;
          newP[i - 1].endAge = newP[i].startAge;
        }
      }

      newP[0].startAge = safePuberty;

      if (JSON.stringify(prev) === JSON.stringify(newP)) {
        return prev;
      }
      return newP;
    });
  }, [currentAge, pubertyAge, prayingAge, prayerStatus]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
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

  const resetCalculator = () => {
    setGender("");
    setCurrentAge(25);
    setPubertyAge(12);
    setPrayingAge(18);
    setPrayerStatus("consistent");
    setSubtractMenses(false);
    setPhases([
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
    setScholarMode("moderate");
    setManualAdjustment(0);
    setDailyPace(3);
    setCustomPace("");
    setTotalOwed(0);
    setHasEstimated(false);
    setModalStep(1);
    setIsModalOpen(false);
  };

  return (
    <section className="relative bg-[#f9f7f2] h-auto pb-24 md:pb-32 overflow-hidden selection:bg-[#C89A52] selection:text-white">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #C8C1B6;
            border-radius: 999px;
            border: 2px solid #f9f7f2;
            background-clip: padding-box; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #A99F90; }
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #C8C1B6 transparent; }
        `,
        }}
      />

      {/* 1. Header */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 mb-12 md:mb-16 mt-12 md:mt-16">
        <div className="md:pl-20 text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-serif text-[clamp(2.5rem,5.5vw,4.8rem)] leading-[1.1] tracking-[-0.01em] text-[#1a1a1a]"
          >
            Missed prayers don't have to stay <br />
            <span className="italic font-normal text-[#C6A26B]">
              unfinished.
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-10 md:mt-12 max-w-xl pl-5"
          >
            <p className="font-serif text-[1.1rem] md:text-[1.2rem] text-[#1a1a1a] leading-[1.6]">
              Recover your Qaza with clarity, structure, and consistency.
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-12 bg-[#1a1a1a] text-white font-sans text-[11px] uppercase tracking-[0.2em] px-8 py-3.5 rounded-full hover:bg-[#C89A52] transition-colors duration-300 active:scale-95 shadow-sm"
            >
              {hasEstimated ? "Update Estimate" : "Estimate Your Qaza"}
            </button>
          </motion.div>
        </div>
      </div>

      {/* 2. Narrower container for reading the journey */}
      <div
        id="qaza-tracker"
        className="max-w-2xl mx-auto px-6 md:px-10 scroll-mt-24"
      >
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#9d9d9d] mb-4">
              The Journey
            </p>
            <div className="font-serif text-[5rem] md:text-[7rem] leading-[0.9] tracking-tight text-[#1a1a1a]">
              <AnimatedNumber value={hasEstimated ? totalOwed : 0} />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#8a8a8a] italic mt-4">
              prayers remain.
            </h2>
          </motion.div>
        </div>

        <AnimatePresence>
          {hasEstimated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="mb-16 text-center">
                <p className="font-serif text-[1.35rem] sm:text-[1.75rem] md:text-[2rem] text-[#1a1a1a] leading-[1.4] max-w-xl mx-auto">
                  At your current pace, you will complete this journey in{" "}
                  <span className="italic font-normal text-[#C6A26B] block mt-1 sm:inline sm:mt-0">
                    {calculateHorizon(totalOwed)}.
                  </span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Luxury Editorial Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-[#1a1a1a]/60 backdrop-blur-[4px] z-40"
            />

            <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="custom-scrollbar bg-[#f9f7f2] border border-[#e0e0e0] w-full max-w-[32rem] p-6 md:p-10 shadow-2xl relative pointer-events-auto text-left flex flex-col max-h-[90vh] overflow-y-auto"
                style={{ borderRadius: "0px" }}
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 text-[#9d9d9d] hover:text-[#1a1a1a] transition-colors z-10"
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
                        <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#9d9d9d]">
                          Step 1 of 3
                        </p>
                        <div className="flex items-center gap-1.5 text-[#C89A52]">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 15 15"></polyline>
                          </svg>
                          <span className="text-[9px] font-sans uppercase tracking-[0.15em] font-medium">
                            Takes ~2 mins
                          </span>
                        </div>
                      </div>

                      <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] mb-4 tracking-tight">
                        Estimate Your Missed Prayers
                      </h3>
                      <div className="font-serif text-[15px] text-[#666666] leading-[1.6] mb-8">
                        <p>
                          Answer a few questions to build an accurate starting
                          point.
                        </p>
                      </div>

                      <div className="space-y-10">
                        {/* Core Setup */}
                        <div className="space-y-6">
                          <div>
                            <label className="block font-serif text-[1.1rem] text-[#1a1a1a] mb-3">
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
                                  className={`w-full text-center px-4 py-3 border transition-colors duration-200 font-serif text-[15px] ${gender === option.id ? "border-[#1a1a1a] bg-[#1a1a1a]/5 text-[#1a1a1a]" : "border-[#e0e0e0] bg-white/50 text-[#666666] hover:border-[#C89A52]"}`}
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
                                    onChange={() =>
                                      setSubtractMenses(!subtractMenses)
                                    }
                                  />
                                  <div
                                    className={`w-5 h-5 flex items-center justify-center border transition-colors duration-200 ${subtractMenses ? "border-[#1a1a1a] bg-[#1a1a1a]" : "border-[#e0e0e0] bg-white/50 group-hover:border-[#C89A52]"}`}
                                  >
                                    {subtractMenses && (
                                      <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                      </svg>
                                    )}
                                  </div>
                                  <span className="font-serif text-[15px] text-[#1a1a1a]">
                                    Exclude menstruation days
                                  </span>
                                </label>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Tactile Slider: Current Age */}
                          <div>
                            <div className="flex justify-between items-center mb-3">
                              <label className="font-serif text-[1.1rem] text-[#1a1a1a]">
                                Current Age?
                              </label>
                              <span className="font-serif text-lg font-medium text-[#C89A52]">
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
                              className="w-full accent-[#C89A52] bg-stone-200 h-1.5 rounded-lg cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] text-[#9d9d9d] font-sans mt-1.5 tracking-wider">
                              <span>9</span>
                              <span>90</span>
                            </div>
                          </div>

                          {/* Tactile Slider: Puberty Age */}
                          <div>
                            <div className="flex justify-between items-center mb-3">
                              <label className="font-serif text-[1.1rem] text-[#1a1a1a]">
                                Puberty Age?
                              </label>
                              <span className="font-serif text-lg font-medium text-[#C89A52]">
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
                              className="w-full accent-[#C89A52] bg-stone-200 h-1.5 rounded-lg cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] text-[#9d9d9d] font-sans mt-1.5 tracking-wider">
                              <span>9</span>
                              <span>{currentAge}</span>
                            </div>
                          </div>

                          {/* Prayer Consistency Logic */}
                          <div className="pt-2">
                            <label className="block font-serif text-[1.1rem] text-[#1a1a1a] mb-3">
                              Prayer Consistency
                            </label>

                            <div className="space-y-2 mb-5">
                              <label
                                className={`flex items-center gap-3 p-3 border cursor-pointer transition-colors ${prayerStatus === "consistent" ? "border-[#1a1a1a] bg-[#1a1a1a]/5" : "border-[#e0e0e0] bg-white/50 hover:border-[#C89A52]"}`}
                              >
                                <div
                                  className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${prayerStatus === "consistent" ? "border-[#1a1a1a]" : "border-[#9d9d9d]"}`}
                                >
                                  {prayerStatus === "consistent" && (
                                    <div className="w-2 h-2 bg-[#1a1a1a] rounded-full" />
                                  )}
                                </div>
                                <input
                                  type="radio"
                                  className="hidden"
                                  name="prayerStatus"
                                  checked={prayerStatus === "consistent"}
                                  onChange={() => setPrayerStatus("consistent")}
                                />
                                <span className="font-serif text-[14px] text-[#1a1a1a]">
                                  I began praying consistently
                                </span>
                              </label>

                              <label
                                className={`flex items-center gap-3 p-3 border cursor-pointer transition-colors ${prayerStatus === "never" ? "border-[#1a1a1a] bg-[#1a1a1a]/5" : "border-[#e0e0e0] bg-white/50 hover:border-[#C89A52]"}`}
                              >
                                <div
                                  className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${prayerStatus === "never" ? "border-[#1a1a1a]" : "border-[#9d9d9d]"}`}
                                >
                                  {prayerStatus === "never" && (
                                    <div className="w-2 h-2 bg-[#1a1a1a] rounded-full" />
                                  )}
                                </div>
                                <input
                                  type="radio"
                                  className="hidden"
                                  name="prayerStatus"
                                  checked={prayerStatus === "never"}
                                  onChange={() => setPrayerStatus("never")}
                                />
                                <span className="font-serif text-[14px] text-[#1a1a1a]">
                                  I have never prayed consistently
                                </span>
                              </label>
                            </div>

                            {/* Tactile Slider: Praying Age */}
                            <div
                              className={`transition-all duration-300 ${prayerStatus === "never" ? "opacity-30 pointer-events-none grayscale" : "opacity-100"}`}
                            >
                              <div className="flex justify-between items-center mb-3">
                                <label className="font-serif text-[1.1rem] text-[#1a1a1a]">
                                  When did you begin praying consistently?
                                </label>
                                <span className="font-serif text-lg font-medium text-[#C89A52]">
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
                                className="w-full accent-[#C89A52] bg-stone-200 h-1.5 rounded-lg cursor-pointer disabled:cursor-not-allowed"
                              />
                              <div className="flex justify-between text-[10px] text-[#9d9d9d] font-sans mt-1.5 tracking-wider">
                                <span>{pubertyAge}</span>
                                <span>{currentAge}</span>
                              </div>
                            </div>
                          </div>

                          {/* Scholar Mode */}
                          <div className="pt-2">
                            <div className="flex justify-between items-center mb-3">
                              <label className="font-serif text-[1.1rem] text-[#1a1a1a]">
                                Calculation Method
                              </label>
                              <button
                                onClick={() =>
                                  setShowScholarInfo(!showScholarInfo)
                                }
                                className="text-[10px] uppercase tracking-widest font-sans text-[#C89A52] hover:text-[#1a1a1a] underline underline-offset-2"
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
                                  <p className="text-[11px] text-[#666666] font-sans mb-3 p-3 bg-white/50 border border-[#e0e0e0]">
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
                                    className={`w-full text-center px-2 py-2 border transition-colors duration-200 font-serif text-[13px] capitalize ${scholarMode === mode ? "border-[#1a1a1a] bg-[#1a1a1a]/5 text-[#1a1a1a]" : "border-[#e0e0e0] bg-white/50 text-[#666666] hover:border-[#C89A52]"}`}
                                  >
                                    {mode}
                                  </button>
                                ),
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Life Phases Builder (Conditionally Hidden) */}
                        <AnimatePresence>
                          {prayerStatus === "consistent" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4 pb-2 border-t border-[#e0e0e0]">
                                <div className="mb-4">
                                  <h4 className="font-serif text-2xl text-[#1a1a1a]">
                                    Life Phases
                                  </h4>
                                  <p className="text-[12px] text-[#666666] font-sans mt-1">
                                    Break the years from puberty to when you
                                    started into periods.
                                  </p>
                                </div>

                                <div className="space-y-6">
                                  {phases.map((phase, index) => (
                                    <div
                                      key={phase.id}
                                      className="border border-[#e0e0e0] bg-white/30 p-4 md:p-5 relative"
                                    >
                                      {index > 0 && (
                                        <button
                                          onClick={() =>
                                            handleDeletePhase(index)
                                          }
                                          className="absolute top-4 right-4 text-[#9d9d9d] hover:text-red-500 transition-colors text-sm"
                                        >
                                          ✕
                                        </button>
                                      )}

                                      <h5 className="font-sans uppercase tracking-[0.15em] text-[10px] text-[#C89A52] mb-3">
                                        Phase {index + 1}
                                      </h5>

                                      <div className="flex items-center gap-3 mb-5 border-b border-[#e0e0e0] pb-4">
                                        {/* From Age */}
                                        <div className="flex flex-col">
                                          <span className="text-[10px] uppercase font-sans text-[#9d9d9d] mb-1">
                                            From Age
                                          </span>
                                          <span className="font-serif text-lg w-16 text-center text-[#666666]">
                                            {phase.startAge}
                                          </span>
                                        </div>

                                        <span className="text-[#9d9d9d]">
                                          →
                                        </span>

                                        {/* To Age */}
                                        <div className="flex flex-col">
                                          <span className="text-[10px] uppercase font-sans text-[#9d9d9d] mb-1">
                                            To Age
                                          </span>
                                          {index < phases.length - 1 ? (
                                            <input
                                              type="number"
                                              min={phase.startAge}
                                              max={
                                                phases[index + 1]?.endAge ||
                                                prayingAge
                                              }
                                              value={phase.endAge}
                                              onChange={(e) =>
                                                updatePhaseBoundary(
                                                  index,
                                                  e.target.value,
                                                )
                                              }
                                              className="font-serif text-lg w-16 bg-transparent border-b border-[#1a1a1a]/20 focus:border-[#C89A52] focus:outline-none text-center"
                                            />
                                          ) : (
                                            <span className="font-serif text-lg w-16 text-center text-[#666666]">
                                              {phase.endAge}
                                            </span>
                                          )}
                                        </div>
                                      </div>

                                      <div className="space-y-3">
                                        <p className="text-[11px] text-[#666666] font-sans uppercase tracking-wider mb-2">
                                          Prayer Habits during this phase:
                                        </p>
                                        {PRAYERS.map((prayer) => (
                                          <div
                                            key={prayer}
                                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                                          >
                                            <span className="font-serif text-[14px] text-[#1a1a1a] w-20">
                                              {prayer}
                                            </span>
                                            <div className="grid grid-cols-4 gap-1 w-full flex-1">
                                              {HABITS.map((habit) => {
                                                const isActive =
                                                  phase.prayers[prayer] ===
                                                  habit;
                                                return (
                                                  <button
                                                    key={habit}
                                                    onClick={() =>
                                                      updatePrayerHabit(
                                                        index,
                                                        prayer,
                                                        habit,
                                                      )
                                                    }
                                                    className={`py-1.5 text-[9px] uppercase tracking-wider border transition-all ${isActive ? "border-[#1a1a1a] bg-[#1a1a1a]/5 text-[#1a1a1a] font-bold" : "border-[#e0e0e0] bg-white text-[#9d9d9d] hover:border-[#C89A52]"}`}
                                                  >
                                                    {habit}
                                                  </button>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}

                                  <button
                                    onClick={handleAddPhase}
                                    className="w-full border border-dashed border-[#C89A52] text-[#C89A52] bg-[#C89A52]/5 hover:bg-[#C89A52]/10 py-3 font-sans text-[11px] uppercase tracking-[0.2em] transition-colors"
                                  >
                                    + Add Another Phase
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <button
                        onClick={() => {
                          if (!gender) {
                            alert("Please select a gender to continue.");
                            return;
                          }
                          setModalStep(2);
                        }}
                        className="w-full mt-10 bg-[#1a1a1a] text-white font-sans text-[11px] uppercase tracking-[0.2em] px-8 py-4 hover:bg-[#C89A52] transition-colors duration-300 active:scale-95 shadow-sm flex items-center justify-center gap-2"
                      >
                        Review Details <span>→</span>
                      </button>

                      {hasEstimated && (
                        <div className="mt-6 flex justify-center items-center gap-2">
                          <span className="font-sans text-[10px] text-[#9d9d9d]">
                            Need to start over?
                          </span>
                          <button
                            onClick={resetCalculator}
                            className="text-[10px] font-sans text-[#1a1a1a] hover:text-[#C89A52] transition-colors underline underline-offset-4"
                          >
                            Reset everything
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* --- STEP 2: CONFIRMATION SCREEN --- */}
                  {modalStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <button
                        onClick={() => setModalStep(1)}
                        className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#9d9d9d] hover:text-[#1a1a1a] transition-colors mb-4 flex items-center gap-1 w-fit"
                      >
                        ← Back
                      </button>

                      <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#9d9d9d] mb-4">
                        Step 2 of 3
                      </p>
                      <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] mb-4 tracking-tight">
                        Confirm Your Details
                      </h3>
                      <div className="font-serif text-[15px] text-[#666666] leading-[1.6] mb-8">
                        <p>
                          Please verify your journey details before we calculate
                          the estimate.
                        </p>
                      </div>

                      <div className="space-y-2 mb-12">
                        <div className="flex justify-between items-start py-4 border-b border-[#e0e0e0]">
                          <span className="font-sans text-[11px] uppercase tracking-widest text-[#9d9d9d] pt-1">
                            Current Age
                          </span>
                          <div className="text-right">
                            <span className="font-serif text-2xl text-[#1a1a1a] leading-none block">
                              {currentAge}
                            </span>
                            <button
                              onClick={() => setModalStep(1)}
                              className="mt-1.5 text-[9px] font-sans uppercase tracking-[0.1em] text-[#C89A52] hover:text-[#1a1a1a] transition-colors"
                            >
                              Edit →
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-start py-4 border-b border-[#e0e0e0]">
                          <span className="font-sans text-[11px] uppercase tracking-widest text-[#9d9d9d] pt-1">
                            Puberty Age
                          </span>
                          <div className="text-right">
                            <span className="font-serif text-2xl text-[#1a1a1a] leading-none block">
                              {pubertyAge}
                            </span>
                            <button
                              onClick={() => setModalStep(1)}
                              className="mt-1.5 text-[9px] font-sans uppercase tracking-[0.1em] text-[#C89A52] hover:text-[#1a1a1a] transition-colors"
                            >
                              Edit →
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-start py-4 border-b border-[#e0e0e0]">
                          <span className="font-sans text-[11px] uppercase tracking-widest text-[#9d9d9d] pt-1">
                            Prayer Journey
                          </span>
                          <div className="text-right">
                            <span className="font-serif text-[1.15rem] text-[#1a1a1a] leading-none block pb-0.5">
                              {prayerStatus === "never"
                                ? "Never prayed consistently"
                                : `Life Phases: ${phases.length}`}
                            </span>
                            <button
                              onClick={() => setModalStep(1)}
                              className="mt-1 text-[9px] font-sans uppercase tracking-[0.1em] text-[#C89A52] hover:text-[#1a1a1a] transition-colors"
                            >
                              Edit →
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-start py-4 border-b border-[#e0e0e0]">
                          <span className="font-sans text-[11px] uppercase tracking-widest text-[#9d9d9d] pt-1">
                            Calculation Mode
                          </span>
                          <div className="text-right">
                            <span className="font-serif text-[1.15rem] text-[#1a1a1a] capitalize leading-none block pb-0.5">
                              {scholarMode}
                            </span>
                            <button
                              onClick={() => setModalStep(1)}
                              className="mt-1 text-[9px] font-sans uppercase tracking-[0.1em] text-[#C89A52] hover:text-[#1a1a1a] transition-colors"
                            >
                              Edit →
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setModalStep(3)}
                        className="w-full bg-[#1a1a1a] text-white font-sans text-[11px] uppercase tracking-[0.2em] px-8 py-4 hover:bg-[#C89A52] transition-colors duration-300 active:scale-95 shadow-sm flex items-center justify-center gap-2"
                      >
                        Calculate Estimate <span>→</span>
                      </button>
                    </motion.div>
                  )}

                  {/* --- STEP 3: REVIEW & RESULTS --- */}
                  {modalStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col h-full"
                    >
                      <button
                        onClick={() => setModalStep(2)}
                        className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#9d9d9d] hover:text-[#1a1a1a] transition-colors mb-4 flex items-center gap-1 w-fit"
                      >
                        ← Back
                      </button>

                      <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C89A52] mb-4">
                        Step 3 of 3
                      </p>
                      <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] mb-8 tracking-tight">
                        Review Your Estimate
                      </h3>

                      {/* Header Data */}
                      <div className="bg-white/40 border border-[#e0e0e0] p-6 text-center mb-8 relative">
                        <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#9d9d9d] mb-1">
                          Estimated Range
                        </p>
                        <div className="font-serif text-[2.5rem] sm:text-[3rem] leading-none text-[#1a1a1a] tracking-tight py-2">
                          {estimates.low.toLocaleString()} –{" "}
                          {estimates.high.toLocaleString()}
                        </div>
                        <div className="flex justify-center items-center gap-2 mt-2">
                          <p className="text-[10px] uppercase font-sans text-[#9d9d9d]">
                            Confidence
                          </p>
                          <div className="text-[#C89A52] text-sm tracking-widest">
                            {"★".repeat(estimates.conf)}
                            {"☆".repeat(5 - estimates.conf)}
                          </div>
                        </div>
                      </div>

                      {/* Manual Adjustments */}
                      <div className="mb-8 p-5 bg-white/30 border border-[#e0e0e0]">
                        <h4 className="font-serif text-lg text-[#1a1a1a] mb-1">
                          Manual Fine-tuning
                        </h4>
                        <p className="text-[11px] text-[#666666] font-sans mb-4">
                          Adjust the final calculation directly if something
                          feels slightly off.
                        </p>
                        <div className="flex items-center justify-between sm:justify-center gap-2 sm:gap-4">
                          <button
                            onClick={() => setManualAdjustment((m) => m - 500)}
                            className="w-10 h-10 border border-[#e0e0e0] bg-white text-[10px] font-sans hover:border-[#C89A52]"
                          >
                            -500
                          </button>
                          <button
                            onClick={() => setManualAdjustment((m) => m - 100)}
                            className="w-10 h-10 border border-[#e0e0e0] bg-white text-[10px] font-sans hover:border-[#C89A52]"
                          >
                            -100
                          </button>

                          <div className="relative">
                            <input
                              type="number"
                              value={estimates.finalTotal}
                              onChange={(e) =>
                                setManualAdjustment(
                                  (parseInt(e.target.value) || 0) -
                                    estimates.baseTotal,
                                )
                              }
                              className="font-serif text-xl w-24 text-center bg-transparent border-b border-[#1a1a1a] focus:outline-none focus:border-[#C89A52] py-1"
                            />
                            <span className="absolute -bottom-4 left-0 w-full text-center text-[9px] text-[#9d9d9d] uppercase">
                              Current
                            </span>
                          </div>

                          <button
                            onClick={() => setManualAdjustment((m) => m + 100)}
                            className="w-10 h-10 border border-[#e0e0e0] bg-white text-[10px] font-sans hover:border-[#C89A52]"
                          >
                            +100
                          </button>
                          <button
                            onClick={() => setManualAdjustment((m) => m + 500)}
                            className="w-10 h-10 border border-[#e0e0e0] bg-white text-[10px] font-sans hover:border-[#C89A52]"
                          >
                            +500
                          </button>
                        </div>
                      </div>

                      {/* Calculation Breakdown Timeline */}
                      <div className="mb-8">
                        <h4 className="font-serif text-xl text-[#1a1a1a] mb-4">
                          Calculation Breakdown
                        </h4>
                        <div className="relative pl-6 border-l border-[#C89A52]/30 space-y-8 py-2">
                          {/* Mapped Debt Phases */}
                          {estimates.breakdowns.map((b, i) => (
                            <div key={b.id} className="relative">
                              <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 bg-[#f9f7f2] border-[3px] border-[#C89A52] rounded-full" />
                              <h5 className="font-serif text-[1.1rem] text-[#1a1a1a]">
                                Age {b.startAge} → {b.endAge}
                              </h5>
                              <p className="text-[10px] font-sans text-[#9d9d9d] uppercase tracking-wider mb-2">
                                {b.years} Years • {b.days.toLocaleString()} Days
                              </p>

                              {/* Visual Debt Bar (Timeline) */}
                              <div className="flex flex-wrap gap-[2px] mb-2">
                                {Array.from({
                                  length: Math.min(
                                    60,
                                    Math.ceil(b.debt / 1000),
                                  ),
                                }).map((_, j) => (
                                  <span
                                    key={j}
                                    className="inline-block w-2 h-4 bg-[#1a1a1a]/70 rounded-sm"
                                  />
                                ))}
                                {b.debt > 60000 && (
                                  <span className="text-[10px] text-[#9d9d9d] ml-1 self-end">
                                    +
                                  </span>
                                )}
                                {b.debt === 0 && (
                                  <span className="text-[10px] text-[#9d9d9d] italic">
                                    Consistent (0 generated)
                                  </span>
                                )}
                              </div>

                              <p className="text-[13px] font-serif text-[#666666]">
                                Estimated:{" "}
                                <span className="font-bold text-[#1a1a1a]">
                                  {b.debt.toLocaleString()}
                                </span>{" "}
                                prayers
                              </p>
                            </div>
                          ))}

                          {/* Zero-Debt Established Status Node */}
                          {prayerStatus === "consistent" &&
                            prayingAge < currentAge && (
                              <div className="relative opacity-60">
                                <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 bg-[#f9f7f2] border-[3px] border-[#C89A52] rounded-full" />
                                <h5 className="font-serif text-[1.1rem] text-[#1a1a1a]">
                                  Age {prayingAge} → {currentAge}
                                </h5>
                                <p className="text-[10px] font-sans text-[#9d9d9d] uppercase tracking-wider mb-1">
                                  Consistent Prayer Established
                                </p>
                                <p className="text-[13px] font-serif text-[#666666]">
                                  Estimated:{" "}
                                  <span className="font-bold text-[#1a1a1a]">
                                    0
                                  </span>{" "}
                                  prayers
                                </p>
                              </div>
                            )}

                          {/* Final Totals Node */}
                          <div className="relative pt-2">
                            <div className="absolute -left-[31px] top-3.5 w-3.5 h-3.5 bg-[#1a1a1a] rounded-full" />
                            <h5 className="font-serif text-[1.1rem] text-[#1a1a1a]">
                              Current Age ({currentAge})
                            </h5>
                            {manualAdjustment !== 0 && (
                              <p className="text-[12px] font-serif text-[#666666] mt-1">
                                Manual edits:{" "}
                                <span className="font-bold">
                                  {manualAdjustment > 0
                                    ? `+${manualAdjustment}`
                                    : manualAdjustment}
                                </span>
                              </p>
                            )}
                            <div className="border-t border-[#e0e0e0] mt-3 pt-2">
                              <p className="font-serif text-[15px]">
                                Total:{" "}
                                <span className="font-bold text-[#1a1a1a]">
                                  {estimates.finalTotal.toLocaleString()}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Daily Pace Setup */}
                      <div className="mb-10 p-5 bg-white/30 border border-[#e0e0e0]">
                        <h4 className="font-serif text-lg text-[#1a1a1a] mb-1">
                          Daily Recovery Pace
                        </h4>
                        <p className="text-[11px] text-[#666666] font-sans mb-4">
                          How many Qaza prayers can you comfortably pray daily?
                        </p>

                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
                          {[1, 2, 3, 5, 10].map((n) => (
                            <button
                              key={n}
                              onClick={() => {
                                setDailyPace(n);
                                setCustomPace("");
                              }}
                              className={`py-2 text-[12px] font-sans border transition-colors ${!customPace && dailyPace === n ? "border-[#1a1a1a] bg-[#1a1a1a]/5 text-[#1a1a1a] font-bold" : "border-[#e0e0e0] bg-white text-[#666666] hover:border-[#C89A52]"}`}
                            >
                              {n}
                            </button>
                          ))}
                          <input
                            type="number"
                            placeholder="Custom"
                            value={customPace}
                            onChange={(e) => setCustomPace(e.target.value)}
                            className={`py-2 text-[12px] font-sans border text-center transition-colors focus:outline-none ${customPace ? "border-[#1a1a1a] bg-[#1a1a1a]/5 text-[#1a1a1a] font-bold" : "border-[#e0e0e0] bg-white text-[#666666] focus:border-[#C89A52]"}`}
                          />
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-[#e0e0e0]">
                          <span className="text-[11px] uppercase font-sans text-[#9d9d9d]">
                            Estimated Finish
                          </span>
                          <span className="font-serif text-[15px] text-[#C89A52] font-medium">
                            {calculateHorizon(estimates.finalTotal)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-auto pt-4">
                        <button
                          onClick={handleCommitEstimate}
                          className="w-full bg-[#1a1a1a] text-white font-sans text-[11px] uppercase tracking-[0.2em] px-8 py-4 hover:bg-[#C89A52] transition-colors duration-300 active:scale-95 shadow-sm"
                        >
                          Begin My Journey
                        </button>
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
