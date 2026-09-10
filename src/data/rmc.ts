/**
 * Mock data layer for the Royal Medical Center digital front door demo.
 * All names, availability and figures are fictional demo data.
 * Swap these exports for real API calls without touching UI components.
 */

export type BranchId = "lusail" | "gharrafa";

export interface Branch {
  id: BranchId;
  name: string;
  nameAr: string;
  phone: string;
  address: string;
  directions: string;
}

export interface Specialty {
  id: string;
  name: string;
  nameAr: string;
  blurb: string;
  category: "Clinical Services" | "Diagnostics" | "Specialized Procedures";
  icon: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialtyId: string;
  branch: BranchId;
  gender: "male" | "female";
  languages: string[];
  experience: number;
  expertise: string[];
  about: string;
  credentials: string[];
  services: string[];
  consultation: string[];
  insurance: string[];
  nextAvailable: string;
  availability: "This week" | "Next week" | "Today";
  slots: string[];
}

export interface ServiceItem {
  id: string;
  name: string;
  category: "Clinical Services" | "Diagnostics" | "Laboratory" | "Pharmacy" | "Specialized Procedures";
  description: string;
  specialtyId?: string;
  icon: string;
}

export const BRANCHES: Branch[] = [
  {
    id: "lusail",
    name: "Lusail",
    nameAr: "لوسيل",
    phone: "+974 44502050",
    address: "Fox Hills, Lusail, Doha, Qatar",
    directions: "https://maps.google.com/?q=Royal+Medical+Center+Lusail+Doha",
  },
  {
    id: "gharrafa",
    name: "Al Gharrafa",
    nameAr: "الغرافة",
    phone: "+974 44602060",
    address: "Al Gharrafa, Doha, Qatar",
    directions: "https://maps.google.com/?q=Royal+Medical+Center+Al+Gharrafa+Doha",
  },
];

export const SPECIALTIES: Specialty[] = [
  {
    id: "dentistry",
    name: "Dentistry",
    nameAr: "طب الأسنان",
    blurb: "Preventive, restorative and cosmetic dental care for adults and children.",
    category: "Clinical Services",
    icon: "Smile",
  },
  {
    id: "dermatology",
    name: "Dermatology",
    nameAr: "الجلدية",
    blurb: "Skin, hair and nail conditions, plus medical aesthetics and laser care.",
    category: "Clinical Services",
    icon: "Sparkles",
  },
  {
    id: "general-surgery",
    name: "General Surgery",
    nameAr: "الجراحة العامة",
    blurb: "Consultation and surgical management of abdominal and soft tissue conditions.",
    category: "Specialized Procedures",
    icon: "Stethoscope",
  },
  {
    id: "hair-transplant",
    name: "Hair Transplant",
    nameAr: "زراعة الشعر",
    blurb: "Assessment of hair loss and advanced restoration procedures.",
    category: "Specialized Procedures",
    icon: "Scissors",
  },
  {
    id: "internal-pulmonary",
    name: "Internal & Pulmonary Medicine",
    nameAr: "الباطنية والصدرية",
    blurb: "Chronic disease, respiratory and general adult medical care.",
    category: "Clinical Services",
    icon: "Activity",
  },
  {
    id: "obgyn",
    name: "Obstetrics & Gynecology",
    nameAr: "النساء والتوليد",
    blurb: "Pregnancy care, women's health and gynecological procedures.",
    category: "Clinical Services",
    icon: "Baby",
  },
  {
    id: "ophthalmology",
    name: "Ophthalmology",
    nameAr: "طب العيون",
    blurb: "Vision assessment, eye conditions and surgical eye care.",
    category: "Clinical Services",
    icon: "Eye",
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    nameAr: "طب الأطفال",
    blurb: "Newborn, child and adolescent health, vaccinations and growth care.",
    category: "Clinical Services",
    icon: "Baby",
  },
  {
    id: "plastic-surgery",
    name: "Plastic Surgery",
    nameAr: "الجراحة التجميلية",
    blurb: "Reconstructive and aesthetic surgical care with consultative planning.",
    category: "Specialized Procedures",
    icon: "Gem",
  },
  {
    id: "urology",
    name: "Urology",
    nameAr: "المسالك البولية",
    blurb: "Kidney, bladder and men's health conditions and procedures.",
    category: "Clinical Services",
    icon: "Droplets",
  },
  {
    id: "vascular-surgery",
    name: "Vascular Surgery",
    nameAr: "جراحة الأوعية الدموية",
    blurb: "Veins, arteries and circulation assessment and treatment.",
    category: "Specialized Procedures",
    icon: "HeartPulse",
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    nameAr: "جراحة العظام",
    blurb: "Bone, joint and sports injury assessment and treatment.",
    category: "Clinical Services",
    icon: "Bone",
  },
  {
    id: "cardiology",
    name: "Cardiology",
    nameAr: "أمراض القلب",
    blurb: "Heart health assessment, diagnostics and ongoing cardiac care.",
    category: "Clinical Services",
    icon: "Heart",
  },
];

