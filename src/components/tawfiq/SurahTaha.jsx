import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// ==========================================
// DATA: VERSES
// ==========================================
const verses = [
  {
    id: 1,
    reference: "Al-Baqarah · 2:286",
    arabic: "لَا يُكَلِّفُ ٱللَّٰهُ نَفْسًا إِلَّا وُسْعَهَا",
    english: "“Allah does not burden a soul beyond what it can bear.”",
  },
  {
    id: 2,
    reference: "Ash-Sharh · 94:5",
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    english: "“For indeed, with hardship [will be] ease.”",
  },
  {
    id: 3,
    reference: "Ar-Ra'd · 13:28",
    arabic: "أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ",
    english:
      "“Unquestionably, by the remembrance of Allah hearts are assured.”",
  },
  {
    id: 4,
    reference: "Al-Baqarah · 2:152",
    arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ",
    english:
      "“So remember Me; I will remember you. And be grateful to Me and do not deny Me.”",
  },
  {
    id: 5,
    reference: "Ali 'Imran · 3:159",
    arabic: "فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ",
    english: "“And when you have decided, then rely upon Allah.”",
  },
  {
    id: 6,
    reference: "Al-Baqarah · 2:45",
    arabic: "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ",
    english: "“And seek help through patience and prayer.”",
  },
  {
    id: 7,
    reference: "At-Talaq · 65:3",
    arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    english: "“And whoever relies upon Allah - then He is sufficient for him.”",
  },
  {
    id: 8,
    reference: "Ghafir · 40:60",
    arabic: "ادْعُونِي أَسْتَجِبْ لَكُمْ",
    english: "“Call upon Me; I will respond to you.”",
  },
  {
    id: 9,
    reference: "Al-Baqarah · 2:186",
    arabic: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ",
    english: "“And when My servants ask you concerning Me - indeed I am near.”",
  },
  {
    id: 10,
    reference: "Ibrahim · 14:7",
    arabic: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
    english: "“If you are grateful, I will surely increase you [in favor].”",
  },
  {
    id: 11,
    reference: "Al-Baqarah · 2:153",
    arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    english: "“Indeed, Allah is with the patient.”",
  },
  {
    id: 12,
    reference: "Al-Ankabut · 29:69",
    arabic: "وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا",
    english:
      "“And those who strive for Us - We will surely guide them to Our ways.”",
  },
  {
    id: 13,
    reference: "Ali 'Imran · 3:139",
    arabic: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ",
    english:
      "“So do not weaken and do not grieve, and you will be superior if you are [true] believers.”",
  },
  {
    id: 14,
    reference: "At-Tawbah · 9:40",
    arabic: "لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا",
    english: "“Do not grieve; indeed Allah is with us.”",
  },
  {
    id: 15,
    reference: "Al-Baqarah · 2:216",
    arabic: "وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ",
    english: "“And it may be that you dislike a thing which is good for you.”",
  },
  {
    id: 16,
    reference: "Ash-Sharh · 94:6",
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    english: "“Indeed, with hardship [will be] ease.”",
  },
  {
    id: 17,
    reference: "Az-Zumar · 39:53",
    arabic: "لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ",
    english: "“Do not despair of the mercy of Allah.”",
  },
  {
    id: 18,
    reference: "Al-Anfal · 8:46",
    arabic: "وَاصْبِرُوا إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    english: "“And be patient. Indeed, Allah is with the patient.”",
  },
  {
    id: 19,
    reference: "Al-Baqarah · 2:155",
    arabic: "وَبَشِّرِ الصَّابِرِينَ",
    english: "“And give good tidings to the patient.”",
  },
  {
    id: 20,
    reference: "Al-Imran · 3:160",
    arabic: "وَإِن تَصْبِرُوا وَتَتَّقُوا لَا يَضُرُّكُمْ كَيْدُهُمْ شَيْئًا",
    english:
      "“And if you are patient and fear Allah, their plot will not harm you at all.”",
  },
  {
    id: 21,
    reference: "Al-Baqarah · 2:115",
    arabic: "فَأَيْنَمَا تُوَلُّوا فَثَمَّ وَجْهُ اللَّهِ",
    english: "“So wherever you [might] turn, there is the Face of Allah.”",
  },
  {
    id: 22,
    reference: "Al-Mu'minun · 23:111",
    arabic: "إِنِّي جَزَيْتُهُمُ الْيَوْمَ بِمَا صَبَرُوا",
    english:
      "“Indeed, I have rewarded them this Day for what they patiently endured.”",
  },
  {
    id: 23,
    reference: "Al-Imran · 3:200",
    arabic: "وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُفْلِحُونَ",
    english: "“And fear Allah that you may succeed.”",
  },
  {
    id: 24,
    reference: "Al-Furqan · 25:58",
    arabic: "وَتَوَكَّلْ عَلَى الْحَيِّ الَّذِي لَا يَمُوتُ",
    english: "“And rely upon the Ever-Living who does not die.”",
  },
  {
    id: 25,
    reference: "Al-Baqarah · 2:183",
    arabic:
      "كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ",
    english:
      "“Sustaining fasting has been prescribed for you as it was prescribed for those before you.”",
  },
  {
    id: 26,
    reference: "Ash-Shura · 42:19",
    arabic: "اللَّهُ لَطِيفٌ بِعِبَادِهِ",
    english: "“Allah is Subtle with His servants.”",
  },
  {
    id: 27,
    reference: "At-Talaq · 65:2",
    arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
    english: "“And whoever fears Allah - He will make for him a way out.”",
  },
  {
    id: 28,
    reference: "At-Talaq · 65:7",
    arabic: "سَيَجْعَلُ اللَّهُ بَعْدَ عُسْرٍ يُسْرًا",
    english: "“Allah will bring about, after hardship, ease.”",
  },
  {
    id: 29,
    reference: "Al-Baqarah · 2:255",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
    english:
      "“Allah - there is no deity except Him, the Ever-Living, the Sustainer of all existence.”",
  },
  {
    id: 30,
    reference: "Al-Imran · 3:8",
    arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا",
    english: "“Our Lord, let not our hearts deviate after You have guided us.”",
  },
  {
    id: 33,
    reference: "Al-Baqarah · 2:201",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً",
    english:
      "“Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good.”",
  },
];

