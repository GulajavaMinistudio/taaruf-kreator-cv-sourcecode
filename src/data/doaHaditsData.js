/**
 * @file doaHaditsData.js
 * @description Static content for Islamic prayers and hadiths about marriage
 * @version 1.0
 * @date 2025-12-08
 * @source Product_Requirement_Document.md - Lampiran B Section 8
 */

/**
 * @typedef {Object} DoaHaditsItem
 * @property {string} id - Unique identifier (DJ-01, DK-01, DW-01, HK-01, HP-01)
 * @property {string} category - Category key
 * @property {string} title - Title in Indonesian
 * @property {string} arabic - Arabic text
 * @property {string} translation - Indonesian translation
 * @property {string} source - Source reference
 */

/**
 * Complete collection of doa and hadits about marriage
 * @type {Array<DoaHaditsItem>}
 */
export const doaHaditsData = [
  // Category 1: Doa Mencari Jodoh (3 items)
  {
    id: "DJ-01",
    category: "doa-jodoh",
    title: "Doa Nabi Musa AS Mencari Jodoh",
    arabic: "رَبِّ إِنِّي لِمَا أَنْزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ",
    translation:
      "Ya Tuhanku, sesungguhnya aku sangat memerlukan kebaikan apapun yang Engkau turunkan kepadaku.",
    source: "QS. Al-Qashash: 24",
  },
  {
    id: "DJ-02",
    category: "doa-jodoh",
    title: "Doa Memohon Pasangan Shalih",
    arabic:
      "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
    translation:
      "Ya Tuhan kami, anugerahkanlah kepada kami pasangan dan keturunan yang menjadi penyejuk mata kami, dan jadikanlah kami pemimpin bagi orang-orang yang bertakwa.",
    source: "QS. Al-Furqan: 74",
  },
  {
    id: "DJ-03",
    category: "doa-jodoh",
    title: "Doa Istikharah",
    arabic:
      "اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ...",
    translation:
      "Ya Allah, aku memohon pilihan yang terbaik kepada-Mu dengan ilmu-Mu, aku memohon kekuatan dengan kekuasaan-Mu, dan aku memohon karunia-Mu yang agung...",
    source: "HR. Bukhari no. 1162",
  },

  // Category 2: Doa Saat Khitbah (1 item)
  {
    id: "DK-01",
    category: "doa-khitbah",
    title: "Doa Ketika Melihat Calon Pasangan",
    arabic:
      "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا جَبَلْتَهَا عَلَيْهِ وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا جَبَلْتَهَا عَلَيْهِ",
    translation:
      "Ya Allah, aku memohon kepada-Mu kebaikannya dan kebaikan yang Engkau ciptakan dalam dirinya, dan aku berlindung kepada-Mu dari keburukannya dan keburukan yang Engkau ciptakan dalam dirinya.",
    source: "HR. Abu Dawud no. 2160",
  },

  // Category 3: Doa Malam Pertama & Walimah (3 items)
  {
    id: "DW-01",
    category: "doa-walimah",
    title: "Doa Pengantin untuk Pasangan",
    arabic:
      "بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
    translation:
      "Semoga Allah memberkahimu dan memberkahi atasmu, serta mengumpulkan kalian berdua dalam kebaikan.",
    source: "HR. Abu Dawud no. 2130",
  },
  {
    id: "DW-02",
    category: "doa-walimah",
    title: "Doa Malam Pertama",
    arabic:
      "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا جَبَلْتَهَا عَلَيْهِ وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا جَبَلْتَهَا عَلَيْهِ",
    translation:
      "Ya Allah, aku memohon kepada-Mu kebaikannya dan kebaikan yang Engkau ciptakan padanya, dan aku berlindung kepada-Mu dari keburukannya dan keburukan yang Engkau ciptakan padanya.",
    source: "HR. Abu Dawud no. 2160",
  },
  {
    id: "DW-03",
    category: "doa-walimah",
    title: "Doa Sebelum Berhubungan Suami Istri",
    arabic:
      "بِسْمِ اللَّهِ اللَّهُمَّ جَنِّبْنَا الشَّيْطَانَ وَجَنِّبِ الشَّيْطَانَ مَا رَزَقْتَنَا",
    translation:
      "Dengan nama Allah. Ya Allah, jauhkanlah kami dari setan dan jauhkanlah setan dari apa yang Engkau rezekikan kepada kami.",
    source: "HR. Bukhari no. 141",
  },

  // Category 4: Hadits Keutamaan Menikah (3 items)
  {
    id: "HK-01",
    category: "hadits-menikah",
    title: "Menikah Setengah Agama",
    arabic:
      "إِذَا تَزَوَّجَ الْعَبْدُ فَقَدِ اسْتَكْمَلَ نِصْفَ الدِّينِ فَلْيَتَّقِ اللَّهَ فِي النِّصْفِ الْبَاقِي",
    translation:
      "Jika seorang hamba menikah, maka ia telah menyempurnakan setengah agamanya. Maka bertakwalah kepada Allah pada setengah sisanya.",
    source: "HR. Al-Baihaqi dalam Syu'abul Iman no. 5486, Al-Hakim no. 2681",
  },
  {
    id: "HK-02",
    category: "hadits-menikah",
    title: "Anjuran Menikah bagi Pemuda",
    arabic:
      "يَا مَعْشَرَ الشَّبَابِ مَنِ اسْتَطَاعَ مِنْكُمُ الْبَاءَةَ فَلْيَتَزَوَّجْ فَإِنَّهُ أَغَضُّ لِلْبَصَرِ وَأَحْصَنُ لِلْفَرْجِ",
    translation:
      "Wahai para pemuda, barangsiapa di antara kalian yang mampu menikah, maka menikahlah. Karena menikah lebih menundukkan pandangan dan lebih menjaga kemaluan.",
    source: "HR. Bukhari no. 5066",
  },
  {
    id: "HK-03",
    category: "hadits-menikah",
    title: "Menikah adalah Sunnahku",
    arabic:
      "النِّكَاحُ مِنْ سُنَّتِي فَمَنْ لَمْ يَعْمَلْ بِسُنَّتِي فَلَيْسَ مِنِّي",
    translation:
      "Menikah adalah sunnahku. Barangsiapa yang tidak mengamalkan sunnahku, maka ia bukan dari golonganku.",
    source: "HR. Ibnu Majah no. 1846",
  },

  // Category 5: Hadits Kriteria Memilih Pasangan (3 items)
  {
    id: "HP-01",
    category: "hadits-pasangan",
    title: "Empat Kriteria Memilih Wanita",
    arabic:
      "تُنْكَحُ الْمَرْأَةُ لِأَرْبَعٍ لِمَالِهَا وَلِحَسَبِهَا وَجَمَالِهَا وَلِدِينِهَا فَاظْفَرْ بِذَاتِ الدِّينِ تَرِبَتْ يَدَاكَ",
    translation:
      "Wanita dinikahi karena empat hal: hartanya, keturunannya, kecantikannya, dan agamanya. Pilihlah yang beragama, niscaya kamu beruntung.",
    source: "HR. Bukhari no. 5090",
  },
  {
    id: "HP-02",
    category: "hadits-pasangan",
    title: "Kriteria Memilih Pria",
    arabic:
      "إِذَا خَطَبَ إِلَيْكُمْ مَنْ تَرْضَوْنَ دِينَهُ وَخُلُقَهُ فَزَوِّجُوهُ إِلَّا تَفْعَلُوا تَكُنْ فِتْنَةٌ فِي الْأَرْضِ وَفَسَادٌ عَرِيضٌ",
    translation:
      "Jika datang kepada kalian seorang lelaki yang agama dan akhlaknya kalian ridhai, maka nikahkanlah. Jika tidak, akan terjadi fitnah di muka bumi dan kerusakan yang besar.",
    source: "HR. Tirmidzi no. 1084",
  },
  {
    id: "HP-03",
    category: "hadits-pasangan",
    title: "Wanita Shalihah Sebaik-baik Perhiasan",
    arabic:
      "الدُّنْيَا مَتَاعٌ وَخَيْرُ مَتَاعِ الدُّنْيَا الْمَرْأَةُ الصَّالِحَةُ",
    translation:
      "Dunia adalah perhiasan, dan sebaik-baik perhiasan dunia adalah wanita yang shalihah.",
    source: "HR. Muslim no. 1467",
  },
];