const SLOTS_A = ["09:00", "09:30", "10:30", "11:00", "12:00", "16:00", "17:30"];
const SLOTS_B = ["08:30", "10:00", "11:30", "13:00", "17:00", "18:30"];
const SLOTS_C = ["09:15", "10:45", "12:15", "15:30", "16:45", "19:00"];

export const DOCTORS: Doctor[] = [
  {
    id: "ahmed-hassan",
    name: "Dr. Ahmed Hassan",
    title: "Consultant Orthopedic Surgeon",
    specialtyId: "orthopedics",
    branch: "lusail",
    gender: "male",
    languages: ["Arabic", "English"],
    experience: 18,
    expertise: ["Knee & hip conditions", "Sports injuries", "Arthroscopic surgery"],
    about:
      "Dr. Ahmed Hassan focuses on joint preservation and minimally invasive orthopedic care, with a particular interest in knee conditions and sports-related injuries.",
    credentials: ["MBBCh", "Arab Board of Orthopedic Surgery", "Fellowship in Sports Medicine"],
    services: ["Joint assessment", "Arthroscopy", "Fracture care", "Post-operative rehabilitation planning"],
    consultation: ["In-person consultation", "Follow-up review"],
    insurance: ["QLM", "AXA", "Allianz Care"],
    nextAvailable: "Tomorrow, 10:30",
    availability: "This week",
    slots: SLOTS_A,
  },
  {
    id: "layla-mansour",
    name: "Dr. Layla Mansour",
    title: "Specialist Dermatologist",
    specialtyId: "dermatology",
    branch: "lusail",
    gender: "female",
    languages: ["Arabic", "English", "French"],
    experience: 12,
    expertise: ["Acne & rosacea", "Eczema", "Medical aesthetics"],
    about:
      "Dr. Layla Mansour treats a wide range of skin conditions with an emphasis on long-term skin health and evidence-based aesthetic care.",
    credentials: ["MD", "European Board of Dermatology"],
    services: ["Skin assessment", "Laser treatments", "Dermoscopy", "Allergy patch testing"],
    consultation: ["In-person consultation", "Teleconsultation"],
    insurance: ["QLM", "MetLife"],
    nextAvailable: "Today, 17:30",
    availability: "Today",
    slots: SLOTS_B,
  },
  {
    id: "noor-alkuwari",
    name: "Dr. Noor Al Kuwari",
    title: "Consultant Pediatrician",
    specialtyId: "pediatrics",
    branch: "gharrafa",
    gender: "female",
    languages: ["Arabic", "English"],
    experience: 15,
    expertise: ["Childhood fever & infections", "Growth & development", "Vaccinations"],
    about:
      "Dr. Noor Al Kuwari cares for newborns through adolescence, with a calm, family-centred approach to childhood illness and development.",
    credentials: ["MBBS", "Arab Board of Pediatrics", "MRCPCH"],
    services: ["Child health check", "Vaccination", "Growth monitoring", "Newborn review"],
    consultation: ["In-person consultation", "Teleconsultation"],
    insurance: ["QLM", "AXA", "Cigna"],
    nextAvailable: "Today, 18:30",
    availability: "Today",
    slots: SLOTS_B,
  },
  {
    id: "samir-haddad",
    name: "Dr. Samir Haddad",
    title: "Consultant Cardiologist",
    specialtyId: "cardiology",
    branch: "lusail",
    gender: "male",
    languages: ["Arabic", "English"],
    experience: 22,
    expertise: ["Chest pain assessment", "Hypertension", "Echocardiography"],
    about:
      "Dr. Samir Haddad provides comprehensive cardiac assessment and long-term management of heart and blood pressure conditions.",
    credentials: ["MD", "FESC", "Fellowship in Interventional Cardiology"],
    services: ["Cardiac consultation", "ECG", "Echocardiogram", "Stress testing"],
    consultation: ["In-person consultation", "Follow-up review"],
    insurance: ["QLM", "Allianz Care", "MetLife"],
    nextAvailable: "Tomorrow, 09:00",
    availability: "This week",
    slots: SLOTS_A,
  },
  {
    id: "maha-darwish",
    name: "Dr. Maha Darwish",
    title: "Consultant Obstetrician & Gynecologist",
    specialtyId: "obgyn",
    branch: "gharrafa",
    gender: "female",
    languages: ["Arabic", "English"],
    experience: 19,
    expertise: ["Pregnancy care", "Menstrual disorders", "Minimally invasive gynecology"],
    about:
      "Dr. Maha Darwish supports women through pregnancy and gynecological care with a focus on informed, unhurried consultations.",
    credentials: ["MBBS", "MRCOG"],
    services: ["Antenatal care", "Ultrasound", "Well-woman check", "Gynecological procedures"],
    consultation: ["In-person consultation"],
    insurance: ["QLM", "AXA"],
    nextAvailable: "Thursday, 11:30",
    availability: "This week",
    slots: SLOTS_C,
  },
  {
    id: "khaled-nasser",
    name: "Dr. Khaled Nasser",
    title: "Consultant Ophthalmologist",
    specialtyId: "ophthalmology",
    branch: "lusail",
    gender: "male",
    languages: ["Arabic", "English", "Urdu"],
    experience: 16,
    expertise: ["Cataract surgery", "Dry eye", "Retina screening"],
    about:
      "Dr. Khaled Nasser combines detailed vision assessment with surgical expertise in cataract and anterior segment care.",
    credentials: ["MBBS", "FRCS (Ophth)"],
    services: ["Vision assessment", "Cataract surgery", "Retina screening", "Glaucoma monitoring"],
    consultation: ["In-person consultation"],
    insurance: ["QLM", "Cigna"],
    nextAvailable: "Tomorrow, 12:15",
    availability: "This week",
    slots: SLOTS_C,
  },
  {
    id: "yara-fakhoury",
    name: "Dr. Yara Fakhoury",
    title: "Specialist Dermatologist & Hair Restoration",
    specialtyId: "hair-transplant",
    branch: "gharrafa",
    gender: "female",
    languages: ["Arabic", "English"],
    experience: 11,
    expertise: ["Hair loss assessment", "PRP therapy", "Transplant planning"],
    about:
      "Dr. Yara Fakhoury assesses the medical causes of hair loss before recommending restoration options, including surgical planning.",
    credentials: ["MD", "Diploma in Trichology"],
    services: ["Hair loss consultation", "Trichoscopy", "PRP therapy", "Transplant planning"],
    consultation: ["In-person consultation", "Teleconsultation"],
    insurance: ["Self-pay", "QLM"],
    nextAvailable: "Wednesday, 16:45",
    availability: "This week",
    slots: SLOTS_C,
  },
  {
    id: "omar-shaheen",
    name: "Dr. Omar Shaheen",
    title: "Consultant Internal & Pulmonary Medicine",
    specialtyId: "internal-pulmonary",
    branch: "lusail",
    gender: "male",
    languages: ["Arabic", "English"],
    experience: 20,
    expertise: ["Asthma & COPD", "Chronic cough", "Diabetes management"],
    about:
      "Dr. Omar Shaheen manages complex adult medical conditions with a focus on respiratory health and chronic disease control.",
    credentials: ["MD", "MRCP (UK)", "Fellowship in Pulmonology"],
    services: ["Medical consultation", "Pulmonary function testing", "Chronic care planning"],
    consultation: ["In-person consultation", "Teleconsultation"],
    insurance: ["QLM", "AXA", "Allianz Care"],
    nextAvailable: "Today, 16:00",
    availability: "Today",
    slots: SLOTS_A,
  },
  {
    id: "hana-jaber",
    name: "Dr. Hana Jaber",
    title: "Specialist Dentist",
    specialtyId: "dentistry",
    branch: "gharrafa",
    gender: "female",
    languages: ["Arabic", "English"],
    experience: 9,
    expertise: ["Cosmetic dentistry", "Root canal treatment", "Pediatric dentistry"],
    about:
      "Dr. Hana Jaber provides gentle general and cosmetic dental care, with particular experience treating anxious patients.",
    credentials: ["BDS", "MSc Restorative Dentistry"],
    services: ["Dental check-up", "Whitening", "Endodontics", "Veneers"],
    consultation: ["In-person consultation"],
    insurance: ["QLM", "MetLife"],
    nextAvailable: "Tomorrow, 13:00",
    availability: "This week",
    slots: SLOTS_B,
  },
  {
    id: "faisal-almarri",
    name: "Dr. Faisal Al Marri",
    title: "Consultant Urologist",
    specialtyId: "urology",
    branch: "lusail",
    gender: "male",
    languages: ["Arabic", "English"],
    experience: 17,
    expertise: ["Kidney stones", "Prostate health", "Endourology"],
    about:
      "Dr. Faisal Al Marri treats urological conditions with an emphasis on minimally invasive techniques and preventive follow-up.",
    credentials: ["MD", "Arab Board of Urology"],
    services: ["Urology consultation", "Stone management", "Prostate assessment"],
    consultation: ["In-person consultation"],
    insurance: ["QLM", "Cigna"],
    nextAvailable: "Monday, 09:30",
    availability: "Next week",
    slots: SLOTS_A,
  },
  {
    id: "rania-saleh",
    name: "Dr. Rania Saleh",
    title: "Consultant Plastic Surgeon",
    specialtyId: "plastic-surgery",
    branch: "gharrafa",
    gender: "female",
    languages: ["Arabic", "English", "Turkish"],
    experience: 14,
    expertise: ["Reconstructive surgery", "Body contouring", "Scar revision"],
    about:
      "Dr. Rania Saleh offers consultative aesthetic and reconstructive surgery, prioritising realistic outcomes and patient safety.",
    credentials: ["MD", "EBOPRAS"],
    services: ["Surgical consultation", "Reconstruction", "Scar management"],
    consultation: ["In-person consultation", "Teleconsultation"],
    insurance: ["Self-pay"],
    nextAvailable: "Next Tuesday, 15:30",
    availability: "Next week",
    slots: SLOTS_C,
  },
  {
    id: "tarek-baroudi",
    name: "Dr. Tarek Baroudi",
    title: "Consultant Vascular Surgeon",
    specialtyId: "vascular-surgery",
    branch: "lusail",
    gender: "male",
    languages: ["Arabic", "English"],
    experience: 21,
    expertise: ["Varicose veins", "Diabetic foot care", "Arterial disease"],
    about:
      "Dr. Tarek Baroudi manages vascular and circulation conditions, including advanced vein treatment and limb preservation care.",
    credentials: ["MD", "FRCS", "Fellowship in Endovascular Surgery"],
    services: ["Vascular consultation", "Duplex ultrasound", "Vein treatment"],
    consultation: ["In-person consultation"],
    insurance: ["QLM", "AXA"],
    nextAvailable: "Thursday, 10:00",
    availability: "This week",
    slots: SLOTS_B,
  },
  {
    id: "sami-othman",
    name: "Dr. Sami Othman",
    title: "Consultant General Surgeon",
    specialtyId: "general-surgery",
    branch: "gharrafa",
    gender: "male",
    languages: ["Arabic", "English"],
    experience: 23,
    expertise: ["Hernia repair", "Gallbladder surgery", "Laparoscopic surgery"],
    about:
      "Dr. Sami Othman performs a broad range of general and laparoscopic procedures with structured pre- and post-operative care.",
    credentials: ["MD", "Arab Board of General Surgery"],
    services: ["Surgical consultation", "Laparoscopic surgery", "Minor procedures"],
    consultation: ["In-person consultation"],
    insurance: ["QLM", "Allianz Care"],
    nextAvailable: "Tomorrow, 11:00",
    availability: "This week",
    slots: SLOTS_A,
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "specialist-consultation",
    name: "Specialist Consultation",
    category: "Clinical Services",
    description: "Consultations across 13 specialties at both branches, with same-week availability.",
    icon: "Stethoscope",
  },
  {
    id: "womens-health",
    name: "Women's Health & Maternity",
    category: "Clinical Services",
    description: "Pregnancy care, ultrasound and gynecological services in a private setting.",
    specialtyId: "obgyn",
    icon: "Baby",
  },
  {
    id: "child-health",
    name: "Child Health & Vaccination",
    category: "Clinical Services",
    description: "Paediatric consultations, growth monitoring and the full vaccination schedule.",
    specialtyId: "pediatrics",
    icon: "Baby",
  },
  {
    id: "imaging",
    name: "Diagnostic Imaging",
    category: "Diagnostics",
    description: "Ultrasound, digital X-ray and duplex studies reported by on-site specialists.",
    icon: "ScanLine",
  },
  {
    id: "cardiac-diagnostics",
    name: "Cardiac Diagnostics",
    category: "Diagnostics",
    description: "ECG, echocardiography and stress testing with cardiology review.",
    specialtyId: "cardiology",
    icon: "HeartPulse",
  },
  {
    id: "laboratory",
    name: "Laboratory Services",
    category: "Laboratory",
    description: "Full blood, hormone and microbiology panels with digital result delivery.",
    icon: "TestTubes",
  },
  {
    id: "health-screening",
    name: "Health Screening Packages",
    category: "Laboratory",
    description: "Structured annual check-ups for adults, executives and pre-employment needs.",
    icon: "ClipboardCheck",
  },
  {
    id: "pharmacy",
    name: "Pharmacy",
    category: "Pharmacy",
    description: "On-site pharmacy at both branches with prescription fulfilment and counselling.",
    icon: "Pill",
  },
  {
    id: "hair-restoration",
    name: "Hair Restoration",
    category: "Specialized Procedures",
    description: "Medical hair loss assessment, PRP therapy and transplant procedures.",
    specialtyId: "hair-transplant",
    icon: "Scissors",
  },
  {
    id: "aesthetic-surgery",
    name: "Aesthetic & Reconstructive Surgery",
    category: "Specialized Procedures",
    description: "Plastic surgery consultations and procedures with dedicated recovery planning.",
    specialtyId: "plastic-surgery",
    icon: "Gem",
  },
  {
    id: "vein-care",
    name: "Vein & Circulation Care",
    category: "Specialized Procedures",
    description: "Varicose vein treatment, diabetic foot care and arterial assessment.",
    specialtyId: "vascular-surgery",
    icon: "Activity",
  },
  {
    id: "day-surgery",
    name: "Day Surgery",
    category: "Specialized Procedures",
    description: "Laparoscopic and minor procedures with same-day discharge pathways.",
    specialtyId: "general-surgery",
    icon: "Scissors",
  },
];

