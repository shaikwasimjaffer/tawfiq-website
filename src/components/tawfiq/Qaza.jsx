import React, { useState, useRef, useEffect } from "react";
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

export default function Qaza() {
  // App State
  const [hasEstimated, setHasEstimated] = useState(false);
  const [totalOwed, setTotalOwed] = useState(0);

  // Modal & Wizard State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);

  const [gender, setGender] = useState("");
  const [currentAge, setCurrentAge] = useState(25);
  const [pubertyAge, setPubertyAge] = useState(12);
  const [prayingAge, setPrayingAge] = useState(18);
  const [subtractMenses, setSubtractMenses] = useState(false);
  const [frequency, setFrequency] = useState("rarely");

  // Keep dependent sliders safely bounded when currentAge changes
  useEffect(() => {
    if (pubertyAge > currentAge) {
      setPubertyAge(currentAge);
    }
    if (prayingAge > currentAge) {
      setPrayingAge(currentAge);
    }
  }, [currentAge]);

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

  // --- Core Calculation Logic ---
  const getCalculatedDays = () => {
    const pAge = parseInt(pubertyAge) || 12;
    const cAge = parseInt(prayingAge) || pAge;
    const yearsMissed = Math.max(0, cAge - pAge);

    const shouldSubtractMenses = gender === "female" && subtractMenses;
    const daysPerYear = shouldSubtractMenses ? 281 : 365;
    const baseDays = yearsMissed * daysPerYear;

    let multiplier = 1.0;
    if (frequency === "occasionally") multiplier = 0.75;
    if (frequency === "frequently") multiplier = 0.4;

    return Math.round(baseDays * multiplier);
  };

  const previewMissedDays = getCalculatedDays();
  const previewTotalPrayers = previewMissedDays * 5;

  const handleCommitEstimate = () => {
    setTotalOwed(previewTotalPrayers);
    setHasEstimated(true);
    setIsModalOpen(false);
    setModalStep(1);

    // Smooth scroll to the Qaza tracker section
    const element = document.getElementById("qaza-tracker");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const calculateHorizon = () => {
    if (totalOwed === 0) return "—";
    const pacePerDay = 3;
    const daysRemaining = totalOwed / pacePerDay;
    const date = new Date();
    date.setDate(date.getDate() + daysRemaining);
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  const resetCalculator = () => {
    setGender("");
    setCurrentAge(25);
    setPubertyAge(12);
    setPrayingAge(18);
    setSubtractMenses(false);
    setFrequency("rarely");
    setTotalOwed(0);
    setHasEstimated(false);
    setModalStep(1);
    setIsModalOpen(false);
  };

  return (
    <section className="relative bg-[#f9f7f2] h-auto pb-24 md:pb-32 overflow-hidden selection:bg-[#C89A52] selection:text-white">
      {/* Forced CSS injection for custom scrollbars */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* Chrome, Edge, Safari */
        .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #C8C1B6;
            border-radius: 999px;
            border: 2px solid #f9f7f2;
            background-clip: padding-box; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #A99F90;
        }
        /* Firefox */
        .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #C8C1B6 transparent;
        }
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
        {/* The Big Picture (Macro) - Always visible */}
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

        {/* Dynamic Journey Elements - Rendered only AFTER estimation */}
        <AnimatePresence>
          {hasEstimated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Functional Horizon - Big and Readable without vertical divider line */}
              <div className="mb-16 text-center">
                <p className="font-serif text-[1.35rem] sm:text-[1.75rem] md:text-[2rem] text-[#1a1a1a] leading-[1.4] max-w-xl mx-auto">
                  At your current pace, you will complete this journey in{" "}
                  <span className="italic font-normal text-[#C6A26B] block mt-1 sm:inline sm:mt-0">
                    {calculateHorizon()}.
                  </span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Luxury Editorial Modal (2-Step Wizard) */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-[#1a1a1a]/40 backdrop-blur-[2px] z-40"
            />

            <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="custom-scrollbar bg-[#f9f7f2] border border-[#e0e0e0] w-full max-w-[28rem] p-8 md:p-12 shadow-2xl relative pointer-events-auto text-left flex flex-col max-h-[90vh] overflow-y-auto"
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
                  {modalStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#9d9d9d] mb-4">
                        Step 1 of 2
                      </p>

                      <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] mb-4 tracking-tight">
                        Estimate Your Missed Prayers
                      </h3>

                      <div className="font-serif text-[15px] text-[#666666] leading-[1.6] mb-8">
                        <p>
                          Answer a few questions and Tawfiq will estimate your
                          starting point.
                        </p>
                      </div>

                      <div className="space-y-8">
                        {/* Gender Toggle */}
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
                          <div className="flex justify-between text-[10px] text-stone-400 font-sans mt-1.5 tracking-wider">
                            <span>9</span>
                            <span>90</span>
                          </div>
                        </div>

                        {/* Tactile Slider: Puberty Age */}
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <label className="font-serif text-[1.1rem] text-[#1a1a1a]">
                              When did you reach puberty?
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
                          <div className="flex justify-between text-[10px] text-stone-400 font-sans mt-1.5 tracking-wider">
                            <span>9</span>
                            <span>{currentAge}</span>
                          </div>
                        </div>

                        {/* Tactile Slider: Praying Age */}
                        <div>
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
                            min="9"
                            max={currentAge}
                            step="1"
                            value={prayingAge}
                            onChange={(e) =>
                              setPrayingAge(Number(e.target.value))
                            }
                            className="w-full accent-[#C89A52] bg-stone-200 h-1.5 rounded-lg cursor-pointer"
                          />
                          <div className="flex justify-between text-[10px] text-stone-400 font-sans mt-1.5 tracking-wider">
                            <span>9</span>
                            <span>{currentAge}</span>
                          </div>
                        </div>

                        <div>
                          <label className="block font-serif text-[1.1rem] text-[#1a1a1a] mb-3">
                            Before then, how often did you pray?
                          </label>
                          <div className="space-y-2">
                            {[
                              { id: "rarely", label: "Rarely / Almost never" },
                              {
                                id: "occasionally",
                                label: "Occasionally (e.g., Fridays, Ramadan)",
                              },
                              { id: "frequently", label: "Frequently" },
                            ].map((option) => (
                              <button
                                key={option.id}
                                onClick={() => setFrequency(option.id)}
                                className={`w-full text-left px-4 py-3 border transition-colors duration-200 font-serif text-[15px] ${frequency === option.id ? "border-[#1a1a1a] bg-[#1a1a1a]/5 text-[#1a1a1a]" : "border-[#e0e0e0] bg-white/50 text-[#666666] hover:border-[#C89A52]"}`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Smart Reveal: Menstruation Checkbox */}
                        <AnimatePresence>
                          {gender === "female" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-2">
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
                        Continue <span>→</span>
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

                  {modalStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col h-full"
                    >
                      <button
                        onClick={() => setModalStep(1)}
                        className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#9d9d9d] hover:text-[#1a1a1a] transition-colors mb-4 flex items-center gap-1 w-fit"
                      >
                        ← Back
                      </button>

                      <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C89A52] mb-4">
                        Step 2 of 2
                      </p>

                      <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] mb-8 tracking-tight">
                        Review Your Estimate
                      </h3>

                      <div className="bg-white/40 border border-[#e0e0e0] p-8 text-center mb-8">
                        <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#9d9d9d] mb-3">
                          Estimated Missed Prayers
                        </p>
                        <div className="font-serif text-[4rem] leading-none text-[#1a1a1a] tracking-tight">
                          <span className="text-3xl text-[#9d9d9d] mr-2">
                            ≈
                          </span>
                          {previewTotalPrayers.toLocaleString()}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <p className="font-serif text-[15px] text-[#666666] leading-[1.6]">
                          This is an estimate based on the information you
                          provided and your daily routines.
                        </p>
                        <p className="font-sans text-[11px] text-[#9d9d9d] leading-[1.7] p-4 bg-[#1a1a1a]/5 border-l-2 border-[#C89A52]">
                          Different scholars hold different opinions on how
                          missed prayers should be estimated and fulfilled. We
                          encourage you to follow the guidance of a trusted
                          scholar if you are uncertain. You can always edit this
                          number later.
                        </p>
                      </div>

                      <div className="mt-auto pt-8">
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
