import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

// --- MOCK DATA: GOLDEN PATH DEMO ---
const answers = {
  Simple: {
    quick:
      "The Prophet ﷺ began his mornings with remembrance of Allah, gratitude, and preparation for prayer.",
    simple:
      "The first thing the Prophet ﷺ did after waking wasn't checking the world around him—it was remembering Allah. This teaches Muslims that the beginning of the day shapes everything that follows.",
    sequence: [
      "He recited the waking dua.",
      "Used the siwak (toothbrush).",
      "Performed Wudu (ablution).",
      "Prayed the Sunnah before Fajr.",
    ],
    evidence: "Based on authentic narrations from Sahih al-Bukhari and Muslim.",
    lessons: [
      "Start the day with gratitude.",
      "Physical purity is tied to spiritual readiness.",
    ],
  },
  Detailed: {
    quick:
      "The Prophet ﷺ began his mornings with remembrance of Allah, gratitude, and preparation for prayer.",
    simple:
      "The first thing the Prophet ﷺ did after waking wasn't checking the world around him—it was remembering Allah. This teaches Muslims that the beginning of the day shapes everything that follows.",
    sequence: [
      "He recited the waking dua: 'Alhamdulillahil-ladhi ahyana...'",
      "Used the siwak immediately upon waking.",
      "Performed Wudu.",
      "Prayed the 2 Rak'ah Sunnah of Fajr at home.",
    ],
    evidence:
      "Narrated by Hudhaifa (RA): Whenever the Prophet ﷺ got up for Fajr, he used to clean his mouth with a Siwak. (Sahih al-Bukhari 246)",
    lessons: [
      "Prioritize spiritual connection before worldly affairs.",
      "Maintain consistent physical hygiene.",
      "Establish a routine that anchors your day.",
    ],
  },
  // Scholarly mode would have different data, structured similarly
};

const scholarlyOpinions = [
  {
    school: "Hanafi",
    view: "Sunnah Muakkadah",
    detail:
      "The two rak'ahs of Fajr are the most emphasized of all Sunnah prayers. They should not be missed even if one is traveling.",
  },
  {
    school: "Maliki",
    view: "Highly Recommended",
    detail:
      "It is a highly stressed Sunnah. It is preferred to recite Surat Al-Kafirun and Surat Al-Ikhlas in these two units.",
  },
  {
    school: "Shafi'i",
    view: "Confirmed Sunnah",
    detail:
      "It is strongly recommended to keep these two rak'ahs brief and light, following the exact practice of the Prophet ﷺ.",
  },
  {
    school: "Hanbali",
    view: "Emphasized Sunnah",
    detail:
      "Agrees on its heavy emphasis. Missing it without a valid excuse is disliked (Makruh).",
  },
];