export const specialtyById = (id: string) => SPECIALTIES.find((s) => s.id === id);
export const doctorById = (id: string) => DOCTORS.find((d) => d.id === id);
export const branchById = (id: BranchId) => BRANCHES.find((b) => b.id === id)!;
export const doctorsBySpecialty = (id: string) => DOCTORS.filter((d) => d.specialtyId === id);

export const NEXT_DATES = (() => {
  const out: { iso: string; label: string; weekday: string; day: string }[] = [];
  const base = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(base.getTime() + i * 86400000);
    out.push({
      iso: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }),
      weekday: d.toLocaleDateString("en-GB", { weekday: "short" }),
      day: String(d.getDate()),
    });
  }
  return out;
})();

/* ---------------------------------------------------------------- Analytics */

export const KPIS = [
  { id: "visitors", label: "Website Visitors", value: "4,826", delta: "+12.4%" },
  { id: "conversations", label: "AI Conversations", value: "642", delta: "+28.1%" },
  { id: "requests", label: "Appointment Requests", value: "318", delta: "+9.6%" },
  { id: "booked", label: "Appointments Booked", value: "247", delta: "+11.2%" },
  { id: "previsit", label: "Pre-Visit Forms", value: "186", delta: "+34.7%" },
  { id: "conversion", label: "Conversion Rate", value: "7.4%", delta: "+1.1 pts" },
];

