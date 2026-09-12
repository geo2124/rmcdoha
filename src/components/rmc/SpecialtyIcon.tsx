import {
  Activity,
  Baby,
  Brain,
  Bone,
  ClipboardCheck,
  Droplets,
  Eye,
  Gem,
  Heart,
  HeartPulse,
  Pill,
  ScanLine,
  Scissors,
  Smile,
  Sparkles,
  Stethoscope,
  TestTubes,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MAP: Record<string, LucideIcon> = {
  Activity,
  Baby,
  Brain,
  Bone,
  ClipboardCheck,
  Droplets,
  Eye,
  Gem,
  Heart,
  HeartPulse,
  Pill,
  ScanLine,
  Scissors,
  Smile,
  Sparkles,
  Stethoscope,
  TestTubes,
};

export function SpecialtyIcon({ name, className }: { name: string; className?: string }) {
  const Icon = MAP[name] ?? Stethoscope;
  return <Icon className={cn("size-5", className)} strokeWidth={1.6} aria-hidden="true" />;
}

export function IconTile({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground",
        className,
      )}
    >
      <SpecialtyIcon name={name} />
    </span>
  );
}
