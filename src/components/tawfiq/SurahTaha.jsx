import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function BreathingVerses() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically cycle through the verses every 6 seconds to create the breathing pace
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % verses.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-[#F0FDF4] py-40 md:py-56 overflow-hidden min-h-[600px] flex items-center justify-center">
      <div className="relative max-w-3xl mx-auto px-6 text-center w-full">
        {/* mode="wait" ensures the exiting verse slides out cleanly before the next slides in. */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            {/* Eyebrow Label */}
            <p className="text-[11px] font-sans tracking-[0.25em] uppercase text-green-600 mb-16 md:mb-20">
              {verses[currentIndex].reference}
            </p>

            {/* Arabic Text */}
            <p
              className="font-arabic text-[clamp(2rem,6vw,4.25rem)] leading-[1.9] text-green-950"
              dir="rtl"
            >
              {verses[currentIndex].arabic}
            </p>

            {/* English Translation */}
            <p className="font-serif text-xl md:text-2xl italic font-light text-green-700 leading-relaxed mt-16 md:mt-20">
              {verses[currentIndex].english}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