export const FUNNEL = [
  { stage: "Website Visitors", value: 4826 },
  { stage: "Started Health Navigator", value: 642 },
  { stage: "Received Recommendation", value: 421 },
  { stage: "Viewed Doctor", value: 366 },
  { stage: "Requested Appointment", value: 318 },
  { stage: "Booked Appointment", value: 247 },
];

export const TOP_REQUESTS = [
  { name: "Cardiology", value: 18 },
  { name: "Orthopedics", value: 16 },
  { name: "Dermatology", value: 14 },
  { name: "Pediatrics", value: 12 },
  { name: "Gynecology", value: 10 },
  { name: "Other", value: 30 },
];

export const PATIENT_INTENT = [
  { name: "Find a doctor", value: 42 },
  { name: "Book appointment", value: 27 },
  { name: "Medical guidance", value: 19 },
  { name: "Service information", value: 12 },
];

export const DEPARTMENT_DEMAND: Record<"today" | "7d" | "30d" | "90d", { name: string; requests: number }[]> = {
  today: [
    { name: "Cardiology", requests: 9 },
    { name: "Orthopedics", requests: 8 },
    { name: "Dermatology", requests: 7 },
    { name: "Pediatrics", requests: 6 },
    { name: "Gynecology", requests: 4 },
    { name: "Ophthalmology", requests: 3 },
  ],
  "7d": [
    { name: "Cardiology", requests: 58 },
    { name: "Orthopedics", requests: 51 },
    { name: "Dermatology", requests: 44 },
    { name: "Pediatrics", requests: 38 },
    { name: "Gynecology", requests: 29 },
    { name: "Ophthalmology", requests: 22 },
  ],
  "30d": [
    { name: "Cardiology", requests: 214 },
    { name: "Orthopedics", requests: 191 },
    { name: "Dermatology", requests: 168 },
    { name: "Pediatrics", requests: 142 },
    { name: "Gynecology", requests: 118 },
    { name: "Ophthalmology", requests: 86 },
  ],
  "90d": [
    { name: "Cardiology", requests: 612 },
    { name: "Orthopedics", requests: 548 },
    { name: "Dermatology", requests: 489 },
    { name: "Pediatrics", requests: 402 },
    { name: "Gynecology", requests: 331 },
    { name: "Ophthalmology", requests: 254 },
  ],
};