/**
 * Get doa/hadits items by category
 * @param {string} category - Category key
 * @returns {Array<DoaHaditsItem>} Filtered items
 */
export function getByCategory(category) {
  return doaHaditsData.filter((item) => item.category === category);
}

/**
 * Get doa/hadits item by ID
 * @param {string} id - Item ID
 * @returns {DoaHaditsItem|null} Found item or null
 */
export function getById(id) {
  return doaHaditsData.find((item) => item.id === id) || null;
}

/**
 * Get all categories with counts
 * @returns {Object} Category statistics
 */
export function getCategoryStats() {
  return {
    "doa-jodoh": getByCategory("doa-jodoh").length,
    "doa-khitbah": getByCategory("doa-khitbah").length,
    "doa-walimah": getByCategory("doa-walimah").length,
    "hadits-menikah": getByCategory("hadits-menikah").length,
    "hadits-pasangan": getByCategory("hadits-pasangan").length,
  };
}

/**
 * Category metadata
 */
export const categoryMetadata = {
  "doa-jodoh": {
    name: "Doa Mencari Jodoh",
    description:
      "Doa-doa yang dapat diamalkan sebelum menikah untuk memohon jodoh yang baik",
  },
  "doa-khitbah": {
    name: "Doa Saat Khitbah",
    description: "Doa yang dibaca saat proses khitbah atau meminang",
  },
  "doa-walimah": {
    name: "Doa Malam Pertama & Walimah",
    description:
      "Doa-doa yang dibaca saat walimah dan malam pertama pernikahan",
  },
  "hadits-menikah": {
    name: "Hadits Keutamaan Menikah",
    description:
      "Hadits-hadits tentang keutamaan dan anjuran menikah dalam Islam",
  },
  "hadits-pasangan": {
    name: "Hadits Kriteria Pasangan",
    description: "Hadits-hadits tentang kriteria memilih pasangan hidup",
  },
};
