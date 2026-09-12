import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/rmc-logo.png.asset.json";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <img src={logoAsset.url} alt="" className={cn("h-10 w-auto shrink-0 object-contain", className)} />
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  const { t } = useLang();
  return (
    <Link to="/" className="flex min-w-0 items-center gap-3">
      <LogoMark className="h-11 sm:h-12" />
      <span className={cn("sr-only", compact && "sr-only")}>{t("brand.name")} — {t("brand.tagline")}</span>
    </Link>
  );
}
