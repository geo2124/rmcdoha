import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { BranchId } from "@/data/rmc";

export interface BookingDraft {
  specialtyId?: string | undefined;
  doctorId?: string | undefined;
  branch?: BranchId | undefined;
  date?: string | undefined;
  time?: string | undefined;
  patient?: {
    name: string;
    mobile: string;
    email: string;
    dob: string;
    reason: string;
  };
}

export interface Appointment {
  id: string;
  specialtyId: string;
  doctorId: string;
  branch: BranchId;
  date: string;
  time: string;
  patient: NonNullable<BookingDraft["patient"]>;
  createdAt: string;
}

export interface PreVisitSummary {
  appointmentId: string;
  answers: string[];
}

interface Ctx {
  draft: BookingDraft;
  setDraft: (patch: BookingDraft) => void;
  resetDraft: () => void;
  appointments: Appointment[];
  confirmBooking: (draft: BookingDraft) => Appointment;
  preVisit: PreVisitSummary | null;
  savePreVisit: (summary: PreVisitSummary) => void;
  adminSignedIn: boolean;
  signInAdmin: () => void;
  signOutAdmin: () => void;
}

const DemoContext = createContext<Ctx | null>(null);
const KEY = "rmc-demo-state-v1";

export function DemoProvider({ children }: { children: ReactNode }) {
  const [draft, setDraftState] = useState<BookingDraft>({});
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [preVisit, setPreVisit] = useState<PreVisitSummary | null>(null);
  const [adminSignedIn, setAdminSignedIn] = useState(false);

  // Hydrate after mount only (avoids SSR mismatch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        appointments?: Appointment[];
        preVisit?: PreVisitSummary | null;
        adminSignedIn?: boolean;
      };
      if (parsed.appointments) setAppointments(parsed.appointments);
      if (parsed.preVisit) setPreVisit(parsed.preVisit);
      if (parsed.adminSignedIn) setAdminSignedIn(true);
    } catch {
      /* ignore corrupt demo state */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ appointments, preVisit, adminSignedIn }));
    } catch {
      /* storage unavailable */
    }
  }, [appointments, preVisit, adminSignedIn]);

  const setDraft = useCallback((patch: BookingDraft) => {
    setDraftState((prev) => ({ ...prev, ...patch }));
  }, []);

  const confirmBooking = useCallback((d: BookingDraft) => {
    const appt: Appointment = {
      id: `RMC-${Math.floor(4900 + Math.random() * 90)}`,
      specialtyId: d.specialtyId!,
      doctorId: d.doctorId!,
      branch: d.branch!,
      date: d.date!,
      time: d.time!,
      patient: d.patient!,
      createdAt: new Date().toISOString(),
    };
    setAppointments((prev) => [appt, ...prev]);
    return appt;
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      draft,
      setDraft,
      resetDraft: () => setDraftState({}),
      appointments,
      confirmBooking,
      preVisit,
      savePreVisit: setPreVisit,
      adminSignedIn,
      signInAdmin: () => setAdminSignedIn(true),
      signOutAdmin: () => setAdminSignedIn(false),
    }),
    [draft, setDraft, appointments, confirmBooking, preVisit, adminSignedIn],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used inside DemoProvider");
  return ctx;
}
