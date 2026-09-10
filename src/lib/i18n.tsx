import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "ar";

type Dict = Record<string, { en: string; ar: string }>;

const D: Dict = {
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.doctors": { en: "Find a Doctor", ar: "ابحث عن طبيب" },
  "nav.specialities": { en: "Specialities", ar: "التخصصات" },
  "nav.services": { en: "Services", ar: "الخدمات" },
  "nav.navigator": { en: "AI Health Navigator", ar: "المرشد الصحي الذكي" },
  "nav.appointments": { en: "Appointments", ar: "المواعيد" },
  "nav.portal": { en: "Patient Portal", ar: "بوابة المريض" },
  "nav.emergency": { en: "Emergency", ar: "الطوارئ" },
  "nav.request": { en: "Request Appointment", ar: "احجز موعداً" },
  "nav.profile": { en: "Profile", ar: "حسابي" },
  "nav.ai": { en: "Navigator", ar: "المرشد" },

  "brand.name": { en: "Royal Medical Center", ar: "المركز الطبي الملكي" },
  "brand.tagline": { en: "Doha, Qatar", ar: "الدوحة، قطر" },
  "brand.front": { en: "Digital Front Door", ar: "البوابة الرقمية" },

  "home.eyebrow": { en: "The Digital Front Door of Royal Medical Center", ar: "البوابة الرقمية للمركز الطبي الملكي" },
  "home.h1": { en: "Healthcare, made easier.", ar: "رعاية صحية أسهل." },
  "home.sub": {
    en: "Connect with the right doctor, service and next step — all through one simple digital experience.",
    ar: "تواصل مع الطبيب والخدمة والخطوة التالية المناسبة — من خلال تجربة رقمية واحدة وبسيطة.",
  },
  "home.cta1": { en: "Find the Right Care", ar: "اعرف الرعاية المناسبة" },
  "home.cta2": { en: "Request an Appointment", ar: "احجز موعداً" },
  "home.cta3": { en: "Talk to our Health Navigator", ar: "تحدث إلى المرشد الصحي" },
  "home.help": { en: "How can we help you today?", ar: "كيف يمكننا مساعدتك اليوم؟" },
  "home.helpSub": {
    en: "Choose the option that matches your situation. We'll guide you from there.",
    ar: "اختر الخيار الأقرب لحالتك، وسنرشدك من هناك.",
  },

  "card1.title": { en: "I need medical help", ar: "أحتاج مساعدة طبية" },
  "card1.body": { en: "Tell us what you're experiencing.", ar: "أخبرنا بما تشعر به." },
  "card1.cta": { en: "Start Health Navigator", ar: "ابدأ المرشد الصحي" },
  "card2.title": { en: "I want to see a doctor", ar: "أريد زيارة طبيب" },
  "card2.body": { en: "Find the right specialist for your needs.", ar: "اعرف الأخصائي المناسب لحالتك." },
  "card2.cta": { en: "Find a Doctor", ar: "ابحث عن طبيب" },
  "card3.title": { en: "I want to book an appointment", ar: "أريد حجز موعد" },
  "card3.body": { en: "Choose a specialty, doctor and preferred time.", ar: "اختر التخصص والطبيب والوقت المناسب." },
  "card3.cta": { en: "Book Appointment", ar: "احجز الموعد" },
  "card4.title": { en: "I'm already a patient", ar: "أنا مريض مسجل" },
  "card4.body": { en: "Access your appointments and follow-up.", ar: "اطّلع على مواعيدك ومتابعتك." },
  "card4.cta": { en: "Open Patient Portal", ar: "افتح بوابة المريض" },

  "nav.title": { en: "RMC Health Navigator", ar: "المرشد الصحي للمركز الطبي الملكي" },
  "nav.subtitle": {
    en: "An intelligent guide to help you find the right next step.",
    ar: "دليل ذكي يساعدك في معرفة الخطوة التالية المناسبة.",
  },
  "nav.what": { en: "What can we help you with?", ar: "بماذا يمكننا مساعدتك؟" },
  "nav.placeholder": { en: "Tell us what you're experiencing...", ar: "أخبرنا بما تشعر به..." },
  "nav.disclaimer": {
    en: "Health Navigator provides general informational guidance and does not replace professional medical advice. For emergencies, contact emergency services or visit the Emergency Department.",
    ar: "يقدم المرشد الصحي إرشادات عامة ولا يُغني عن الاستشارة الطبية المتخصصة. في الحالات الطارئة، اتصل بخدمات الطوارئ أو توجه إلى قسم الطوارئ.",
  },

  "doctors.h1": { en: "Find the right doctor for you.", ar: "اعرف الطبيب المناسب لك." },
  "doctors.search": { en: "Search by doctor, specialty or condition", ar: "ابحث بالطبيب أو التخصص أو الحالة" },
  "common.book": { en: "Book Appointment", ar: "احجز موعداً" },
  "common.viewProfile": { en: "View Profile", ar: "الملف الشخصي" },
  "common.branch": { en: "Branch", ar: "الفرع" },
  "common.languages": { en: "Languages", ar: "اللغات" },
  "common.experience": { en: "Experience", ar: "سنوات الخبرة" },
  "common.nextAvailable": { en: "Next available", ar: "أقرب موعد" },
  "common.years": { en: "years", ar: "سنة" },
  "common.demo": { en: "Demo", ar: "عرض توضيحي" },
  "footer.rights": { en: "Demonstration prototype — not a live medical service.", ar: "نموذج توضيحي — ليس خدمة طبية فعلية." },

  "home.cta3sub": {
    en: "Describe how you feel — we'll suggest the right next step.",
    ar: "اوصف ما تشعر به — وسنقترح الخطوة التالية المناسبة.",
  },
  "home.stat1": { en: "13 specialities", ar: "13 تخصصاً" },
  "home.stat2": { en: "Same-week appointments", ar: "مواعيد خلال نفس الأسبوع" },
  "home.stat3": { en: "Lusail & Al Gharrafa", ar: "لوسيل والغرافة" },
  "home.cardEyebrow": { en: "Next step, clear", ar: "خطوة تالية واضحة" },
  "home.cardBody": {
    en: "Patients tell us what they need — the platform guides them to the right service.",
    ar: "يخبرنا المريض بما يحتاجه — وتوجهه المنصة إلى الخدمة المناسبة.",
  },
  "home.storyEyebrow": { en: "From website to platform", ar: "من موقع إلى منصة" },
  "home.storyH2": {
    en: "Patients shouldn't have to know which doctor to see.",
    ar: "لا ينبغي أن يعرف المريض أي طبيب يزور.",
  },
  "home.storyBody": {
    en: "They tell us what they need help with. The platform connects doctors, specialities, services and appointments into one guided journey — and prepares each visit before the patient arrives.",
    ar: "يخبرنا المريض بما يحتاج المساعدة فيه. تربط المنصة الأطباء والتخصصات والخدمات والمواعيد في رحلة واحدة موجهة — وتجهّز كل زيارة قبل وصول المريض.",
  },
  "home.storyCta": { en: "See the management view", ar: "اطّلع على واجهة الإدارة" },
  "home.step1": { en: "Describe the concern", ar: "اوصف الشكوى" },
  "home.step1body": { en: "A short guided conversation, in Arabic or English.", ar: "محادثة موجهة قصيرة، بالعربية أو الإنجليزية." },
  "home.step2": { en: "Get the right service", ar: "احصل على الخدمة المناسبة" },
  "home.step2body": { en: "Specialty guidance with clear, safe next steps.", ar: "إرشاد للتخصص مع خطوات تالية واضحة وآمنة." },
  "home.step3": { en: "Book in a few taps", ar: "احجز بلمسات قليلة" },
  "home.step3body": { en: "Doctor, branch, date and time in one flow.", ar: "الطبيب والفرع والتاريخ والوقت في مسار واحد." },
  "home.step4": { en: "Arrive prepared", ar: "احضر مستعداً" },
  "home.step4body": { en: "A pre-visit summary ready for the care team.", ar: "ملخص قبل الزيارة جاهز للفريق الطبي." },
  "home.specH2": { en: "Specialities", ar: "التخصصات" },
  "home.specSub": {
    en: "Care across 13 specialities at our Lusail and Al Gharrafa branches.",
    ar: "رعاية في 13 تخصصاً في فرعي لوسيل والغرافة.",
  },
  "home.specAll": { en: "View all specialities", ar: "عرض جميع التخصصات" },
  "home.docH2": { en: "Meet our doctors", ar: "تعرف على أطبائنا" },
  "home.docSub": {
    en: "Consultants and specialists across both branches, with availability this week.",
    ar: "استشاريون وأخصائيون في الفرعين، مع مواعيد متاحة هذا الأسبوع.",
  },
  "home.urgentH2": { en: "Need urgent medical care?", ar: "تحتاج رعاية طبية عاجلة؟" },
  "home.urgentBody": {
    en: "For severe symptoms, don't wait for an appointment. Emergency information and directions are one tap away.",
    ar: "في الأعراض الشديدة لا تنتظر موعداً. معلومات الطوارئ والاتجاهات على بعد لمسة واحدة.",
  },
  "home.urgentCta": { en: "Emergency information", ar: "معلومات الطوارئ" },
  "home.callLusail": { en: "Call Lusail", ar: "اتصل بفرع لوسيل" },
  "home.managementDemo": { en: "Management Demo", ar: "عرض الإدارة" },
};

interface Ctx {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      dir,
      setLang,
      t: (key: string) => D[key]?.[lang] ?? D[key]?.en ?? key,
    }),
    [lang, dir],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
