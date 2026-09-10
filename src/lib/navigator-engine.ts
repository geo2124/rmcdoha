/**
 * Deterministic demo Health Navigator engine.
 * Rule/keyword based routing — replace with a real AI API call later by
 * keeping the same `route()` signature and response shape.
 */

export interface NavigatorQuestion {
  id: string;
  question: string;
}

export interface NavigatorRoute {
  kind: "specialty" | "urgent";
  specialtyId?: string;
  specialtyLabel?: string;
  reason: string;
  acknowledgement: string;
  questions: NavigatorQuestion[];
  guidance: string[];
}

const BASE_QUESTIONS = (extra: string[]): NavigatorQuestion[] =>
  extra.map((q, i) => ({ id: `q${i}`, question: q }));

const URGENT_KEYWORDS = [
  "severe chest",
  "chest pain",
  "crushing",
  "can't breathe",
  "cant breathe",
  "difficulty breathing",
  "shortness of breath",
  "unconscious",
  "fainted",
  "loss of consciousness",
  "stroke",
  "slurred speech",
  "heavy bleeding",
  "severe bleeding",
  "numb on one side",
  "seizure",
  "poison",
  "overdose",
];

const RULES: { keywords: string[]; specialtyId: string; label: string; questions: string[]; guidance: string[] }[] = [
  {
    keywords: ["knee", "shoulder", "bone", "joint", "back pain", "hip", "fracture", "sprain", "ankle", "sports injury", "wrist"],
    specialtyId: "orthopedics",
    label: "Orthopedics",
    questions: [
      "When did it start?",
      "Was there an injury?",
      "Is there swelling?",
      "Can you walk normally?",
      "Is the pain getting worse?",
    ],
    guidance: [
      "Avoid activities that clearly worsen the pain until you are assessed.",
      "Bring any previous X-rays or scan reports to your appointment.",
    ],
  },
  {
    keywords: ["skin", "rash", "acne", "eczema", "itch", "mole", "psoriasis", "pigment", "spot"],
    specialtyId: "dermatology",
    label: "Dermatology",
    questions: [
      "How long have you noticed it?",
      "Is the area itchy or painful?",
      "Has it changed in size or colour?",
      "Have you used any creams or treatments?",
      "Do you have any known allergies?",
    ],
    guidance: [
      "Avoid new cosmetic products on the affected area before your visit.",
      "Photos of how the area looked earlier can be helpful.",
    ],
  },
  {
    keywords: ["hair loss", "hair", "bald", "thinning", "transplant"],
    specialtyId: "hair-transplant",
    label: "Hair Transplant & Dermatology",
    questions: [
      "When did you first notice the hair loss?",
      "Is it in patches or generally thinning?",
      "Is there a family history of hair loss?",
      "Any recent illness, stress or diet change?",
      "Have you tried any treatments?",
    ],
    guidance: [
      "Recent blood tests, if you have them, are useful for the consultation.",
      "Hair loss often has medical causes worth assessing before any procedure.",
    ],
  },
  {
    keywords: ["child", "baby", "kid", "infant", "toddler", "fever in my", "pediatric", "my son", "my daughter", "newborn"],
    specialtyId: "pediatrics",
    label: "Pediatrics",
    questions: [
      "How old is the child?",
      "How long has the fever or symptom lasted?",
      "What is the highest recorded temperature?",
      "Is the child drinking and eating normally?",
      "Any rash, vomiting or unusual drowsiness?",
    ],
    guidance: [
      "Keep the child hydrated and monitor temperature regularly.",
      "If the child becomes unusually drowsy or breathing changes, seek urgent care.",
    ],
  },
  {
    keywords: ["eye", "vision", "blurry", "cataract", "sight", "red eye", "dry eye"],
    specialtyId: "ophthalmology",
    label: "Ophthalmology",
    questions: [
      "Which eye is affected?",
      "When did the symptoms begin?",
      "Has your vision changed?",
      "Any pain, redness or discharge?",
      "Do you wear glasses or contact lenses?",
    ],
    guidance: [
      "Avoid contact lenses until you have been examined.",
      "Bring your current glasses prescription if available.",
    ],
  },
  {
    keywords: ["pregnan", "gynecolog", "gynaecolog", "period", "menstrual", "obstetric", "ultrasound scan", "fertility"],
    specialtyId: "obgyn",
    label: "Obstetrics & Gynecology",
    questions: [
      "What is the main concern you'd like reviewed?",
      "When was your last menstrual period?",
      "Are you currently pregnant or trying to conceive?",
      "Any pain or unusual bleeding?",
      "Have you had previous scans or tests?",
    ],
    guidance: ["Bring previous scan reports or test results if you have them."],
  },
  {
    keywords: ["tooth", "teeth", "dental", "gum", "cavity", "toothache", "braces"],
    specialtyId: "dentistry",
    label: "Dentistry",
    questions: [
      "Which tooth or area is affected?",
      "How long has it been painful?",
      "Is the pain triggered by hot, cold or pressure?",
      "Any swelling of the gum or face?",
      "When was your last dental visit?",
    ],
    guidance: ["Facial swelling with dental pain should be reviewed promptly."],
  },
  {
    keywords: ["cough", "asthma", "breath short", "wheez", "chest infection", "diabet", "blood pressure", "thyroid", "fatigue", "tired"],
    specialtyId: "internal-pulmonary",
    label: "Internal & Pulmonary Medicine",
    questions: [
      "What is the main symptom?",
      "How long has it lasted?",
      "Any fever, weight change or night sweats?",
      "Do you have any diagnosed chronic conditions?",
      "Are you taking any regular medication?",
    ],
    guidance: ["A list of your current medication will help the consultation."],
  },
  {
    keywords: ["heart", "palpitation", "cardio", "blood pressure high", "cholesterol", "ecg"],
    specialtyId: "cardiology",
    label: "Cardiology",
    questions: [
      "What symptoms have you noticed?",
      "When do they usually occur?",
      "Do they happen with exertion or at rest?",
      "Any family history of heart disease?",
      "Are you on any heart or blood pressure medication?",
    ],
    guidance: [
      "If symptoms come on suddenly and severely, treat it as urgent.",
      "Previous ECG or echo reports are useful to bring.",
    ],
  },
  {
    keywords: ["urine", "kidney", "bladder", "prostate", "stone", "urolog"],
    specialtyId: "urology",
    label: "Urology",
    questions: [
      "What symptoms are you experiencing?",
      "How long have they been present?",
      "Any pain when passing urine?",
      "Any blood in the urine?",
      "Have you had kidney stones before?",
    ],
    guidance: ["Keep well hydrated unless you have been advised otherwise."],
  },
  {
    keywords: ["vein", "varicose", "circulation", "leg swelling", "diabetic foot"],
    specialtyId: "vascular-surgery",
    label: "Vascular Surgery",
    questions: [
      "Which limb is affected?",
      "How long has the swelling or discomfort been present?",
      "Any skin colour change or wounds?",
      "Does it worsen with standing?",
      "Do you have diabetes?",
    ],
    guidance: ["Sudden painful swelling in one leg should be reviewed urgently."],
  },
  {
    keywords: ["hernia", "gallbladder", "abdominal pain", "stomach pain", "appendix", "lump"],
    specialtyId: "general-surgery",
    label: "General Surgery",
    questions: [
      "Where exactly is the pain or lump?",
      "When did you first notice it?",
      "Is it getting larger or more painful?",
      "Any vomiting or fever?",
      "Any previous abdominal surgery?",
    ],
    guidance: ["Severe or worsening abdominal pain with fever needs urgent review."],
  },
  {
    keywords: ["scar", "cosmetic", "plastic", "reconstruct", "contour", "tummy tuck"],
    specialtyId: "plastic-surgery",
    label: "Plastic Surgery",
    questions: [
      "What would you like assessed?",
      "How long has this been a concern?",
      "Have you had previous surgery in the area?",
      "Any ongoing medical conditions?",
      "What outcome are you hoping for?",
    ],
    guidance: ["Consultations focus on realistic outcomes and safety planning."],
  },
];

