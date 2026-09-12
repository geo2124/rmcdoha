/**
 * Verified Royal Medical Center public directory data.
 * Doctor names, departments, profile details and contact numbers are sourced
 * from rmcdoha.com. Appointment availability and management analytics remain simulated.
 */

export type BranchId = "hilal" | "gharrafa";

export interface Branch { id: BranchId; name: string; nameAr: string; phone: string; address: string; directions: string; }
export interface Specialty { id: string; name: string; nameAr: string; blurb: string; category: "Clinical Services" | "Diagnostics" | "Specialized Procedures"; icon: string; }
export interface Doctor {
  id: string; name: string; title: string; specialtyId: string; gender: "male" | "female";
  expertise: string[]; services: string[]; sourceUrl: string; imageUrl?: string;
  branch?: BranchId; languages?: string[]; experience?: number; about?: string; credentials?: string[];
  consultation?: string[]; insurance?: string[]; nextAvailable?: string; availability?: "This week" | "Next week" | "Today"; slots?: string[];
}
export interface ServiceItem { id: string; name: string; category: "Clinical Services" | "Diagnostics" | "Laboratory" | "Pharmacy" | "Specialized Procedures"; description: string; specialtyId?: string; icon: string; }

export const BRANCHES: Branch[] = [
 { id:"hilal", name:"Al Hilal", nameAr:"الهلال", phone:"+974 4450 2050", address:"Al Muntazah Street, West Hilal Area, Doha, Qatar", directions:"https://maps.google.com/?q=Royal+Medical+Center+Al+Hilal+Doha" },
 { id:"gharrafa", name:"Al Gharrafa", nameAr:"الغرافة", phone:"+974 4460 2060", address:"Al Mazhabiyah Street, opposite Al Jazeera Compound, Street 920, Zone 51, Doha, Qatar", directions:"https://maps.google.com/?q=Royal+Medical+Center+Al+Gharrafa+Doha" },
];

export const SPECIALTIES: Specialty[] = [
 {id:"dentistry",name:"Dentistry",nameAr:"طب الأسنان",blurb:"Oral surgery, cosmetic and pediatric dentistry, orthodontics and endodontics.",category:"Clinical Services",icon:"Smile"},
 {id:"dermatology",name:"Dermatology",nameAr:"طب الأمراض الجلدية",blurb:"Medical dermatology, hair and nail care, and aesthetic treatments.",category:"Clinical Services",icon:"Sparkles"},
 {id:"general-surgery",name:"General Surgery",nameAr:"الجراحة العامة",blurb:"General and laparoscopic surgical consultation and treatment.",category:"Specialized Procedures",icon:"Stethoscope"},
 {id:"hair-transplant",name:"Hair Transplant",nameAr:"زرع الشعر الطبيعي",blurb:"Specialist assessment and surgical hair restoration.",category:"Specialized Procedures",icon:"Scissors"},
 {id:"internal-pulmonary",name:"Internal & Pulmonary Medicine",nameAr:"الطب الداخلي والرئوي",blurb:"General medicine and respiratory disease care.",category:"Clinical Services",icon:"Activity"},
 {id:"obgyn",name:"Obstetrics & Gynecology",nameAr:"طب التوليد والنسائيات",blurb:"Pregnancy, gynecology, infertility and women’s health care.",category:"Clinical Services",icon:"Baby"},
 {id:"ophthalmology",name:"Ophthalmology",nameAr:"طب العيون",blurb:"Eye examinations, diagnostics and ophthalmic surgery.",category:"Clinical Services",icon:"Eye"},
 {id:"orthopedics",name:"Orthopedics",nameAr:"جراحة العظام",blurb:"Orthopedic assessment and treatment for bone and joint conditions.",category:"Clinical Services",icon:"Bone"},
 {id:"pediatrics",name:"Pediatrics",nameAr:"طب الأطفال",blurb:"Child health, development, vaccination and acute care.",category:"Clinical Services",icon:"Baby"},
 {id:"plastic-surgery",name:"Plastic Surgery",nameAr:"الجراحة التجميلية",blurb:"Aesthetic and reconstructive surgical consultations.",category:"Specialized Procedures",icon:"Gem"},
 {id:"psychiatry",name:"Psychiatry",nameAr:"الطب النفسي",blurb:"Psychiatry is listed in RMC’s official department directory.",category:"Clinical Services",icon:"Brain"},
 {id:"urology",name:"Urology",nameAr:"المسالك البولية",blurb:"Assessment and treatment of urinary and male health conditions.",category:"Clinical Services",icon:"Droplets"},
 {id:"vascular-surgery",name:"Vascular Surgery",nameAr:"جراحة الأوعية الدموية",blurb:"Specialist care for vascular and circulation conditions.",category:"Specialized Procedures",icon:"HeartPulse"},
];