export const WEEKLY_TREND = [
  { day: "Mon", navigator: 78, requests: 41 },
  { day: "Tue", navigator: 92, requests: 48 },
  { day: "Wed", navigator: 104, requests: 52 },
  { day: "Thu", navigator: 96, requests: 46 },
  { day: "Fri", navigator: 61, requests: 27 },
  { day: "Sat", navigator: 88, requests: 44 },
  { day: "Sun", navigator: 123, requests: 60 },
];

export const LIVE_FEED = [
  { id: 1, text: "Patient requested Dermatology appointment", meta: "Lusail · 2 min ago" },
  { id: 2, text: "AI Navigator routed patient to Pediatrics", meta: "Al Gharrafa · 6 min ago" },
  { id: 3, text: "Patient completed pre-visit questionnaire", meta: "Lusail · 11 min ago" },
  { id: 4, text: "Appointment request received", meta: "Al Gharrafa · 14 min ago" },
  { id: 5, text: "Patient viewed Dr. S. Haddad profile", meta: "Lusail · 18 min ago" },
  { id: 6, text: "Urgent pathway shown to patient", meta: "Lusail · 23 min ago" },
  { id: 7, text: "AI Navigator routed patient to Orthopedics", meta: "Al Gharrafa · 27 min ago" },
];