const FALLBACK: NavigatorRoute = {
  kind: "specialty",
  specialtyId: "internal-pulmonary",
  specialtyLabel: "Internal & Pulmonary Medicine",
  acknowledgement:
    "Thank you. To help guide you to the appropriate service, I'd like to ask a few quick questions.",
  reason:
    "Based on the information you provided, a general medical consultation may be an appropriate starting point. The doctor can then refer you to a specialist if needed.",
  questions: BASE_QUESTIONS([
    "What is the main symptom or concern?",
    "When did it start?",
    "Is it getting better, worse or unchanged?",
    "Have you seen a doctor about this before?",
    "Are you taking any medication?",
  ]),
  guidance: ["Note down when symptoms began and anything that makes them better or worse."],
};

export const EXAMPLE_PROMPTS = [
  "Chest discomfort",
  "Knee pain",
  "Skin problem",
  "Child has a fever",
  "Difficulty breathing",
  "Hair loss",
  "Eye problem",
];

export function route(input: string): NavigatorRoute {
  const text = input.toLowerCase();

  if (URGENT_KEYWORDS.some((k) => text.includes(k))) {
    return {
      kind: "urgent",
      acknowledgement:
        "Thank you for telling us. Some of what you've described may need to be looked at quickly.",
      reason:
        "Based on what you've described, it may be important to seek urgent medical attention. This guidance is not a diagnosis.",
      questions: [],
      guidance: [
        "If symptoms are severe or worsening, do not wait for an appointment.",
        "If possible, have someone stay with you or accompany you.",
      ],
    };
  }

  const hit = RULES.find((r) => r.keywords.some((k) => text.includes(k)));
  if (!hit) return { ...FALLBACK };

  return {
    kind: "specialty",
    specialtyId: hit.specialtyId,
    specialtyLabel: hit.label,
    acknowledgement:
      "Thank you. To help guide you to the appropriate service, I'd like to ask a few quick questions.",
    reason: `Based on the information you provided, a ${hit.label.toLowerCase()} consultation may be an appropriate next step.`,
    questions: BASE_QUESTIONS(hit.questions),
    guidance: hit.guidance,
  };
}

export const PREVISIT_QUESTIONS = [
  "What is the main reason for your visit?",
  "When did it begin?",
  "What symptoms are you experiencing?",
  "Are you currently taking any medications?",
  "Have you had previous tests or consultations for this?",
];

export const PREVISIT_LABELS = [
  "Reason for visit",
  "Duration",
  "Reported symptoms",
  "Current medication",
  "Previous treatment",
];