const profile=(id:string,name:string,title:string,specialtyId:string,gender:"male"|"female",expertise:string[],path:string,imageUrl?:string):Doctor=>({id,name,title,specialtyId,gender,expertise,services:expertise,sourceUrl:`https://rmcdoha.com/${path}/`,...(imageUrl?{imageUrl}:{})});
export const DOCTORS: Doctor[] = [
 profile("georges-ghanem","Dr. Georges Ghanem","Oral Surgeon and Medical Aesthetics","dentistry","male",["Wisdom tooth extraction","Dental implants","Bone grafting","TMJ treatment"],"dr-georges-ghanem","https://rmcdoha.com/wp-content/uploads/2025/03/DR.-GEORGES-GHANEM-2-1.jpg"),
 profile("joe-hobeich","Dr. Joe Hobeich","Cosmetic Dentistry","dentistry","male",["Teeth whitening","Dental veneers","Dental crowns","Smile makeovers"],"dr-joe-hobeich","https://rmcdoha.com/wp-content/uploads/2025/03/DR.-JOE-HOBEICHE-1.jpg"),
 profile("morshed-morshed","Dr. Morshed Morshed","Oral and Maxillofacial Surgery","dentistry","male",["Dental implants","Jaw surgery","Facial trauma surgery","TMJ treatment"],"dr-morshed-morshed"),
 profile("jean-claude-bou-chedid","Dr. Jean Claude Bou Chedid","Pediatric Dentistry","dentistry","male",["Dental examinations","Fluoride treatments","Cavity fillings","Emergency dental care"],"dr-jean-claude-bou-chedid"),
 profile("marc-ezzedine","Dr. Marc Ezzedine","Pediatric Dentistry","dentistry","male",["Dental examinations","Fluoride treatments","Cavity fillings","Oral health education"],"dr-marc-ezzedine","https://rmcdoha.com/wp-content/uploads/2025/03/DR.-MARK-EZZEDINE.jpg"),
 profile("wassim-el-sayed","Dr. Wassim El Sayed","Orthodontist","dentistry","male",["Traditional braces","Clear aligners","Ceramic braces","Retainers"],"dr-wassim-el-sayed"),
 profile("kamil-karam","Dr. Kamil Karam","Orthodontist","dentistry","male",["Traditional braces","Clear aligners","Lingual braces","Retainers"],"dr-kamil-karam","https://rmcdoha.com/wp-content/uploads/2025/03/DR.-CAMILLE-ZEIDAN-KARAM-scaled.jpg"),
 profile("khalil-andrawos","Dr. Khalil Andraos","Orthodontist","dentistry","male",["Traditional braces","Clear aligners","Ceramic braces","Retainers"],"dr-khalil-andrawos"),
 profile("rawi-harb","Dr. Rawi Harb","Endodontic Specialist","dentistry","male",["Root canal therapy","Endodontic retreatment","Dental trauma management","Vital pulp therapy"],"dr-rawi-harb","https://rmcdoha.com/wp-content/uploads/2025/03/DR.-RAWI-HARB.jpg"),
 profile("costi","Dr. Costi","Dermatology Consultant","dermatology","male",["Hair diseases","Botox and filler injections","Nail diseases"],"dr-maurice-dahdah","https://rmcdoha.com/wp-content/uploads/2025/03/DR.-COSTI.jpg"),
 profile("rasha-al-aassi","Dr. Rasha Al Aassi","Dermatology Consultant","dermatology","female",["Skin diseases and allergies","Hair problems","Non-surgical face and neck tightening"],"dr-rasha-al-aassi","https://rmcdoha.com/wp-content/uploads/2017/11/dr-rasha-al.png"),
 profile("samar-ali","Dr. Samar Ali","Consultant in Dermatology","dermatology","female",["Cosmetic skin treatment","PRP treatment","Laser hair removal","Skin tightening"],"dr-samar-ali","https://rmcdoha.com/wp-content/uploads/2017/11/dr-samar.jpg"),
 profile("wissam-heneidy","Dr. Wissam Heneidy","Consultant in General and Laparoscopic Surgery","general-surgery","male",["Hernia surgery","Anal surgery","Cholecystectomy","Appendectomy"],"dr-wissam-heneidy","https://rmcdoha.com/wp-content/uploads/2017/11/dr-wesam-hinidi.png"),
 profile("frederic-menu","Dr. Frederic Menu","Hair Transplant Surgeon","hair-transplant","male",["Hair transplant surgery","Facial and maxillofacial surgery","Microsurgery"],"dr-frederic","https://rmcdoha.com/wp-content/uploads/2017/10/dr-federic.png"),
 profile("mouchira","Dr. Mouchira","Internal & Pulmonary Medicine","internal-pulmonary","female",["Internal medicine","Respiratory medicine"],"dr-cecilio-azar"),
 profile("haitham-rehann","Dr. Haitham Rehann","Consultant in Internal Medicine and Respiratory Diseases","internal-pulmonary","male",["General medicine","Diabetes management","Hypertension","Respiratory diseases"],"dr-haitham-rehann","https://rmcdoha.com/wp-content/uploads/2017/11/dr-haitham-rahman.png"),
 profile("walid-gergi","Dr. Walid Gergi","Obstetrics and Gynecology Consultant","obgyn","male",["Pregnancy follow-up","Infertility","Hormonal imbalance","Natural and Cesarean delivery"],"dr-walid-gergi","https://rmcdoha.com/wp-content/uploads/2017/11/dr-walid-gergi.png"),
 profile("elie-hallak","Dr. Elie Hallak","Ophthalmology","ophthalmology","male",["Eye care and assessment"],"dr-elie-hallak"),
 profile("hassan-arrayed","Dr. Hassan Arrayed","Ophthalmology Consultant","ophthalmology","male",["Adult and child eye examinations","LASIK and LASEK","Cornea and retina analysis","Cataract surgery"],"dr-hassan-arrayed","https://rmcdoha.com/wp-content/uploads/2017/09/dr-hassan.png"),
 profile("joseph-basile","Dr. Joseph Basile","Orthopedics Surgeon Consultant","orthopedics","male",["Knee arthroscopy","Sports injuries","Joint replacement","Knee ligament treatment"],"dr-joseph-basile","https://rmcdoha.com/wp-content/uploads/2017/11/dr-joseph-basile.png"),
 profile("ghassan-assaf-zeinaddeen","Dr. Ghassan Assaf ZeinAddeen","Consultant Pediatrics","pediatrics","male",["Child health care","Nutrition programs","Vaccines","Child development"],"dr-ghassan","https://rmcdoha.com/wp-content/uploads/2017/10/Dr-Ghassan-1.png"),
 profile("mazen-mahmood","Dr. Mazen Mahmood","Pediatrics","pediatrics","male",["Child health care","Pediatric consultation"],"dr-mazen-mahmood"),
 profile("paul-audi","Dr. Paul Audi","Plastic Surgery","plastic-surgery","male",["Plastic and reconstructive surgery"],"dr-paul-audi"),
 profile("fady-el-jiz","Dr. Fady El Jiz","Plastic Surgery","plastic-surgery","male",["Plastic and reconstructive surgery"],"dr-fady-el-jiz"),
 profile("fadi-sleilaty","Dr. Fadi Sleilaty","Plastic Surgery","plastic-surgery","male",["Plastic and reconstructive surgery"],"dr-fadi-sleilaty"),
 profile("jihad-khoury","Dr. Jihad Khoury","Plastic Surgery","plastic-surgery","male",["Plastic and reconstructive surgery"],"dr-jihad-khoury"),
 profile("hicham-mouallem","Dr. Hicham Mouallem","Plastic Surgery","plastic-surgery","male",["Plastic and reconstructive surgery"],"dr-hicham-mouallem"),
 profile("marwan-al-zoghby","Dr. Marwan Al Zoghby","Urology","urology","male",["Urology consultation and treatment"],"dr-yasser-abbas"),
 profile("joseph-j-naoum","Dr. Joseph J Naoum","Vascular Surgery","vascular-surgery","male",["Vascular surgery consultation and treatment"],"dr-jospeh-j-naoum"),
];