// ==========================================
// DATA: FAQs
// ==========================================
const faqs = [
  {
    question: "What is Tawfiq, and how can it become part of my daily life?",
    answer:
      "Tawfiq is a comprehensive Islamic companion app designed to help you integrate faith into your daily routine through guided lessons, prayer tracking, Quranic reminders, and spiritual growth tools that work seamlessly with your lifestyle.",
  },
  {
    question: "I’ve fallen behind with my prayers. Can Tawfiq help me start again without feeling overwhelmed?",
    answer:
      "Absolutely. Tawfiq offers gentle, step-by-step guidance to help you reconnect with your prayers at your own pace, with personalized reminders, motivational streak tracking, and Qaza (makeup) prayer assistance that removes guilt and builds confidence.",
  },
  {
    question: "How does Tawfiq help me understand and practice Islam beyond just tracking my prayers?",
    answer:
      "Tawfiq goes beyond basic tracking by offering interactive lessons on the 99 Names of Allah, Duas for daily life, Seerah stories, Wudu guides, and practical Islamic teachings that help you live your faith with understanding and purpose.",
  },
  {
    question: "What makes Tawfiq different from a regular prayer or Quran app?",
    answer:
      "Unlike basic tracking apps, Tawfiq combines spiritual education with practical tools - offering contextual learning, guided practices, and holistic faith development that connects knowledge with action in your daily worship and character building.",
  },
  {
    question: "Do I need to know much about Islam to start using Tawfiq?",
    answer:
      "Not at all. Tawfiq is designed for everyone - whether you're beginning your journey or looking to deepen your practice. Content is presented in accessible, bite-sized formats that meet you where you are and grow with you.",
  },
];

