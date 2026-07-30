import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Check, Sparkles } from "lucide-react";

// Tajweed markup: madd (prolongation) in amber, ghunnah (nasalization) in emerald.
const Tajweed = ({ segments }) => (
  <>
    {segments.map((s, i) => (
      <span
        key={i}
        className={
          s.type === "madd"
            ? "text-amber-700 font-medium"
            : s.type === "ghunnah"
              ? "text-emerald-700 font-medium"
              : ""
        }
      >
        {s.text}
      </span>
    ))}
  </>
);

const ayahs = [
  {
    n: 1,
    segments: [
      { text: "بِسْمِ " },
      { type: "madd", text: "ٱللَّهِ" },
      { text: " " },
      { type: "madd", text: "ٱلرَّحْمَٰنِ" },
      { text: " " },
      { type: "madd", text: "ٱلرَّحِيمِ" },
    ],
    translation:
      "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
    audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3",
    tafsir:
      "Opening with Basmalah establishes that every righteous endeavor begins by seeking Allah's infinite mercy and grace.",
    root: "ب س م / أ ل ه",
    wordMeanings: [
      { word: "بِسْمِ", meaning: "In the name of" },
      { word: "ٱللَّهِ", meaning: "Allah" },
      { word: "ٱلرَّحْمَٰنِ", meaning: "The Entirely Merciful" },
      { word: "ٱلرَّحِيمِ", meaning: "The Especially Merciful" },
    ],
  },
  {
    n: 2,
    segments: [
      { text: "ٱلْحَمْدُ " },
      { type: "madd", text: "لِلَّهِ" },
      { text: " رَبِّ " },
      { type: "madd", text: "ٱلعَٰلَمِينَ" },
    ],
    translation: "[All] praise is [due] to Allah, Lord of the worlds.",
    audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2.mp3",
    tafsir:
      "Hamd is praise paired with gratitude and reverence, recognizing Allah as the sole Sustainer and Cherisher of all creation.",
    root: "ح م د / ر ب ب",
    wordMeanings: [
      { word: "ٱلْحَمْدُ", meaning: "All praise" },
      { word: "لِلَّهِ", meaning: "is due to Allah" },
      { word: "رَبِّ", meaning: "Lord/Sustainer" },
      { word: "ٱلعَٰلَمِينَ", meaning: "of the worlds" },
    ],
  },
  {
    n: 3,
    segments: [
      { type: "madd", text: "ٱلرَّحْمَٰنِ" },
      { text: " " },
      { type: "madd", text: "ٱلرَّحِيمِ" },
    ],
    translation: "The Entirely Merciful, the Especially Merciful.",
    audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/3.mp3",
    tafsir:
      "Ar-Rahman encompasses universal mercy for all creation, while Ar-Rahim denotes specific mercy bestowed upon the believers.",
    root: "ر ح م",
    wordMeanings: [
      { word: "ٱلرَّحْمَٰنِ", meaning: "The Entirely Merciful" },
      { word: "ٱلرَّحِيمِ", meaning: "The Especially Merciful" },
    ],
  },
  {
    n: 4,
    segments: [
      { type: "madd", text: "مَٰلِكِ" },
      { text: " يَوْمِ " },
      { type: "ghunnah", text: "ٱلدِّينِ" },
    ],
    translation: "Sovereign of the Day of Recompense.",
    audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/4.mp3",
    tafsir:
      "Reminds the believer of ultimate accountability, balancing hope in His mercy with mindfulness of final judgment.",
    root: "م ل ك / د ي ن",
    wordMeanings: [
      { word: "مَٰلِكِ", meaning: "Master / Sovereign" },
      { word: "يَوْمِ", meaning: "of the Day" },
      { word: "ٱلدِّينِ", meaning: "of Judgment / Recompense" },
    ],
  },
  {
    n: 5,
    segments: [{ text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ" }],
    translation: "It is You we worship and You we ask for help.",
    audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/5.mp3",
    tafsir:
      "The core pivot of Surah Al-Fatiha: moving from praise of Allah to absolute surrender, declaring reliance solely upon Him.",
    root: "ع ب د / ع و ن",
    wordMeanings: [
      { word: "إِيَّاكَ", meaning: "You alone" },
      { word: "نَعْبُدُ", meaning: "we worship" },
      { word: "وَإِيَّاكَ", meaning: "and You alone" },
      { word: "نَسْتَعِينُ", meaning: "we ask for help" },
    ],
  },
  {
    n: 6,
    segments: [
      { text: "ٱهْدِنَا " },
      { type: "madd", text: "ٱلصِّرَٰطَ" },
      { text: " " },
      { type: "madd", text: "ٱلْمُسْتَقِيمَ" },
    ],
    translation: "Guide us to the straight path.",
    audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6.mp3",
    tafsir:
      "The ultimate supplication. Guidance is not a static state but a continuous request for alignment with divine truth.",
    root: "ه د ي / ص ر ط",
    wordMeanings: [
      { word: "ٱهْدِنَا", meaning: "Guide us" },
      { word: "ٱلصِّرَٰطَ", meaning: "to the path" },
      { word: "ٱلْمُسْتَقِيمَ", meaning: "the straight" },
    ],
  },
  {
    n: 7,
    segments: [
      { type: "madd", text: "صِرَٰطَ" },
      { text: " " },
      { type: "ghunnah", text: "ٱلَّذِينَ" },
      { text: " أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا " },
      { type: "madd", text: "ٱلضَّآلِّينَ" },
    ],
    translation:
      "The path of those upon whom You have bestowed favor, not of those who have evoked anger or of those who are astray.",
    audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/7.mp3",
    tafsir:
      "Defines the straight path through the company of the blessed prophets, truthful ones, martyrs, and righteous believers.",
    root: "ن ع م / غ ض ب / ض ل ل",
    wordMeanings: [
      { word: "صِرَٰطَ", meaning: "The path" },
      { word: "ٱلَّذِينَ", meaning: "of those" },
      { word: "أَنْعَمْتَ", meaning: "You bestowed favor" },
      { word: "عَلَيْهِمْ", meaning: "upon them" },
    ],
  },
];

// Waveform component
const Waveform = ({ isPlaying }) => (
  <div className="flex items-end gap-[2px] h-3">
    {[...Array(16)].map((_, i) => (
      <motion.div
        key={i}
        className="w-[1.5px] bg-[#C6A26B] rounded-full origin-bottom"
        animate={{
          height: isPlaying
            ? [
                `${Math.random() * 40 + 20}%`,
                `${Math.random() * 60 + 40}%`,
                "30%",
              ]
            : "20%",
        }}
        transition={{
          duration: 0.8 + Math.random() * 0.5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

// Circular progress indicator
const CircularProgress = ({ percentage }) => {
  const radius = 9;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-8 h-8">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="rotate-[-90deg]"
      >
        <circle
          cx="12"
          cy="12"
          r={radius}
          fill="none"
          stroke="#E7E5E4"
          strokeWidth="1.5"
        />
        <motion.circle
          cx="12"
          cy="12"
          r={radius}
          fill="none"
          stroke="#C6A26B"
          strokeWidth="1.5"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[8px] font-sans text-stone-500 font-medium tabular-nums">
        {Math.round(percentage)}%
      </span>
    </div>
  );
};

export default function Quran() {
  const [current, setCurrent] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  // Navigation State (Mushaf, Themes, Memorize)
  const [activeTab, setActiveTab] = useState("reading"); // "reading", "themes", "memorization"
  const [selectedVerseForPanel, setSelectedVerseForPanel] = useState(null);
  const [memorizationMode, setMemorizationMode] = useState("none"); // "none", "hide-translation", "hide-arabic"

  const audioRef = useRef(null);

  const overallPercentage = isComplete
    ? 100
    : Math.min(((current - 1 + progress) / ayahs.length) * 100, 100);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying && !isComplete) {
      audio.src = ayahs[current - 1].audio;
      audio.play().catch(() => {});
    } else if (!audio.paused) {
      audio.pause();
    }
  }, [isPlaying, current, isComplete]);

  const handleEnded = () => {
    if (current < ayahs.length) {
      setProgress(0);
      setCurrent((c) => c + 1);
    } else {
      setIsPlaying(false);
      setIsComplete(true);
      setStarted(false);
      setProgress(1);
    }
  };

  const handleTime = () => {
    const a = audioRef.current;
    if (a && a.duration) setProgress(a.currentTime / a.duration);
  };

  const toggle = () => {
    if (isComplete) {
      setIsComplete(false);
      setCurrent(1);
      setProgress(0);
      setStarted(true);
      setIsPlaying(true);
    } else if (!isPlaying) {
      setStarted(true);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const resumeLabel = started && !isPlaying && current > 1 && !isComplete;

  return (
    <section
      id="quran"
      className="relative bg-[#F7F5F1] py-24 md:py-32 overflow-hidden selection:bg-[#C6A26B] selection:text-white font-['Manrope']"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 20%, rgba(253,247,237,0.6) 0%, transparent 60%)",
        }}
      />

      {/* Header */}
      <div className="relative max-w-4xl mx-auto px-6 md:px-10 mb-16 md:mb-20 mt-12 md:mt-16">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-serif text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.15] tracking-[-0.01em] text-stone-900"
          >
            Read the way{" "}
            <span className="italic font-light text-[#C6A26B]">
              it was meant to be read.
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-6 flex flex-col items-center"
          >
            <p className="font-serif text-[15px] text-stone-500 leading-[1.6] max-w-lg">
              Experience the living Mushaf with interactive Tafsir, word-by-word
              learning, themes, and memorization tools.
            </p>
          </motion.div>

          {/* Sub-Navigation Tabs - FIXED FOR MOBILE */}
          <div className="flex flex-nowrap items-center justify-start sm:justify-center gap-1 sm:gap-2 mt-8 bg-stone-200/50 p-1.5 rounded-full border border-stone-300/40 w-max max-w-full overflow-x-auto mx-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab("reading")}
              className={`whitespace-nowrap px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === "reading"
                  ? "bg-stone-900 text-stone-100 shadow-sm"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Mushaf
            </button>
            <button
              onClick={() => setActiveTab("themes")}
              className={`whitespace-nowrap px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === "themes"
                  ? "bg-stone-900 text-stone-100 shadow-sm"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Themes
            </button>
            <button
              onClick={() => setActiveTab("memorization")}
              className={`whitespace-nowrap px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === "memorization"
                  ? "bg-stone-900 text-stone-100 shadow-sm"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Memorize
            </button>
          </div>
        </div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <AnimatePresence mode="wait">
          {/* TAB 1: MUSHAF READING EXPERIENCE */}
          {activeTab === "reading" && (
            <motion.div
              key="tab-reading"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative bg-[#FAFAFA] rounded border border-stone-200/50 shadow-[0_40px_100px_-40px_rgba(28,25,23,0.15)] overflow-hidden">
                <div className="absolute top-0 left-0 h-[2px] w-full bg-stone-100 z-10">
                  <motion.div
                    className="h-full bg-[#C6A26B]"
                    animate={{ width: `${overallPercentage}%` }}
                    transition={{ duration: 0.4, ease: "linear" }}
                  />
                </div>

                {/* Adjusted padding for mobile */}
                <div className="p-6 sm:p-10 md:p-16">
                  <div className="flex items-baseline justify-between mb-10 sm:mb-16 pb-6 border-b border-stone-200/60">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-stone-900">
                        Surah <span className="text-[#C6A26B]">Al-Fatiha</span>
                      </h3>
                      <div className="flex items-center gap-3 mt-1.5 text-[10px] font-sans text-stone-400 uppercase tracking-widest">
                        <p>Alafasy</p>
                        <span className="w-1 h-1 bg-stone-300 rounded-full" />
                        <p className="tabular-nums">
                          {isComplete
                            ? "00:00"
                            : `Ayah ${current} of ${ayahs.length}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex items-center gap-3 text-[10px] font-sans text-stone-400">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-700" />
                          Madd
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-700" />
                          Ghunnah
                        </span>
                      </div>
                      <div className="flex items-center gap-4 sm:gap-6">
                        <Waveform isPlaying={isPlaying} />
                        <CircularProgress percentage={overallPercentage} />
                      </div>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {!isComplete ? (
                      <motion.div
                        key="reading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, filter: "blur(4px)" }}
                        transition={{ duration: 0.6 }}
                      >
                        <div dir="rtl" className="space-y-6">
                          {ayahs.map((a) => {
                            const active = a.n === current && isPlaying;
                            const visible =
                              Math.abs(a.n - current) <= 1 || isComplete;

                            if (!visible) return null;

                            return (
                              <div
                                key={a.n}
                                onClick={() => setSelectedVerseForPanel(a)}
                                className={`rounded-xl px-4 py-3 -mx-4 transition-all duration-700 cursor-pointer group ${
                                  active
                                    ? "bg-amber-50/70"
                                    : "hover:bg-stone-100/60"
                                }`}
                              >
                                <p
                                  className={`font-arabic leading-[2.1] transition-all duration-500 ${
                                    active
                                      ? "text-stone-900 text-[clamp(1.6rem,4vw,2.4rem)]"
                                      : "text-stone-700 text-[clamp(1.4rem,3.5vw,2rem)]"
                                  }`}
                                >
                                  <Tajweed segments={a.segments} />
                                  <span className="inline-flex items-center justify-center w-7 h-7 mx-1 align-middle rounded-full border border-stone-300 text-[11px] font-sans text-stone-400 not-italic group-hover:border-[#C6A26B] group-hover:text-[#C6A26B]">
                                    {a.n}
                                  </span>
                                </p>
                                {showTranslation && (
                                  <div
                                    className="flex justify-between items-start mt-2"
                                    dir="ltr"
                                  >
                                    <p
                                      className={`font-serif italic font-light transition-all duration-500 ${
                                        active
                                          ? "text-stone-700 text-base"
                                          : "text-stone-400 text-sm"
                                      }`}
                                    >
                                      {a.translation}
                                    </p>
                                    <span className="hidden sm:block text-[10px] text-[#C6A26B] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider font-semibold ml-4 shrink-0">
                                      Tap for Tafsir →
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {resumeLabel && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-10 text-center text-[11px] font-sans tracking-[0.15em] uppercase text-amber-700/70"
                          >
                            Continue from Ayah {current}
                          </motion.p>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="complete"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.8,
                          ease: "easeOut",
                          delay: 0.2,
                        }}
                        className="flex flex-col items-center justify-center py-16"
                      >
                        <div className="relative flex items-center justify-center w-16 h-16 mb-6">
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
                            transition={{ duration: 2.5, ease: "easeOut" }}
                            className="absolute inset-0 rounded-full border border-[#C6A26B]"
                          />
                          <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center border border-stone-200 text-[#C6A26B]">
                            <Check size={18} />
                          </div>
                        </div>

                        <h4 className="font-serif text-xl text-stone-900 mb-2">
                          Surah Complete
                        </h4>
                        <p className="text-[11px] font-sans tracking-widest uppercase text-[#C6A26B] mb-10 font-semibold">
                          Alhamdulillah
                        </p>

                        <button
                          onClick={toggle}
                          className="text-[11px] font-sans text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-widest border-b border-stone-300 pb-1 cursor-pointer"
                        >
                          Read Again
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Control bar - adjusted padding for mobile */}
                <div className="flex items-center justify-between gap-4 px-6 sm:px-10 md:px-16 py-4 sm:py-6 border-t border-stone-200/60 bg-stone-50/40">
                  <button
                    onClick={toggle}
                    className="group relative inline-flex items-center gap-3 transition-colors duration-300 cursor-pointer"
                  >
                    {isPlaying && !isComplete && (
                      <motion.span
                        className="absolute -inset-2 rounded-full border border-amber-600/20"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                    <div className="w-11 h-11 rounded-full bg-stone-900 flex items-center justify-center text-stone-50 transition-all duration-300 hover:bg-stone-800 active:scale-95 group-hover:scale-105 shrink-0">
                      {isPlaying ? (
                        <Pause size={16} strokeWidth={2} />
                      ) : (
                        <Play size={16} strokeWidth={2} className="ml-0.5" />
                      )}
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="font-serif text-lg text-stone-900">
                        {isComplete
                          ? "Alhamdulillah"
                          : isPlaying
                            ? "Pause"
                            : "Listen"}
                      </p>
                      <p className="text-[10px] font-sans text-stone-400 mt-0.5 uppercase tracking-wide">
                        {isComplete
                          ? "Surah Complete"
                          : isPlaying
                            ? `Ayah ${current}`
                            : resumeLabel
                              ? "Continue"
                              : "Begin"}
                      </p>
                    </div>
                  </button>

                  <div className="flex items-center gap-3 sm:gap-6">
                    <button
                      onClick={() => setShowTranslation((s) => !s)}
                      className="text-[10px] sm:text-[11px] font-sans text-stone-400 hover:text-stone-900 transition-colors cursor-pointer"
                    >
                      {showTranslation
                        ? "Hide Translation"
                        : "Show Translation"}
                    </button>
                    <div className="text-[10px] sm:text-[11px] font-sans tracking-[0.12em] uppercase px-3 py-1.5 rounded-full border border-stone-200 text-stone-400">
                      Tawfiq
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: VISUAL THEMES EXPLORER */}
          {activeTab === "themes" && (
            <motion.div
              key="tab-themes"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-12 shadow-sm"
            >
              <div className="text-center mb-8 sm:mb-10">
                <span className="text-xs uppercase tracking-[0.2em] text-[#C6A26B] font-semibold">
                  Quranic Themes
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 mt-2">
                  Study by Subject
                </h3>
                <p className="text-stone-500 font-light text-sm mt-1">
                  Explore clustered verses addressing core dimensions of faith
                  and life.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {[
                  {
                    name: "Mercy",
                    arabic: "الرحمة",
                    count: "114 Verses",
                    desc: "Embracing divine grace",
                  },
                  {
                    name: "Patience",
                    arabic: "الصبر",
                    count: "92 Verses",
                    desc: "Perseverance in trials",
                  },
                  {
                    name: "Prayer",
                    arabic: "الصلاة",
                    count: "85 Verses",
                    desc: "Connection with the Creator",
                  },
                  {
                    name: "Parents",
                    arabic: "البر",
                    count: "44 Verses",
                    desc: "Filial duty and honor",
                  },
                  {
                    name: "Charity",
                    arabic: "الصدقة",
                    count: "62 Verses",
                    desc: "Purifying wealth",
                  },
                  {
                    name: "Justice",
                    arabic: "العدل",
                    count: "53 Verses",
                    desc: "Uprightness in society",
                  },
                ].map((theme, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedVerseForPanel(ayahs[0])}
                    className="bg-[#F7F5F1] hover:bg-amber-50/50 border border-stone-200/60 rounded-xl p-4 sm:p-5 text-center cursor-pointer transition-all duration-300 group hover:-translate-y-1 shadow-sm"
                  >
                    <span className="font-arabic text-lg sm:text-xl text-[#C6A26B] block mb-1">
                      {theme.arabic}
                    </span>
                    <h4 className="font-serif text-stone-900 font-medium text-base sm:text-lg group-hover:text-[#C6A26B]">
                      {theme.name}
                    </h4>
                    <p className="text-stone-500 text-[11px] sm:text-xs mt-1 font-light">
                      {theme.desc}
                    </p>
                    <span className="inline-block mt-3 text-[10px] text-stone-400 font-sans tracking-wider uppercase">
                      {theme.count}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: MEMORIZATION MODE */}
          {activeTab === "memorization" && (
            <motion.div
              key="tab-memorization"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-12 shadow-sm text-center"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-[#C6A26B] font-semibold">
                Hifdh Assistant
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 mt-2 mb-4">
                Memorization Mode
              </h3>
              <p className="text-stone-500 text-sm font-light mb-8 max-w-lg mx-auto">
                Test your retention by progressively hiding Arabic words or
                translations and checking your recall.
              </p>

              {/* Mode Selector */}
              <div className="flex justify-center gap-2 mb-8 flex-wrap">
                {[
                  { id: "none", label: "Normal" },
                  { id: "hide-translation", label: "Hide Translation" },
                  { id: "hide-arabic", label: "Hide Arabic" },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMemorizationMode(m.id)}
                    className={`px-3 sm:px-4 py-2 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                      memorizationMode === m.id
                        ? "bg-[#C6A26B] text-white shadow-sm"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {/* Sample Verse Exercise Card */}
              <div className="bg-[#F7F5F1] border border-stone-200 rounded-2xl p-6 sm:p-8 mb-8 text-center">
                <span className="text-[10px] font-sans text-stone-400 uppercase tracking-widest block mb-4">
                  Ayah 1 of Al-Fatiha
                </span>
                {memorizationMode !== "hide-arabic" ? (
                  <p
                    className="font-arabic text-2xl sm:text-3xl text-stone-900 mb-4 leading-relaxed"
                    dir="rtl"
                  >
                    بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                  </p>
                ) : (
                  <div className="py-6 border-2 border-dashed border-stone-300 rounded-xl mb-4 text-stone-400 text-sm italic">
                    [Arabic hidden — tap reveal or recite from memory]
                  </div>
                )}

                {memorizationMode !== "hide-translation" ? (
                  <p className="font-serif italic text-stone-600 text-sm">
                    "In the name of Allah, the Entirely Merciful, the Especially
                    Merciful."
                  </p>
                ) : (
                  <div className="py-3 text-stone-400 text-xs italic">
                    [Translation hidden]
                  </div>
                )}
              </div>

              <button
                onClick={() =>
                  alert("Great effort! Keep practicing with Tawfiq Hifdh.")
                }
                className="bg-stone-900 text-white px-6 sm:px-8 py-3 rounded-full text-[10px] sm:text-xs font-semibold tracking-widest uppercase hover:bg-[#C6A26B] transition-colors cursor-pointer"
              >
                I Recited Correctly ✓
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* INTERACTIVE TAFSIR SIDE PANEL / MODAL */}
      <AnimatePresence>
        {selectedVerseForPanel && (
          <div className="fixed inset-0 z-[99999] flex justify-end bg-stone-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg bg-[#FAFAFA] h-full shadow-2xl flex flex-col overflow-y-auto p-6 sm:p-10 border-l border-stone-200"
            >
              <div className="flex justify-between items-center pb-4 sm:pb-6 border-b border-stone-200 mb-6 sm:mb-8">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#C6A26B] font-semibold">
                    Interactive Verse Study
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl text-stone-900 mt-1">
                    Ayah {selectedVerseForPanel.n}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedVerseForPanel(null)}
                  className="w-9 h-9 rounded-full bg-stone-200 hover:bg-stone-300 flex items-center justify-center text-stone-700 transition-colors cursor-pointer text-sm"
                >
                  ✕
                </button>
              </div>

              <div
                dir="rtl"
                className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm"
              >
                <p className="font-arabic text-xl sm:text-2xl text-stone-900 leading-[2.2] text-center">
                  <Tajweed segments={selectedVerseForPanel.segments} />
                </p>
              </div>

              <div className="mb-6">
                <h5 className="text-[10px] sm:text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                  Translation
                </h5>
                <p className="font-serif italic text-stone-700 text-sm sm:text-base">
                  "{selectedVerseForPanel.translation}"
                </p>
              </div>

              {/* Word-by-Word Breakdown */}
              <div className="mb-6">
                <h5 className="text-[10px] sm:text-xs uppercase tracking-wider text-stone-400 font-semibold mb-3">
                  Word Meanings & Roots
                </h5>
                <div className="grid grid-cols-2 gap-2">
                  {selectedVerseForPanel.wordMeanings.map((w, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-stone-200/80 p-3 rounded-xl"
                    >
                      <span
                        className="font-arabic text-sm sm:text-base text-[#C6A26B] block mb-0.5"
                        dir="rtl"
                      >
                        {w.word}
                      </span>
                      <span className="text-[10px] sm:text-xs text-stone-700 font-medium">
                        {w.meaning}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-stone-400 mt-2 font-mono">
                  Root mapping: {selectedVerseForPanel.root}
                </p>
              </div>

              {/* Tafsir / Reflection */}
              <div className="bg-amber-50/60 border border-amber-200/60 rounded-2xl p-5 sm:p-6 mb-8">
                <h5 className="text-[10px] sm:text-xs uppercase tracking-wider text-amber-800 font-semibold mb-2 flex items-center gap-2">
                  <Sparkles size={14} /> Authentic Tafsir Summary
                </h5>
                <p className="font-serif text-stone-700 text-xs sm:text-sm leading-relaxed">
                  {selectedVerseForPanel.tafsir}
                </p>
              </div>

              <div className="mt-auto pt-4 sm:pt-6 border-t border-stone-200 flex gap-3 sm:gap-4">
                <button
                  onClick={() => alert("Verse bookmarked to My Favorites!")}
                  className="flex-1 bg-stone-900 text-white py-3 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider hover:bg-[#C6A26B] transition-colors cursor-pointer"
                >
                  Bookmark Verse
                </button>
                <button
                  onClick={() => setSelectedVerseForPanel(null)}
                  className="px-5 sm:px-6 border border-stone-300 text-stone-700 py-3 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <audio
        ref={audioRef}
        onEnded={handleEnded}
        onTimeUpdate={handleTime}
        preload="none"
      />
    </section>
  );
}
