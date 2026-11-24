/**
 * Wedding Website Configuration
 * Abdul Razique Chauhan & Alisha Naz Wedding Celebration
 * 17 Rajab 1448 Hijri · 27 & 29 December 2026
 */
window.WEDDING_CONFIG = {
  // Couple Information
  groom: {
    name: "Abdul Razique Chauhan",
    hindiName: "अब्दुल राजिक चौहान",
    title: "Groom",
    parents: "Mohd. Bilal Chauhan",
    grandparents: "Marhoom Haji Bafati Chauhan",
    greatGrandparents: "Marhoom Khudabaksh Chauhan (Sikar wale)",
    residence: "Fatima Nagar, Malkapur (Dist. Buldhana)"
  },
  bride: {
    name: "Alisha Naz",
    hindiName: "अलीशा नाज़",
    title: "Bride",
    parents: "Ashfaq Ji Banthia",
    grandparents: "Marhoom Ismail Ji Banthia",
    greatGrandparents: "Marhoom Saheba Ji Banthia (Raipuriya)",
    residence: "Timarni (Dist. Harda, M.P.)"
  },

  // Islamic Blessings & Taglines
  bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  bismillahMeaning: "In the name of Allah, the Most Gracious, the Most Merciful",
  quranVerse: "“And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them, and He has put love and mercy between your hearts.”",
  quranSurah: "Surah Ar-Rum · 30:21",
  invitationNote: "Cordially request the honour of your gracious presence and heartfelt du'as at the auspicious Nikah & Walima ceremony of their beloved children.",
  familyHeader: "Together with their respected families",

  // Main Wedding Date (Used for the live countdown timer)
  // Nikah: Sunday, 27 December 2026 (Baad Namaz-e-Maghrib ~ 6:00 PM)
  weddingDate: "2026-12-27T18:00:00+05:30",
  dateDisplay: {
    dayOfWeek: "Sunday",
    day: "27",
    month: "December",
    year: "2026",
    hijri: "17 Rajab 1448 Hijri",
    time: "Nikah Baad Namaz-e-Maghrib",
    venue: "Timarni (Dist. Harda, M.P.)"
  },

  // Patrons / Sarparast
  patrons: [
    "Janab Alauddin Chauhan",
    "Janab Jamaldin Chauhan",
    "Haji Imamuddin Chauhan (Sikar / Malkapur)"
  ],

  // Wedding Events (Events Carousel)
  events: [
    {
      id: "barat",
      title: "Rawaangi-e-Barat",
      hindiTitle: "रवानगी-ए-बरात",
      when: "Sunday · 27 Dec 2026 · 8:00 AM",
      venue: "From Haji Wafati's Residence, Fatima Nagar, Malkapur to Timarni",
      badge: "Ceremony I",
      icon: "barat"
    },
    {
      id: "nikah",
      title: "Mubarak Nikah",
      hindiTitle: "मुबारक निकाह",
      when: "Sunday · 27 Dec 2026 · Baad Namaz-e-Maghrib",
      venue: "Timarni, Dist. Harda (Madhya Pradesh)",
      badge: "Sacred Union",
      icon: "nikah"
    },
    {
      id: "walima",
      title: "Dawat-e-Walima",
      hindiTitle: "दावत-ए-वलीमा",
      when: "Tuesday · 29 Dec 2026 · Baad Namaz-e-Maghrib",
      venue: "Bharat Lawns, Muktainagar Road, Near Dr. VB Kolte College, Malkapur",
      badge: "Royal Banquet",
      icon: "walima"
    }
  ],

  // Dastaan-e-Ishq (Sacred Union Gallery)
  storyMoments: [
    {
      title: "Destined by Grace",
      verse: "“And We created you in pairs”",
      image: "photos/story_1.jpg"
    },
    {
      title: "Mubarak Nikah",
      verse: "The Sacred Vow • Qubool Hai",
      image: "photos/story_2.jpg"
    },
    {
      title: "Royal Elegance",
      verse: "Stepping into a blessed tomorrow",
      image: "photos/story_3.jpg"
    },
    {
      title: "Bound by Devotion",
      verse: "Two souls, one heartfelt prayer",
      image: "photos/story_4.jpg"
    },
    {
      title: "Celebration of Joy",
      verse: "A lifetime of laughter, faith & love",
      image: "photos/story_5.jpg"
    }
  ],

  // Reception / Dawat-e-Walima Details
  reception: {
    title: "Dawat-e-Walima",
    date: "Tuesday, 29 December 2026 · Baad Namaz-e-Maghrib",
    program: "Royal Banquet & Blessings (Dua-e-Khair)",
    venue: "Bharat Lawns, Muktainagar Road, Near Dr. VB Kolte College, Malkapur"
  },

  // Venue & Google Maps (Muktainagar Road, near Dr. VB Kolte College)
  venue: {
    name: "Bharat Lawns",
    address: "Muktainagar Road, Near Dr. VB Kolte College, Malkapur, District Buldhana, Maharashtra 443101",
    city: "Malkapur",
    mapsSearchUrl: "https://maps.app.goo.gl/iVPfdUnSr9m5kzcw7",
    directionsUrl: "https://maps.app.goo.gl/iVPfdUnSr9m5kzcw7"
  },

  // Key Hosts & Muntazimeen (Adadyan)
  hosts: [
    { name: "Mohd. Hasan Chauhan", phone: "+917972332327", tel: "+917972332327" },
    { name: "Haji Mohd. Wazir Chauhan", phone: "+919422543131", tel: "+919422543131" },
    { name: "Mohd. Bilal Chauhan", phone: "+919860883334", tel: "+919860883334" }
  ],

  familyHosts: [
    "Mohd. Sufiyan Hasan",
    "Mohd. Shoaib Wazir",
    "Mohd. Usman Hasan",
    "Mohd. Aaqib Wazir",
    "A. Rahim Bilal",
    "Noor Mohammad Bilal"
  ],

  // Family Commercial Establishments
  firms: [
    { name: "Maseera Foods Private Limited", location: "Malkapur" },
    { name: "Rajasthan Kirana Store", location: "Aathwadi Bazar, Malkapur" },
    { name: "Rajasthan Dry Fruit", location: "Aathwadi Bazar, Malkapur" },
    { name: "Guddu Kirana Store", location: "Sabzi Mandi, Malkapur" }
  ],

  // Music & Audio Soundtrack
  music: {
    title: "Afreen Afreen (Acoustic Sufi Wedding Instrumental)",
    fileUrl: "audio/background_music.mp3",
    volume: 0.70,
    loop: true
  },

  // Special Kids' Love & Blessings
  kidsNotes: {
    chacha: {
      title: "Mere Chacha Ki Shaadi Mein Zaroor Aana",
      kids: "Abdulrehman, Mahin, Ibrahim, Anabiya, Zara, Babar, Orahan, Myra"
    },
    mama: {
      title: "Mere Mama Ki Shaadi Mein Zaroor Aana",
      kids: "Sara, Ashfiya, Abdulrehman, Aleena, Humaira, Raza, Hamna, Madina, Amra, Rozen, Mehwish, Abdulahad"
    }
  }
};