export default function LandingPageDemo() {
  const [phase, setPhase] = useState("typing"); // typing, sending, thinking, answering
  const [typedText, setTypedText] = useState("");
  const [mode, setMode] = useState("Detailed");
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [thinkingStep, setThinkingStep] = useState(0);

  const fullQuestion = "How did Prophet ﷺ spend his mornings?";

  // 1. Typing Effect
  useEffect(() => {
    if (phase !== "typing") return;

    let i = 0;
    const typingInterval = setInterval(() => {
      setTypedText(fullQuestion.slice(0, i + 1));
      i++;
      if (i >= fullQuestion.length) {
        clearInterval(typingInterval);
        setTimeout(() => setPhase("sending"), 300);
      }
    }, 70); // ~70ms per char

    return () => clearInterval(typingInterval);
  }, [phase]);

  // 2. Transition from sending to thinking
  useEffect(() => {
    if (phase === "sending") {
      setTimeout(() => setPhase("thinking"), 500);
    }
  }, [phase]);

  // 3. Thinking Steps (Quran -> Hadith -> Seerah -> Building)
  useEffect(() => {
    if (phase === "thinking" || isRegenerating) {
      setThinkingStep(0);

      const timings = [500, 1000, 1500, 2000]; // Staggered checkmarks
      timings.forEach((time, index) => {
        setTimeout(() => setThinkingStep(index + 1), time);
      });

      setTimeout(() => {
        if (isRegenerating) setIsRegenerating(false);
        else setPhase("answering");
      }, 2500);
    }
  }, [phase, isRegenerating]);

  // Handle Mode Change (Regeneration)
  const handleModeChange = (newMode) => {
    if (newMode === mode || isRegenerating) return;
    setMode(newMode);
    setIsRegenerating(true);
  };

  const currentData = answers[mode] || answers.Detailed;

  return (
    <section className="min-h-screen bg-[#F7F5F1] py-24 px-6 font-['Manrope'] selection:bg-[#C6A26B] selection:text-white flex justify-center">
      <div className="w-full max-w-3xl flex flex-col gap-6">
        {/* User Input / Bubble */}
        <div className="flex justify-end min-h-[60px]">
          <AnimatePresence mode="wait">
            {phase === "typing" ? (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-stone-900 text-lg flex items-center"
              >
                {typedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-0.5 h-6 bg-stone-400 ml-1"
                />
              </motion.div>
            ) : (
              <motion.div
                key="bubble"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="bg-stone-900 text-white p-5 rounded-2xl rounded-tr-sm shadow-sm text-lg max-w-[85%] flex gap-4 items-start"
              >
                <div className="mt-1 opacity-50 text-sm">👤</div>
                <div>{fullQuestion}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* AI Response Area */}
        <AnimatePresence>
          {(phase === "thinking" || phase === "answering") && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-white rounded-3xl p-8 sm:p-12 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.05)] border border-stone-200/60"
            >
              {/* Thinking State */}
              {phase === "thinking" || isRegenerating ? (
                <div className="flex flex-col gap-3 py-4 text-stone-500 font-serif">
                  <div className="text-xs uppercase tracking-widest font-sans font-bold text-stone-400 mb-2">
                    ✦ Tawfiq AI
                  </div>
                  <ThinkingLine
                    text="Consulting Quran"
                    active={thinkingStep >= 1}
                  />
                  <ThinkingLine
                    text="Consulting Hadith"
                    active={thinkingStep >= 2}
                  />
                  <ThinkingLine
                    text="Consulting Seerah"
                    active={thinkingStep >= 3}
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: thinkingStep >= 4 ? 1 : 0 }}
                    className="text-[#C6A26B] italic mt-2"
                  >
                    Building explanation...
                  </motion.div>
                </div>
              ) : (
                /* Answer State */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-8"
                >
                  {/* Reading Mode Selector */}
                  <div className="flex items-center gap-4 border-b border-stone-100 pb-6">
                    <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">
                      Read this as
                    </span>
                    <div className="flex gap-1 bg-stone-100 p-1 rounded-full">
                      {["Simple", "Detailed", "Scholarly"].map((m) => (
                        <button
                          key={m}
                          onClick={() => handleModeChange(m)}
                          className={`px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider font-bold transition-all ${
                            mode === m
                              ? "bg-white text-stone-900 shadow-sm"
                              : "text-stone-500 hover:text-stone-700"
                          }`}
                        >
                          {mode === m ? "●" : "○"} {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Staggered Sections */}
                  <Section delay={0.2} title="Quick Answer">
                    <p className="font-serif text-xl sm:text-2xl text-stone-900 leading-snug">
                      {currentData.quick}
                    </p>
                  </Section>

                  <Divider delay={0.3} />

                  <Section delay={0.4} title="In Simple Terms">
                    <p className="font-serif text-stone-600 text-lg leading-relaxed">
                      {currentData.simple}
                    </p>
                  </Section>

                  <Divider delay={0.5} />

                  <Section delay={0.6} title="What Happened Next?">
                    <ul className="space-y-3">
                      {currentData.sequence.map((item, i) => (
                        <li key={i} className="flex gap-4">
                          <span className="text-[#C6A26B] font-bold text-sm mt-1">
                            •
                          </span>
                          <span className="font-serif text-stone-700 text-lg">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Section>

                  <Divider delay={0.7} />

                  <Section delay={0.8} title="Evidence">
                    <p className="font-serif text-stone-600 italic text-lg border-l-2 border-stone-200 pl-4">
                      {currentData.evidence}
                    </p>
                  </Section>

                  {mode === "Scholarly" && (
                    <>
                      <Divider delay={0.9} />
                      <Section delay={1.0} title="Scholarly Opinions">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                          {scholarlyOpinions.map((op, i) => (
                            <motion.div
                              key={op.school}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 1.0 + i * 0.15 }}
                              className="p-5 border border-stone-200 rounded-xl bg-stone-50"
                            >
                              <div className="flex justify-between items-end mb-3 pb-3 border-b border-stone-200">
                                <span className="font-serif text-lg text-stone-900">
                                  {op.school}
                                </span>
                                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#C6A26B]">
                                  {op.view}
                                </span>
                              </div>
                              <p className="font-serif text-sm text-stone-600 leading-relaxed">
                                {op.detail}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </Section>
                    </>
                  )}

                  <Divider delay={mode === "Scholarly" ? 1.4 : 0.9} />

                  <Section
                    delay={mode === "Scholarly" ? 1.5 : 1.0}
                    title="Lessons"
                  >
                    <ul className="space-y-3">
                      {currentData.lessons.map((item, i) => (
                        <li key={i} className="flex gap-4 items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2.5 shrink-0" />
                          <span className="font-serif text-stone-700 text-lg">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Section>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// --- Helper Components ---

const ThinkingLine = ({ text, active }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: active ? 1 : 0.4, x: 0 }}
    className="flex items-center gap-3 text-lg"
  >
    <div
      className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors duration-500 ${active ? "bg-[#C6A26B] border-[#C6A26B] text-white" : "border-stone-300 text-transparent"}`}
    >
      <Check size={12} strokeWidth={3} />
    </div>
    {text}
  </motion.div>
);

const Section = ({ title, children, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
  >
    <div className="text-[10px] uppercase tracking-widest font-sans font-bold text-stone-400 mb-4">
      {title}
    </div>
    {children}
  </motion.div>
);

const Divider = ({ delay }) => (
  <motion.hr
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay }}
    className="border-t border-stone-200/80"
  />
);
