import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// --- MOCK DATA: GOLDEN PATH DEMO ---
const answers = {
  Simple: {
    quick:
      "The Prophet ﷺ began his mornings with remembrance of Allah, gratitude, and preparation for prayer.",
    explanation:
      "The first thing the Prophet ﷺ did after waking wasn't checking the world around him—it was remembering Allah. This teaches Muslims that the beginning of the day shapes everything that follows.",
    sequence: [
      "He recited the waking dua.",
      "Used the siwak (toothbrush).",
      "Performed Wudu (ablution).",
      "Prayed the Sunnah before Fajr.",
    ],
    evidence: [
      "Based on authentic narrations from Sahih al-Bukhari and Muslim.",
    ],
    lessons: [
      "Start the day with gratitude.",
      "Physical purity is tied to spiritual readiness.",
    ],
  },
  Detailed: {
    quick:
      "The Prophet ﷺ established a profound morning routine centered around spiritual awakening, physical purification, and solitary worship before engaging with the community.",
    explanation:
      "Upon waking, before any worldly engagement, the Prophet ﷺ consciously redirected his focus to Allah. The transition from sleep—often referred to as a minor death in Islamic theology—to wakefulness was marked by deep gratitude. This routine wasn't merely habitual; it was a deliberate spiritual grounding that prepared him for the heavy responsibilities of prophethood, bridging physical hygiene with spiritual readiness.",
    sequence: [
      "Waking Remembrance: He immediately recited the dua for waking up: 'Alhamdulillahil-ladhi ahyana ba'da ma amatana...'",
      "Contemplation: He would look up at the sky and recite the final ten verses of Surah Ali 'Imran (3:190-200).",
      "Physical Purification: He rigorously used the Siwak to clean his mouth, followed by a complete and thorough Wudu.",
      "Voluntary Prayer: He prayed the two emphasized Rak'ahs of Sunnah for Fajr in the privacy of his home, often reciting Surah Al-Kafirun and Surah Al-Ikhlas.",
    ],
    evidence: [
      "Ibn Abbas (RA) narrated: 'The Prophet ﷺ woke up, sat, wiped the sleep from his face with his hands, and looked at the sky reciting the last ten verses of Surah Ali Imran.' (Sahih Muslim 763)",
      "Hudhaifa (RA) narrated: 'Whenever the Prophet ﷺ got up for Fajr, he used to clean his mouth with a Siwak.' (Sahih al-Bukhari 246)",
    ],
    lessons: [
      "Spiritual Primacy: The very first thoughts and words of the day should be anchored in Divine remembrance rather than worldly anxieties.",
      "Mindful Transitions: Moving from sleep to wakefulness is a conscious act of gratitude.",
      "Privacy in Worship: Performing voluntary prayers at home establishes a sacred, spiritually alive environment within the household.",
    ],
  },
  Scholarly: {
    quick:
      "The Prophetic morning (Istiyqath) is categorized by classical jurists and scholars of Seerah as a sequence of Sunnahs encompassing Adhkar, Taharah, and Nawafil.",
    explanation:
      "Classical texts of Seerah and Shama'il emphasize that the Prophet's ﷺ waking routine was a highly structured sequence governed by presence of heart (Hudur al-Qalb). Scholars of Usul derive multiple distinct rulings from this brief period, analyzing whether actions like the use of the Siwak upon waking are Sunnah Mu'akkadah (emphasized) strictly for the prayer or for the act of waking itself. The intentionality behind his transition from rest to worship establishes the jurisprudential baseline for daily Muslim practice.",
    sequence: [
      "Al-Istiyqath (Waking): Immediate pronouncement of the Ma'thur (transmitted) supplications.",
      "Al-Tafakkur (Reflection): Recitation of Ali 'Imran 3:190-200, which scholars note connects cosmic reflection with personal accountability.",
      "Al-Istiak (Tooth-stick): Used longitudinally along the teeth; a purification for the mouth and pleasing to the Lord.",
      "Al-Taharah (Purification): Renewal of Wudu, washing away the 'knots of Shaytan' tied during sleep.",
      "Rak'atay al-Fajr: Two brief units of prayer at home, widely considered the most stressed of all rawatib (affiliated) prayers.",
    ],
    evidence: [
      "Abu Huraira (RA) reported the Prophet ﷺ said: 'Satan puts three knots at the back of the head of any of you if he is asleep... if he wakes up and remembers Allah, one knot is undone...' (Sahih al-Bukhari 1142)",
      "Imam an-Nawawi states in Al-Minhaj regarding the Muslim narration of Ibn Abbas: 'This contains the recommendation of reciting these verses upon waking up, and brushing sleep away from the face.'",
    ],
    lessons: [
      "Tazkiyah (Purification): The integration of external cleanliness (Siwak/Wudu) with internal vigilance.",
      "Tawqif (Divine Instruction): Adherence to the exact sequence and phrasing of the Prophetic tradition ensures maximum spiritual benefit.",
      "Fiqh of Nawafil: The establishment of the Sunnah of Fajr at home serves as a barrier against rendering houses into metaphorical graveyards.",
    ],
  },
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
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const [phase, setPhase] = useState("idle");
  const [typedText, setTypedText] = useState("");
  const [mode, setMode] = useState("Detailed");
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [thinkingStep, setThinkingStep] = useState(0);

  const fullQuestion = "How did Prophet ﷺ spend his mornings?";

  // 0. Wait for scroll
  useEffect(() => {
    if (isInView && phase === "idle") {
      setTimeout(() => setPhase("typing"), 500); // slight delay after scroll
    }
  }, [isInView, phase]);

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
    }, 70);

    return () => clearInterval(typingInterval);
  }, [phase]);

  // 2. Transition from sending to thinking
  useEffect(() => {
    if (phase === "sending") {
      setTimeout(() => setPhase("thinking"), 500);
    }
  }, [phase]);

  // 3. Thinking Steps (Updated Reasoning UI logic)
  useEffect(() => {
    if (phase === "thinking" || isRegenerating) {
      setThinkingStep(0);

      // Start the steps without an initial delay for a more responsive feel
      const timings = [0, 900, 1800];
      const timeouts = [];

      timings.forEach((time, index) => {
        const t = setTimeout(() => setThinkingStep(index + 1), time);
        timeouts.push(t);
      });

      const finalT = setTimeout(() => {
        if (isRegenerating) setIsRegenerating(false);
        else setPhase("answering");
      }, 2800);
      timeouts.push(finalT);

      // Cleanup to prevent overlaps if user rapidly toggles modes
      return () => timeouts.forEach(clearTimeout);
    }
  }, [phase, isRegenerating]);

  const handleModeChange = (newMode) => {
    if (newMode === mode || isRegenerating) return;
    setMode(newMode);
    setIsRegenerating(true);
  };

  const currentData = answers[mode] || answers.Detailed;

  return (
    <section
      id="tawfiq-ai"
      ref={containerRef}
      className="min-h-screen bg-[#F0FDF4] py-16 sm:py-24 px-4 sm:px-6 font-['Geist',sans-serif] selection:bg-[#16A34A] selection:text-white flex flex-col items-center"
    >
      {/* Visual Title Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto flex flex-col items-center"
      >
        <h2 className="text-3xl leading-[1.2] sm:text-6xl md:text-7xl font-['Newsreader',serif] font-light text-green-950 sm:leading-[1.15] tracking-tight">
          Learn Islam <br className="block sm:hidden" /> with{" "}
          <span className="text-[#16A34A] italic">Tawfiq AI</span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="mt-3 sm:mt-6 text-sm sm:text-xl font-['Newsreader',serif] font-light text-green-700 max-w-xl leading-relaxed px-2 sm:px-0"
        >
          An intelligent guide for your spiritual journey, delivering authentic
          Islamic insights tailored to your level of understanding.
        </motion.p>
      </motion.div>

      <div className="w-full max-w-3xl flex flex-col gap-6">
        {/* User Input / Premium Prompt Bubble */}
        <div className="flex justify-end min-h-[60px]">
          <AnimatePresence mode="wait">
            {phase === "idle" || phase === "typing" ? (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: phase === "idle" ? 0 : 1,
                  y: phase === "idle" ? 10 : 0,
                }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full bg-white px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl border border-green-200 shadow-sm text-green-950 text-sm sm:text-base flex items-center font-['Geist',sans-serif]"
              >
                <div className="opacity-40 text-sm sm:text-base shrink-0 mr-3 sm:mr-4">👤</div>
                <div className="flex-1 flex font-medium tracking-wide">
                  {typedText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-0.5 h-5 sm:h-5 bg-green-500 ml-1"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="bubble"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="bg-[#064E3B] text-emerald-50 px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl shadow-[0_8px_24px_-6px_rgba(6,78,59,0.4)] border border-[#065F46] max-w-[95%] sm:max-w-[85%] flex gap-3 sm:gap-4 items-start font-['Geist',sans-serif]"
              >
                <div className="mt-0.5 opacity-80 text-sm sm:text-base shrink-0">👤</div>
                <div className="flex flex-col w-full">
                  <div className="pb-2.5 text-sm sm:text-base font-medium tracking-wide">
                    {fullQuestion}
                  </div>
                  <div className="w-full h-px bg-gradient-to-r from-emerald-500/50 to-transparent" />
                </div>
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
              className="w-full bg-white rounded-3xl p-6 sm:p-12 shadow-[0_10px_40px_-20px_rgba(22,163,74,0.05)] border border-green-200/60 overflow-hidden"
            >
              {/* Thinking State */}
              {phase === "thinking" || isRegenerating ? (
                <div className="flex flex-col py-4 px-2">
                  <SubtleThinkingItem
                    title="Quran"
                    activeSubtitle="Searching relevant verses"
                    doneSubtitle="Relevant verses found"
                    step={thinkingStep}
                    targetStep={1}
                  />
                  <SubtleThinkingItem
                    title="Hadith"
                    activeSubtitle="Cross-checking narrations"
                    doneSubtitle="Relevant narrations found"
                    step={thinkingStep}
                    targetStep={2}
                  />
                  <SubtleThinkingItem
                    title="Seerah"
                    activeSubtitle="Building historical context"
                    doneSubtitle="Historical context built"
                    step={thinkingStep}
                    targetStep={3}
                  />
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
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 border-b border-green-100 pb-6">
                    <span className="text-[10px] uppercase tracking-widest text-green-500 font-semibold shrink-0 font-['Geist',sans-serif]">
                      Read this as
                    </span>
                    <div className="flex flex-wrap gap-1 bg-green-100/60 p-1 rounded-2xl sm:rounded-full w-full sm:w-auto">
                      {["Simple", "Detailed", "Scholarly"].map((m) => (
                        <button
                          key={m}
                          onClick={() => handleModeChange(m)}
                          className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 rounded-xl sm:rounded-full text-[10px] sm:text-xs font-['Geist',sans-serif] uppercase tracking-wider font-semibold transition-all ${
                            mode === m
                              ? "bg-white text-green-950 shadow-sm"
                              : "text-green-600 hover:text-green-800"
                          }`}
                        >
                          {mode === m ? "●" : "○"} {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Staggered Sections */}
                  <Section delay={0.2} title="Quick Answer">
                    <p className="font-['Newsreader',serif] font-light text-lg sm:text-2xl text-green-950 leading-snug">
                      {currentData.quick}
                    </p>
                  </Section>

                  <Divider delay={0.3} />

                  <Section
                    delay={0.4}
                    title={
                      mode === "Simple"
                        ? "In Simple Terms"
                        : "Context & Explanation"
                    }
                  >
                    <p className="font-['Newsreader',serif] font-light text-green-700 text-base sm:text-lg leading-relaxed">
                      {currentData.explanation}
                    </p>
                  </Section>

                  <Divider delay={0.5} />

                  <Section
                    delay={0.6}
                    title={
                      mode === "Simple"
                        ? "What Happened Next?"
                        : "The Step-by-Step Routine"
                    }
                  >
                    <ul className="space-y-3">
                      {currentData.sequence.map((item, i) => (
                        <li key={i} className="flex gap-3 sm:gap-4">
                          <span className="text-[#16A34A] font-semibold text-sm mt-0.5 sm:mt-1 font-['Geist',sans-serif]">
                            •
                          </span>
                          <span className="font-['Newsreader',serif] font-light text-green-800 text-base sm:text-lg">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Section>

                  <Divider delay={0.7} />

                  <Section delay={0.8} title="Evidence & Sources">
                    <div className="space-y-4">
                      {currentData.evidence.map((ev, i) => (
                        <p
                          key={i}
                          className="font-['Newsreader',serif] font-light text-green-700 italic text-base sm:text-lg border-l-2 border-[#16A34A]/50 pl-4"
                        >
                          {ev}
                        </p>
                      ))}
                    </div>
                  </Section>

                  {mode === "Scholarly" && (
                    <>
                      <Divider delay={0.9} />
                      <Section
                        delay={1.0}
                        title="Scholarly Opinions (Fajr Sunnah)"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                          {scholarlyOpinions.map((op, i) => (
                            <motion.div
                              key={op.school}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 1.0 + i * 0.15 }}
                              className="p-4 sm:p-5 border border-green-200 rounded-xl bg-[#F0FDF4]"
                            >
                              <div className="flex justify-between items-end mb-3 pb-3 border-b border-green-200">
                                <span className="font-['Newsreader',serif] font-normal text-base sm:text-lg text-green-950">
                                  {op.school}
                                </span>
                                <span className="text-[10px] font-['Geist',sans-serif] font-semibold uppercase tracking-widest text-[#16A34A]">
                                  {op.view}
                                </span>
                              </div>
                              <p className="font-['Newsreader',serif] font-light text-sm text-green-700 leading-relaxed">
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
                    title="Practical Lessons"
                  >
                    <ul className="space-y-3">
                      {currentData.lessons.map((item, i) => (
                        <li key={i} className="flex gap-3 sm:gap-4 items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2.5 sm:mt-3 shrink-0" />
                          <span className="font-['Newsreader',serif] font-light text-green-800 text-base sm:text-lg">
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

const SubtleThinkingItem = ({ title, activeSubtitle, doneSubtitle, step, targetStep }) => {
  const status = step < targetStep ? "hidden" : step === targetStep ? "loading" : "done";

  // When hidden, we render nothing to let the list "build" smoothly down the page
  if (status === "hidden") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-between items-start w-full sm:max-w-[300px] mb-7 last:mb-2"
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-2 text-green-950 font-medium font-['Geist',sans-serif] text-sm">
          <span className="text-[#16A34A] text-[13px] mt-0.5">✦</span> {title}
        </div>
        <div className="text-[15px] text-green-700/80 font-['Newsreader',serif] ml-6 mt-0.5">
          {status === "done" ? doneSubtitle : activeSubtitle}
        </div>
      </div>
      
      <div className="text-[#16A34A] text-sm font-bold flex items-center h-5 w-6 justify-center">
        {status === "done" ? (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-green-600 font-medium text-base"
          >
            ✓
          </motion.span>
        ) : (
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            className="tracking-widest mt-[-2px] text-lg"
          >
            ···
          </motion.span>
        )}
      </div>
    </motion.div>
  );
};

const Section = ({ title, children, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
  >
    <div className="text-[10px] uppercase tracking-widest font-['Geist',sans-serif] font-semibold text-green-500 mb-3 sm:mb-4">
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
    className="border-t border-green-200/80"
  />
);