// ==========================================
// COMPONENT: FAQ SECTION
// ==========================================
function FAQSection() {
  // Changed initial state from 0 to null so all accordions start closed
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#F0FDF4] py-24 px-4 sm:px-6 lg:px-8 font-['Geist',sans-serif]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        {/* Left Column: Title (Removed sticky properties to let it scroll up naturally) */}
        <div className="lg:col-span-4">
          <div className="relative inline-block">
            <h2 className="font-['Newsreader',serif] font-light text-6xl md:text-7xl text-green-950 tracking-tight">
              FAQ
            </h2>
            {/* Custom thick underline replicating the screenshot's style */}
            <div className="absolute -bottom-2 left-0 w-full h-1.5 bg-green-950 rounded-full" />
          </div>
        </div>

        {/* Right Column: Accordions */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  backgroundColor: isOpen ? "#ffffff" : "#ffffff",
                  borderColor: isOpen ? "#bbf7d0" : "#dcfce3",
                }}
                className={`rounded-[2rem] border overflow-hidden transition-shadow duration-300 ${
                  isOpen
                    ? "shadow-md shadow-green-900/5"
                    : "shadow-sm hover:shadow-md hover:border-green-200"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left outline-none cursor-pointer group"
                >
                  <span
                    className={`text-lg sm:text-xl font-['Newsreader',serif] font-light transition-colors duration-300 pr-4 ${
                      isOpen
                        ? "text-[#16A34A]"
                        : "text-green-950 group-hover:text-green-800"
                    }`}
                  >
                    {faq.question}
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex-shrink-0 ${
                      isOpen ? "text-[#16A34A]" : "text-green-600"
                    }`}
                  >
                    <ChevronDown size={24} strokeWidth={2.5} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 sm:px-8 pb-8 text-green-800 text-base sm:text-lg leading-relaxed font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// COMPONENT: BREATHING VERSES SECTION
// ==========================================
function BreathingVersesSection() {
  // Calculate the most relatable verse based on day and time
  const [relatableVerse, setRelatableVerse] = useState(null);

  useEffect(() => {
    const getRelatableVerse = () => {
      const now = new Date();
      const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
      const hour = now.getHours();

      // Determine time of day index
      let timeOfDayIndex;
      if (hour >= 5 && hour < 12) {
        timeOfDayIndex = 0; // morning
      } else if (hour >= 12 && hour < 17) {
        timeOfDayIndex = 1; // afternoon
      } else if (hour >= 17 && hour < 21) {
        timeOfDayIndex = 2; // evening
      } else {
        timeOfDayIndex = 3; // night (21:00-4:59)
      }

      // Calculate index: (dayOfWeek * 4 + timeOfDayIndex) % verses.length
      const index = (dayOfWeek * 4 + timeOfDayIndex) % verses.length;
      return verses[index];
    };

    setRelatableVerse(getRelatableVerse());

    // Update every hour to reflect time of day changes
    const timer = setInterval(() => {
      setRelatableVerse(getRelatableVerse());
    }, 3600000); // 1 hour

    return () => clearInterval(timer);
  }, []);

  if (!relatableVerse) {
    return null;
  }

  return (
    <section className="relative bg-[#F0FDF4] py-10 md:py-14 overflow-hidden flex items-center justify-center">
      <div className="relative max-w-3xl mx-auto px-6 text-center w-full">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            exit={{ x: -50 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            {/* Eyebrow Label */}
            <p className="text-[11px] font-['Geist',sans-serif] tracking-[0.25em] uppercase text-green-600 mb-16 md:mb-20 font-semibold">
              {relatableVerse.reference}
            </p>

            {/* Arabic Text */}
            <p
              className="font-arabic text-[clamp(2rem,6vw,4.25rem)] leading-[1.9] text-green-950"
              dir="rtl"
            >
              {relatableVerse.arabic}
            </p>

            {/* English Translation */}
            <p className="font-['Newsreader',serif] text-xl md:text-2xl italic font-light text-green-700 leading-relaxed mt-4 md:mt-6">
              {relatableVerse.english}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ==========================================
// DEFAULT EXPORT: MAIN PAGE CONTENT
// ==========================================
export default function BreathingVersesAndFAQ() {
  return (
    <>
      <FAQSection />
      <BreathingVersesSection />
    </>
  );
}
  