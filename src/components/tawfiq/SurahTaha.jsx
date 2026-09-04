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
    english: "“Unquestionably, by the remembrance of Allah hearts are assured.”",
  },
  {
    id: 4,
    reference: "Al-Baqarah · 2:152",
    arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ",
    english: "“So remember Me; I will remember you. And be grateful to Me and do not deny Me.”",
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
    english: "“And those who strive for Us - We will surely guide them to Our ways.”",
  },
  {
    id: 13,
    reference: "Ali 'Imran · 3:139",
    arabic: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ",
    english: "“So do not weaken and do not grieve, and you will be superior if you are [true] believers.”",
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
    english: "“And if you are patient and fear Allah, their plot will not harm you at all.”",
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
    english: "“Indeed, I have rewarded them this Day for what they patiently endured.”",
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
    arabic: "كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ",
    english: "“Sustaining fasting has been prescribed for you as it was prescribed for those before you.”",
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
    english: "“Allah - there is no deity except Him, the Ever-Living, the Sustainer of all existence.”",
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
    english: "“Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good.”",
  },
  {
    id: 34,
    reference: "Ar-Rahman · 55:60",
    arabic: "هَلْ جَزَاءُ الْإِحْسَانِ إِلَّا الْإِحْسَانُ",
    english: "“Is the reward for good [anything] but good?”",
  },
  {
    id: 35,
    reference: "Al-Baqarah · 2:195",
    arabic: "وَأَحْسِنُوا ۛ إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ",
    english: "“And do good; indeed, Allah loves the doers of good.”",
  },
  {
    id: 36,
    reference: "Al-Anfal · 8:30",
    arabic: "وَاللَّهُ خَيْرُ الْمَاكِرِينَ",
    english: "“And Allah is the best of planners.”",
  },
  {
    id: 37,
    reference: "Qaf · 50:16",
    arabic: "وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ الْوَرِيدِ",
    english: "“And We are closer to him than [his] jugular vein.”",
  },
  {
    id: 38,
    reference: "Ad-Duhaa · 93:3",
    arabic: "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ",
    english: "“Your Lord has not taken leave of you, [O Muhammad], nor has He detested [you].”",
  },
  {
    id: 39,
    reference: "Ad-Duhaa · 93:4",
    arabic: "وَلَلْآخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ",
    english: "“And the Hereafter is better for you than the first [life].”",
  },
  {
    id: 40,
    reference: "Ad-Duhaa · 93:5",
    arabic: "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ",
    english: "“And your Lord is going to give you, and you will be satisfied.”",
  },
  {
    id: 41,
    reference: "Yusuf · 12:86",
    arabic: "إِنَّمَا أَشْكُو بَثِّي وَحُزْنِي إِلَى اللَّهِ",
    english: "“I only complain of my suffering and my grief to Allah.”",
  },
  {
    id: 42,
    reference: "Taha · 20:46",
    arabic: "لَا تَخَافَا ۖ إِنَّنِي مَعَكُمَا أَسْمَعُ وَأَرَىٰ",
    english: "“[Allah] said, 'Fear not. Indeed, I am with you both; I hear and I see.'”",
  },
  {
    id: 43,
    reference: "Al-Muzzammil · 73:9",
    arabic: "لَّا إِلَٰهَ إِلَّا هُوَ فَاتَّخِذْهُ وَكِيلًا",
    english: "“[He is] the Lord of the East and the West; there is no deity except Him, so take Him as Disposer of [your] affairs.”",
  },
  {
    id: 44,
    reference: "Al Imran · 3:173",
    arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    english: "“Sufficient for us is Allah, and [He is] the best Disposer of affairs.”",
  },
  {
    id: 45,
    reference: "Al-Kahf · 18:24",
    arabic: "إِلَّا أَن يَشَاءَ اللَّهُ",
    english: "“Except [when adding], 'If Allah wills.'”",
  },
  {
    id: 46,
    reference: "Al-Anbiya · 21:89",
    arabic: "رَبِّ لَا تَذَرْنِي فَرْدًا",
    english: "“My Lord, do not leave me alone [with no heir], while you are the best of inheritors.”",
  },
  {
    id: 47,
    reference: "Al-Anbiya · 21:87",
    arabic: "لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
    english: "“There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.”",
  },
  {
    id: 48,
    reference: "An-Nisa · 4:28",
    arabic: "يُرِيدُ اللَّهُ أَن يُخَفِّفَ عَنكُمْ ۚ وَخُلِقَ الْإِنسَانُ ضَعِيفًا",
    english: "“Allah wants to lighten for you [your difficulties]; and mankind was created weak.”",
  },
  {
    id: 49,
    reference: "Al-Anfal · 8:2",
    arabic: "إِنَّمَا الْمُؤْمِنُونَ الَّذِينَ إِذَا ذُكِرَ اللَّهُ وَجِلَتْ قُلُوبُهُمْ",
    english: "“The believers are only those who, when Allah is mentioned, their hearts become fearful.”",
  },
  {
    id: 50,
    reference: "Ghafir · 40:44",
    arabic: "وَأُفَوِّضُ أَمْرِي إِلَى اللَّهِ ۚ إِنَّ اللَّهَ بَصِيرٌ بِالْعِبَادِ",
    english: "“And I entrust my affair to Allah. Indeed, Allah is Seeing of [His] servants.”",
  },
  {
    id: 51,
    reference: "At-Tawbah · 9:129",
    arabic: "حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ ۖ عَلَيْهِ تَوَكَّلْتُ",
    english: "“Sufficient for me is Allah; there is no deity except Him. On Him I have relied.”",
  },
  {
    id: 52,
    reference: "Ar-Rahman · 55:13",
    arabic: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ",
    english: "“So which of the favors of your Lord would you deny?”",
  },
  {
    id: 53,
    reference: "Al-Baqarah · 2:156",
    arabic: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ",
    english: "“Indeed we belong to Allah, and indeed to Him we will return.”",
  },
  {
    id: 54,
    reference: "Al-Baqarah · 2:256",
    arabic: "لَا إِكْرَاهَ فِي الدِّينِ",
    english: "“There shall be no compulsion in [acceptance of] the religion.”",
  },
  {
    id: 55,
    reference: "Al Imran · 3:190",
    arabic: "لَآيَاتٍ لِّأُولِي الْأَلْبَابِ",
    english: "“...there are signs for those of understanding.”",
  },
  {
    id: 56,
    reference: "Al-Qasas · 28:24",
    arabic: "رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ",
    english: "“My Lord, indeed I am, for whatever good You would send down to me, in need.”",
  },
  {
    id: 57,
    reference: "Taha · 20:25",
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي",
    english: "“[Moses] said, 'My Lord, expand for me my breast [with assurance].'”",
  },
  {
    id: 58,
    reference: "Taha · 20:26",
    arabic: "وَيَسِّرْ لِي أَمْرِي",
    english: "“And ease for me my task.”",
  },
  {
    id: 59,
    reference: "Taha · 20:114",
    arabic: "رَّبِّ زِدْنِي عِلْمًا",
    english: "“My Lord, increase me in knowledge.”",
  },
  {
    id: 60,
    reference: "Al-Hashr · 59:23",
    arabic: "هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْمَلِكُ الْقُدُّوسُ السَّلَامُ",
    english: "“He is Allah, other than whom there is no deity, the Sovereign, the Pure, the Perfection...”",
  },
  {
    id: 61,
    reference: "Al-Hashr · 59:24",
    arabic: "هُوَ اللَّهُ الْخَالِقُ الْبَارِئُ الْمُصَوِّرُ ۖ لَهُ الْأَسْمَاءُ الْحُسْنَىٰ",
    english: "“He is Allah, the Creator, the Inventor, the Fashioner; to Him belong the best names.”",
  },
  {
    id: 62,
    reference: "Hud · 11:88",
    arabic: "وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ۚ عَلَيْهِ تَوَكَّلْتُ وَإِلَيْهِ أُنِيبُ",
    english: "“And my success is not but through Allah. Upon him I have relied, and to Him I return.”",
  },
  {
    id: 63,
    reference: "Al Imran · 3:37",
    arabic: "إِنَّ اللَّهَ يَرْزُقُ مَن يَشَاءُ بِغَيْرِ حِسَابٍ",
    english: "“Indeed, Allah provides for whom He wills without account.”",
  },
  {
    id: 64,
    reference: "An-Nur · 24:35",
    arabic: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ",
    english: "“Allah is the Light of the heavens and the earth.”",
  },
  {
    id: 65,
    reference: "Al Imran · 3:103",
    arabic: "وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا",
    english: "“And hold firmly to the rope of Allah all together and do not become divided.”",
  },
  {
    id: 66,
    reference: "Al-A'raf · 7:156",
    arabic: "وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ",
    english: "“But My mercy encompasses all things.”",
  },
  {
    id: 67,
    reference: "Al-Hijr · 15:56",
    arabic: "وَمَن يَقْنَطُ مِن رَّحْمَةِ رَبِّهِ إِلَّا الضَّالُّونَ",
    english: "“And who despairs of the mercy of his Lord except for those astray?”",
  },
  {
    id: 68,
    reference: "Al-Mulk · 67:13",
    arabic: "وَأَسِرُّوا قَوْلَكُمْ أَوِ اجْهَرُوا بِهِ ۖ إِنَّهُ عَلِيمٌ بِذَاتِ الصُّدُورِ",
    english: "“And conceal your speech or publicize it; indeed, He is Knowing of that within the breasts.”",
  },
  {
    id: 69,
    reference: "Al Imran · 3:73",
    arabic: "قُلْ إِنَّ الْفَضْلَ بِيَدِ اللَّهِ يُؤْتِيهِ مَن يَشَاءُ",
    english: "“Say, 'Indeed, [all] bounty is in the hand of Allah - He grants it to whom He wills.'”",
  },
  {
    id: 70,
    reference: "Al-A'raf · 7:180",
    arabic: "وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَىٰ فَادْعُوهُ بِهَا",
    english: "“And to Allah belong the best names, so invoke Him by them.”",
  },
  {
    id: 71,
    reference: "Al-Baqarah · 2:163",
    arabic: "وَإِلَٰهُكُمْ إِلَٰهٌ وَاحِدٌ ۖ لَّا إِلَٰهَ إِلَّا هُوَ الرَّحْمَٰنُ الرَّحِيمُ",
    english: "“And your god is one God. There is no deity [worthy of worship] except Him, the Entirely Merciful, the Especially Merciful.”",
  },
  {
    id: 72,
    reference: "Ash-Shuraa · 42:11",
    arabic: "لَيْسَ كَمِثْلِهِ شَيْءٌ ۖ وَهُوَ السَّمِيعُ الْبَصِيرُ",
    english: "“There is nothing like unto Him, and He is the Hearing, the Seeing.”",
  },
  {
    id: 73,
    reference: "An-Nahl · 16:18",
    arabic: "وَإِن تَعُدُّوا نِعْمَةَ اللَّهِ لَا تُحْصُوهَا",
    english: "“And if you should count the favors of Allah, you could not enumerate them.”",
  },
  {
    id: 74,
    reference: "Luqman · 31:22",
    arabic: "وَمَن يُسْلِمْ وَجْهَهُ إِلَى اللَّهِ وَهُوَ مُحْسِنٌ فَقَدِ اسْتَمْسَكَ بِالْعُرْوَةِ الْوُثْقَىٰ",
    english: "“And whoever submits his face to Allah while he is a doer of good - then he has grasped the most trustworthy handhold.”",
  },
  {
    id: 75,
    reference: "Yunus · 10:62",
    arabic: "أَلَا إِنَّ أَوْلِيَاءَ اللَّهِ لَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ",
    english: "“Unquestionably, [for] the allies of Allah there will be no fear concerning them, nor will they grieve.”",
  },
  {
    id: 76,
    reference: "Yunus · 10:107",
    arabic: "وَإِن يَمْسَسْكَ اللَّهُ بِضُرٍّ فَلَا كَاشِفَ لَهُ إِلَّا هُوَ",
    english: "“And if Allah should touch you with adversity, there is no remover of it except Him.”",
  },
  {
    id: 77,
    reference: "Hud · 11:6",
    arabic: "وَمَا مِن دَابَّةٍ فِي الْأَرْضِ إِلَّا عَلَى اللَّهِ رِزْقُهَا",
    english: "“And there is no creature on earth but that upon Allah is its provision.”",
  },
  {
    id: 78,
    reference: "Ar-Ra'd · 13:11",
    arabic: "إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ",
    english: "“Indeed, Allah will not change the condition of a people until they change what is in themselves.”",
  },
  {
    id: 79,
    reference: "Al-Isra · 17:80",
    arabic: "رَّبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ وَأَخْرِجْنِي مُخْرَجَ صِدْقٍ",
    english: "“My Lord, cause me to enter a sound entrance and to exit a sound exit.”",
  },
  {
    id: 80,
    reference: "Al-Kahf · 18:10",
    arabic: "رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا",
    english: "“Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance.”",
  },
  {
    id: 81,
    reference: "Al-Kahf · 18:46",
    arabic: "وَالْبَاقِيَاتُ الصَّالِحَاتُ خَيْرٌ عِندَ رَبِّكَ ثَوَابًا وَخَيْرٌ أَمَلًا",
    english: "“But the enduring good deeds are better to your Lord for reward and better for [one's] hope.”",
  },
  {
    id: 82,
    reference: "Al-Anbiya · 21:35",
    arabic: "كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ ۗ وَنَبْلُوكُم بِالشَّرِّ وَالْخَيْرِ فِتْنَةً",
    english: "“Every soul will taste death. And We test you with evil and with good as trial.”",
  },
  {
    id: 83,
    reference: "Al-Anbiya · 21:107",
    arabic: "وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ",
    english: "“And We have not sent you, [O Muhammad], except as a mercy to the worlds.”",
  },
  {
    id: 84,
    reference: "Al-Mu'minun · 23:118",
    arabic: "رَّبِّ اغْفِرْ وَارْحَمْ وَأَنتَ خَيْرُ الرَّاحِمِينَ",
    english: "“My Lord, forgive and have mercy, and You are the best of the merciful.”",
  },
  {
    id: 85,
    reference: "Al-Furqan · 25:63",
    arabic: "وَعِبَادُ الرَّحْمَٰنِ الَّذِينَ يَمْشُونَ عَلَى الْأَرْضِ هَوْنًا",
    english: "“And the servants of the Most Merciful are those who walk upon the earth easily.”",
  },
  {
    id: 86,
    reference: "Al-Furqan · 25:74",
    arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ",
    english: "“Our Lord, grant us from among our wives and offspring comfort to our eyes.”",
  },
  {
    id: 87,
    reference: "Ash-Shu'ara · 26:78",
    arabic: "الَّذِي خَلَقَنِي فَهُوَ يَهْدِينِ",
    english: "“Who created me, and He [it is who] guides me.”",
  },
  {
    id: 88,
    reference: "Ash-Shu'ara · 26:79",
    arabic: "وَالَّذِي هُوَ يُطْعِمُنِي وَيَسْقِينِ",
    english: "“And it is He who feeds me and gives me drink.”",
  },
  {
    id: 89,
    reference: "Ash-Shu'ara · 26:80",
    arabic: "وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ",
    english: "“And when I am ill, it is He who cures me.”",
  },
  {
    id: 90,
    reference: "Al-Qasas · 28:16",
    arabic: "رَبِّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي",
    english: "“My Lord, indeed I have wronged myself, so forgive me.”",
  },
  {
    id: 91,
    reference: "Al-Qasas · 28:68",
    arabic: "وَرَبُّكَ يَخْلُقُ مَا يَشَاءُ وَيَخْتَارُ",
    english: "“And your Lord creates what He wills and chooses.”",
  },
  {
    id: 92,
    reference: "Al-Ankabut · 29:2",
    arabic: "أَحَسِبَ النَّاسُ أَن يُتْرَكُوا أَن يَقُولُوا آمَنَّا وَهُمْ لَا يُفْتَنُونَ",
    english: "“Do the people think that they will be left to say, 'We believe' and they will not be tried?”",
  },
  {
    id: 93,
    reference: "Ar-Rum · 30:21",
    arabic: "خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا",
    english: "“...He created for you from yourselves mates that you may find tranquility in them.”",
  },
  {
    id: 94,
    reference: "Al-Ahzab · 33:3",
    arabic: "وَتَوَكَّلْ عَلَى اللَّهِ ۚ وَكَفَىٰ بِاللَّهِ وَكِيلًا",
    english: "“And rely upon Allah; and sufficient is Allah as Disposer of affairs.”",
  },
  {
    id: 95,
    reference: "Al-Ahzab · 33:41",
    arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اذْكُرُوا اللَّهَ ذِكْرًا كَثِيرًا",
    english: "“O you who have believed, remember Allah with much remembrance.”",
  },
  {
    id: 96,
    reference: "Fatir · 35:2",
    arabic: "مَّا يَفْتَحِ اللَّهُ لِلنَّاسِ مِن رَّحْمَةٍ فَلَا مُمْسِكَ لَهَا",
    english: "“Whatever Allah grants to people of mercy - none can withhold it.”",
  },
  {
    id: 97,
    reference: "Fatir · 35:15",
    arabic: "يَا أَيُّهَا النَّاسُ أَنتُمُ الْفُقَرَاءُ إِلَى اللَّهِ ۖ وَاللَّهُ هُوَ الْغَنِيُّ الْحَمِيدُ",
    english: "“O mankind, you are those in need of Allah, while Allah is the Free of need, the Praiseworthy.”",
  },
  {
    id: 98,
    reference: "Ya-Sin · 36:82",
    arabic: "إِنَّمَا أَمْرُهُ إِذَا أَرَادَ شَيْئًا أَن يَقُولَ لَهُ كُن فَيَكُونُ",
    english: "“His command is only when He intends a thing that He says to it, 'Be,' and it is.”",
  },
  {
    id: 99,
    reference: "Sad · 38:54",
    arabic: "إِنَّ هَٰذَا لَرِزْقُنَا مَا لَهُ مِن نَّفَادٍ",
    english: "“Indeed, this is Our provision; for it there is no depletion.”",
  },
  {
    id: 100,
    reference: "Az-Zumar · 39:10",
    arabic: "إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ",
    english: "“Indeed, the patient will be given their reward without account.”",
  },
  {
    id: 101,
    reference: "Az-Zumar · 39:36",
    arabic: "أَلَيْسَ اللَّهُ بِكَافٍ عَبْدَهُ",
    english: "“Is not Allah sufficient for His Servant?”",
  },
  {
    id: 102,
    reference: "Ghafir · 40:40",
    arabic: "وَمَنْ عَمِلَ صَالِحًا مِّن ذَكَرٍ أَوْ أُنثَىٰ وَهُوَ مُؤْمِنٌ فَأُولَٰئِكَ يَدْخُلُونَ الْجَنَّةَ",
    english: "“And whoever does righteousness, whether male or female, while being a believer - those will enter Paradise.”",
  },
  {
    id: 103,
    reference: "Ghafir · 40:65",
    arabic: "هُوَ الْحَيُّ لَا إِلَٰهَ إِلَّا هُوَ فَادْعُوهُ مُخْلِصِينَ لَهُ الدِّينَ",
    english: "“He is the Ever-Living; there is no deity except Him, so call upon Him, [being] sincere to Him in religion.”",
  },
  {
    id: 104,
    reference: "Fussilat · 41:30",
    arabic: "أَلَّا تَخَافُوا وَلَا تَحْزَنُوا وَأَبْشِرُوا بِالْجَنَّةِ",
    english: "“Do not fear and do not grieve but receive good tidings of Paradise.”",
  },
  {
    id: 105,
    reference: "Fussilat · 41:34",
    arabic: "ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ",
    english: "“Repel [evil] by that [deed] which is better.”",
  },
  {
    id: 106,
    reference: "Al-Ahqaf · 46:15",
    arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ",
    english: "“My Lord, enable me to be grateful for Your favor which You have bestowed upon me.”",
  },
  {
    id: 107,
    reference: "Al-Fath · 48:4",
    arabic: "هُوَ الَّذِي أَنزَلَ السَّكِينَةَ فِي قُلُوبِ الْمُؤْمِنِينَ",
    english: "“It is He who sent down tranquillity into the hearts of the believers.”",
  },
  {
    id: 108,
    reference: "Al-Hujurat · 49:10",
    arabic: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ",
    english: "“The believers are but brothers, so make settlement between your brothers.”",
  },
  {
    id: 109,
    reference: "Qaf · 50:18",
    arabic: "مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ",
    english: "“Man does not utter any word except that with him is an observer prepared [to record].”",
  },
  {
    id: 110,
    reference: "Adh-Dhariyat · 51:50",
    arabic: "فَفِرُّوا إِلَى اللَّهِ ۖ إِنِّي لَكُم مِّنْهُ نَذِيرٌ مُّبِينٌ",
    english: "“So flee to Allah. Indeed, I am to you from Him a clear warner.”",
  },
  {
    id: 111,
    reference: "Adh-Dhariyat · 51:58",
    arabic: "إِنَّ اللَّهَ هُوَ الرَّزَّاقُ ذُو الْقُوَّةِ الْمَتِينُ",
    english: "“Indeed, it is Allah who is the [continual] Provider, the firm possessor of strength.”",
  },
  {
    id: 112,
    reference: "An-Najm · 53:43",
    arabic: "وَأَنَّهُ هُوَ أَضْحَكَ وَأَبْكَىٰ",
    english: "“And that it is He who makes [one] laugh and weep.”",
  },
  {
    id: 113,
    reference: "Ar-Rahman · 55:26",
    arabic: "كُلُّ مَنْ عَلَيْهَا فَانٍ",
    english: "“Everyone upon the earth will perish.”",
  },
  {
    id: 114,
    reference: "Ar-Rahman · 55:27",
    arabic: "وَيَبْقَىٰ وَجْهُ رَبِّكَ ذُو الْجَلَالِ وَالْإِكْرَامِ",
    english: "“And there will remain the Face of your Lord, Owner of Majesty and Honor.”",
  },
  {
    id: 115,
    reference: "Al-Hadid · 57:3",
    arabic: "هُوَ الْأَوَّلُ وَالْآخِرُ وَالظَّاهِرُ وَالْبَاطِنُ",
    english: "“He is the First and the Last, the Ascendant and the Intimate.”",
  },
  {
    id: 116,
    reference: "Al-Hadid · 57:4",
    arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ ۚ وَاللَّهُ بِمَا تَعْمَلُونَ بَصِيرٌ",
    english: "“And He is with you wherever you are. And Allah, of what you do, is Seeing.”",
  },
  {
    id: 117,
    reference: "Al-Mujadila · 58:7",
    arabic: "مَا يَكُونُ مِن نَّجْوَىٰ ثَلَاثَةٍ إِلَّا هُوَ رَابِعُهُمْ",
    english: "“There is in no private conversation three but that He is the fourth of them.”",
  },
  {
    id: 118,
    reference: "Al-Hashr · 59:18",
    arabic: "وَلْتَنظُرْ نَفْسٌ مَّا قَدَّمَتْ لِغَدٍ",
    english: "“...And let every soul look to what it has put forth for tomorrow.”",
  },
  {
    id: 119,
    reference: "At-Taghabun · 64:11",
    arabic: "مَا أَصَابَ مِن مُّصِيبَةٍ إِلَّا بِإِذْنِ اللَّهِ",
    english: "“No disaster strikes except by permission of Allah.”",
  },
  {
    id: 120,
    reference: "At-Talaq · 65:4",
    arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مِنْ أَمْرِهِ يُسْرًا",
    english: "“And whoever fears Allah - He will make for him of his matter ease.”",
  },
  {
    id: 121,
    reference: "Al-Mulk · 67:2",
    arabic: "الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا",
    english: "“[He] who created death and life to test you [as to] which of you is best in deed.”",
  },
  {
    id: 122,
    reference: "Nuh · 71:10",
    arabic: "فَقُلْتُ اسْتَغْفِرُوا رَبَّكُمْ إِنَّهُ كَانَ غَفَّارًا",
    english: "“And said, 'Ask forgiveness of your Lord. Indeed, He is ever a Perpetual Forgiver.'”",
  },
  {
    id: 123,
    reference: "Al-Insan · 76:24",
    arabic: "فَاصْبِرْ لِحُكْمِ رَبِّكَ",
    english: "“So be patient for the decision of your Lord.”",
  }
];