export const ADMIN_APPOINTMENTS = [
  { id: "RMC-4821", patient: "S. A.", specialty: "Orthopedics", doctor: "Dr. Ahmed Hassan", branch: "Lusail", date: "18 Sep · 10:30", status: "Confirmed" },
  { id: "RMC-4822", patient: "M. K.", specialty: "Dermatology", doctor: "Dr. Layla Mansour", branch: "Lusail", date: "18 Sep · 17:30", status: "Requested" },
  { id: "RMC-4823", patient: "F. R.", specialty: "Pediatrics", doctor: "Dr. Noor Al Kuwari", branch: "Al Gharrafa", date: "19 Sep · 09:00", status: "Confirmed" },
  { id: "RMC-4824", patient: "H. A.", specialty: "Cardiology", doctor: "Dr. Samir Haddad", branch: "Lusail", date: "19 Sep · 11:00", status: "Pre-visit pending" },
  { id: "RMC-4825", patient: "N. B.", specialty: "Ophthalmology", doctor: "Dr. Khaled Nasser", branch: "Lusail", date: "20 Sep · 12:15", status: "Confirmed" },
  { id: "RMC-4826", patient: "L. T.", specialty: "Obstetrics & Gynecology", doctor: "Dr. Maha Darwish", branch: "Al Gharrafa", date: "21 Sep · 11:30", status: "Requested" },
];

export const DOCTOR_LOAD: Record<string, number> = {
  "ahmed-hassan": 42,
  "layla-mansour": 38,
  "noor-alkuwari": 35,
  "samir-haddad": 47,
  "maha-darwish": 29,
  "khaled-nasser": 24,
  "yara-fakhoury": 19,
  "omar-shaheen": 31,
  "hana-jaber": 26,
  "faisal-almarri": 17,
  "rania-saleh": 14,
  "tarek-baroudi": 21,
  "sami-othman": 23,
};
