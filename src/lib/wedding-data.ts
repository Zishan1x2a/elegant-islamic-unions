// ============================================
// Mock wedding data — replace via backend later
// Backend endpoint (future): GET /api/wedding/:id
// ============================================

import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

export const wedding = {
  bride: { name: "Aisha", arabic: "عَائِشَة", family: "Rahman" },
  groom: { name: "Ahmad", arabic: "أَحْمَد", family: "Hussain" },
  dateISO: "2026-11-14T18:00:00+04:00",
  dateLabel: "14 November 2026",
  venue: "Al-Bayt Royal Hall, Dubai",
  hashtag: "#AhmadFindsHisAisha",
};

export const timeline = [
  {
    id: 1,
    title: "First Meeting",
    arabic: "اللِّقَاء الأَوَّل",
    date: "Spring 2023",
    blurb:
      "A quiet evening at a community iftaar — a conversation that lingered long after the call to maghrib.",
  },
  {
    id: 2,
    title: "The Proposal",
    arabic: "الخُطْبَة",
    date: "Ramadan 2024",
    blurb:
      "Under the soft light of the masjid lanterns, intentions were spoken with sincerity.",
  },
  {
    id: 3,
    title: "Families Meet",
    arabic: "لِقَاء العَائِلَتَين",
    date: "Summer 2024",
    blurb:
      "Two families, one prayer — the beginning of a barakah-filled union.",
  },
  {
    id: 4,
    title: "Engagement",
    arabic: "المَنْكُوحَة",
    date: "Winter 2024",
    blurb:
      "Rings exchanged amongst loved ones, hearts united in promise.",
  },
  {
    id: 5,
    title: "Nikah Journey",
    arabic: "رِحْلَة النِّكَاح",
    date: "November 2026",
    blurb: "And of His signs is that He created for you mates… (Qur'an 30:21)",
  },
];

export type Ceremony = {
  id: string;
  name: string;
  arabic: string;
  icon: "moon" | "henna" | "feast" | "rings";
  date: string;
  time: string;
  venue: string;
  address: string;
  dressCode: string;
  mapsUrl: string;
  accent: "gold" | "emerald" | "rose" | "oud";
};

export const ceremonies: Ceremony[] = [
  {
    id: "mehndi",
    name: "Mehndi",
    arabic: "الحِنَّاء",
    icon: "henna",
    date: "Thursday, 12 November 2026",
    time: "7:00 PM onwards",
    venue: "The Rahman Residence Garden",
    address: "Al Wasl, Dubai",
    dressCode: "Vibrant traditional",
    mapsUrl: "https://maps.google.com/?q=Al+Wasl+Dubai",
    accent: "rose",
  },
  {
    id: "sangeet",
    name: "Sangeet",
    arabic: "السَّنْجِيت",
    icon: "moon",
    date: "Thursday, 12 November 2026",
    time: "9:30 PM onwards",
    venue: "The Rahman Residence Lawn",
    address: "Al Wasl, Dubai",
    dressCode: "Festive Indo-western · Jewel tones",
    mapsUrl: "https://maps.google.com/?q=Al+Wasl+Dubai",
    accent: "oud",
  },
  {
    id: "nikah",
    name: "Nikah",
    arabic: "النِّكَاح",
    icon: "rings",
    date: "Friday, 13 November 2026",
    time: "After Asr · 4:30 PM",
    venue: "Grand Jumeirah Masjid",
    address: "Jumeirah Beach Rd, Dubai",
    dressCode: "Modest formal · Ivory & Gold",
    mapsUrl: "https://maps.google.com/?q=Jumeirah+Mosque+Dubai",
    accent: "gold",
  },
  {
    id: "walima",
    name: "Walima",
    arabic: "الوَلِيمَة",
    icon: "feast",
    date: "Saturday, 14 November 2026",
    time: "6:00 PM",
    venue: "Al-Bayt Royal Hall",
    address: "Downtown Dubai",
    dressCode: "Formal · Emerald & Cream",
    mapsUrl: "https://maps.google.com/?q=Downtown+Dubai",
    accent: "emerald",
  },
  {
    id: "reception",
    name: "Reception",
    arabic: "الاِسْتِقْبَال",
    icon: "moon",
    date: "Sunday, 15 November 2026",
    time: "8:00 PM",
    venue: "Burj Garden Pavilion",
    address: "Burj Khalifa Blvd, Dubai",
    dressCode: "Black tie · Modest",
    mapsUrl: "https://maps.google.com/?q=Burj+Khalifa+Dubai",
    accent: "oud",
  },
];

export const families = [
  {
    side: "Groom's Family",
    arabic: "عَائِلَة العَرِيس",
    members: [
      { name: "Imran Hussain", role: "Father of the Groom", initials: "IH" },
      { name: "Fatima Hussain", role: "Mother of the Groom", initials: "FH" },
      { name: "Yusuf Hussain", role: "Brother", initials: "YH" },
      { name: "Maryam Hussain", role: "Sister", initials: "MH" },
    ],
  },
  {
    side: "Bride's Family",
    arabic: "عَائِلَة العَرُوس",
    members: [
      { name: "Khalid Rahman", role: "Father of the Bride", initials: "KR" },
      { name: "Zainab Rahman", role: "Mother of the Bride", initials: "ZR" },
      { name: "Hassan Rahman", role: "Brother", initials: "HR" },
      { name: "Sumaya Rahman", role: "Sister", initials: "SR" },
    ],
  },
];

export const galleryImages = [
  { src: gallery1, alt: "Couple in traditional ivory & gold attire", w: 1024, h: 1280 },
  { src: gallery2, alt: "Bridal mehndi henna detail", w: 1024, h: 1280 },
  { src: gallery3, alt: "Wedding decor with emerald and gold", w: 1280, h: 1024 },
  { src: gallery1, alt: "Soft candlelit portrait", w: 1024, h: 1280 },
  { src: gallery2, alt: "Hands and rose petals", w: 1024, h: 1280 },
  { src: gallery3, alt: "Lanterns and roses", w: 1280, h: 1024 },
];

export const initialDuas = [
  {
    name: "Bilal Yusuf",
    message:
      "May Allah bless your union with sakeenah, mawaddah, and rahmah. Ameen.",
  },
  {
    name: "Hafsa Imran",
    message:
      "Barakallahu lakuma wa baraka 'alaikuma wa jama'a baynakuma fee khair.",
  },
  {
    name: "Omar Siddiq",
    message:
      "Two hearts, one Deen. May your home be a garden of Jannah on earth.",
  },
  {
    name: "Layla Khan",
    message: "Wishing you a lifetime of patience, laughter, and Qur'an-filled mornings.",
  },
];