// ==========================================
// DATA: FAQs
// ==========================================
const faqs = [
  {
    question: "Is Tawfiq completely free to use?",
    answer:
      "Yes. Tawfiq is 100% free forever. There are no paywalls, no premium subscriptions, and absolutely no advertisements. It was built with sincerity for the Ummah.",
  },
  {
    question: "How does the Qaza calculator estimate my missed prayers?",
    answer:
      "The calculator uses your current age, your estimated age of puberty, and your past prayer habits to create a mathematical baseline. It offers different scholarly calculation modes (Conservative to Maximum) so you can choose the approach you are most comfortable with.",
  },
  {
    question: "Can I track my regular daily prayers (Fard) along with my Qaza?",
    answer:
      "Yes! While Tawfiq specializes in helping you recover missed prayers, it is ultimately designed to help you build lasting consistency. You can track your daily obligatory (Fard) prayers right alongside your Qaza makeup sessions.",
  },
  {
    question: "What happens if I fall behind on my daily Qaza goal?",
    answer:
      "Nothing happens! Tawfiq does not use guilt-based streaks or penalize you for missing a day. If you fall behind, your completion horizon simply adjusts. You can always catch up the next day without feeling pressured or discouraged.",
  },
  {
    question: "I feel overwhelmed by my total Qaza number. What should I do?",
    answer:
      "It is completely normal to feel overwhelmed, but remember that your sincere intention (Niyyah) to make them up is what matters most to Allah. We recommend setting a very small, manageable daily pace—even just one Qaza prayer a day. Focus on the daily habit, not the total number.",
  },
];
  