export const SERVICES: ServiceItem[] = [
  {
    id: "specialist-consultation",
    name: "Specialist Consultation",
    category: "Clinical Services",
    description: "Consultations across RMC’s published medical departments.",
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
    description: "ECG, echocardiography and stress testing with internal-pulmonary review.",
    specialtyId: "internal-pulmonary",
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
    description: "Pharmacy services and prescription support.",
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
export const branchById = (id: BranchId) => BRANCHES.find((b) => b.id === id) ?? BRANCHES[0];
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
  { name: "Internal Medicine", value: 18 },
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
    { name: "Internal Medicine", requests: 9 },
    { name: "Orthopedics", requests: 8 },
    { name: "Dermatology", requests: 7 },
    { name: "Pediatrics", requests: 6 },
    { name: "Gynecology", requests: 4 },
    { name: "Ophthalmology", requests: 3 },
  ],
  "7d": [
    { name: "Internal Medicine", requests: 58 },
    { name: "Orthopedics", requests: 51 },
    { name: "Dermatology", requests: 44 },
    { name: "Pediatrics", requests: 38 },
    { name: "Gynecology", requests: 29 },
    { name: "Ophthalmology", requests: 22 },
  ],
  "30d": [
    { name: "Internal Medicine", requests: 214 },
    { name: "Orthopedics", requests: 191 },
    { name: "Dermatology", requests: 168 },
    { name: "Pediatrics", requests: 142 },
    { name: "Gynecology", requests: 118 },
    { name: "Ophthalmology", requests: 86 },
  ],
  "90d": [
    { name: "Internal Medicine", requests: 612 },
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
  { id: 1, text: "Patient requested Dermatology appointment", meta: "Al Hilal · 2 min ago" },
  { id: 2, text: "AI Navigator routed patient to Pediatrics", meta: "Al Gharrafa · 6 min ago" },
  { id: 3, text: "Patient completed pre-visit questionnaire", meta: "Al Hilal · 11 min ago" },
  { id: 4, text: "Appointment request received", meta: "Al Gharrafa · 14 min ago" },
  { id: 5, text: "Patient viewed Dr. S. Haddad profile", meta: "Al Hilal · 18 min ago" },
  { id: 6, text: "Urgent pathway shown to patient", meta: "Al Hilal · 23 min ago" },
  { id: 7, text: "AI Navigator routed patient to Orthopedics", meta: "Al Gharrafa · 27 min ago" },
];

export const ADMIN_APPOINTMENTS = [
  { id: "RMC-4821", patient: "S. A.", specialty: "Orthopedics", doctor: "Dr. Joseph Basile", branch: "Al Hilal", date: "18 Sep · 10:30", status: "Confirmed" },
  { id: "RMC-4822", patient: "M. K.", specialty: "Dermatology", doctor: "Dr. Rasha Al Aassi", branch: "Al Hilal", date: "18 Sep · 17:30", status: "Requested" },
  { id: "RMC-4823", patient: "F. R.", specialty: "Pediatrics", doctor: "Dr. Ghassan Assaf ZeinAddeen", branch: "Al Gharrafa", date: "19 Sep · 09:00", status: "Confirmed" },
  { id: "RMC-4824", patient: "H. A.", specialty: "Internal Medicine", doctor: "Dr. Haitham Rehann", branch: "Al Hilal", date: "19 Sep · 11:00", status: "Pre-visit pending" },
  { id: "RMC-4825", patient: "N. B.", specialty: "Ophthalmology", doctor: "Dr. Hassan Arrayed", branch: "Al Hilal", date: "20 Sep · 12:15", status: "Confirmed" },
  { id: "RMC-4826", patient: "L. T.", specialty: "Obstetrics & Gynecology", doctor: "Dr. Walid Gergi", branch: "Al Gharrafa", date: "21 Sep · 11:30", status: "Requested" },
];

export const DOCTOR_LOAD: Record<string, number> = {
  "joseph-basile": 42,
  "rasha-al-aassi": 38,
  "ghassan-assaf-zeinaddeen": 35,
  "haitham-rehann": 47,
  "walid-gergi": 29,
  "hassan-arrayed": 24,
  "frederic-menu": 19,
  "wissam-heneidy": 31,
  "georges-ghanem": 26,
  "marwan-al-zoghby": 17,
  "paul-audi": 14,
  "joseph-j-naoum": 21,
  "fady-el-jiz": 23,
};