// ==========================================
// COMPONENT: FAQ SECTION
// ==========================================
function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#F0FDF4] py-24 px-4 sm:px-6 lg:px-8 font-['Geist',sans-serif]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        <div className="lg:col-span-4">
          <div className="relative inline-block">
            <h2 className="font-['Newsreader',serif] font-light text-6xl md:text-7xl text-green-950 tracking-tight">
              FAQ
            </h2>
            <div className="absolute -bottom-2 left-0 w-full h-1.5 bg-green-950 rounded-full" />
          </div>
        </div>

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
// COMPONENT: BREATHING VERSES SECTION (MARQUEE)
// ==========================================
function BreathingVersesSection() {
  // Duplicate verses to create a seamless infinite loop
  const duplicatedVerses = [...verses, ...verses];

  return (
    <section className="relative bg-[#F0FDF4] py-20 overflow-hidden flex items-center">
      {/* Injecting CSS for the marquee */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .marquee-content {
            display: flex;
            width: max-content;
            /* SLOWED DOWN: 900s for a very relaxed reading pace */
            animation: marquee 900s linear infinite;
          }
          .marquee-content:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="marquee-content cursor-pointer">
        {duplicatedVerses.map((verse, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center text-center px-12 md:px-24 w-[90vw] md:w-[800px]"
          >
            {/* Eyebrow Label */}
            <p className="text-[11px] font-['Geist',sans-serif] tracking-[0.25em] uppercase text-green-600 mb-8 md:mb-12 font-semibold">
              {verse.reference}
            </p>

            {/* Arabic Text */}
            <p
              className="font-arabic text-[clamp(2rem,4vw,3.5rem)] leading-[1.9] text-green-950"
              dir="rtl"
            >
              {verse.arabic}
            </p>

            {/* English Translation */}
            <p className="font-['Newsreader',serif] text-lg md:text-xl italic font-light text-green-700 leading-relaxed mt-4 md:mt-6">
              {verse.english}
            </p>
          </div>
        ))}
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