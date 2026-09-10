import { useEffect, useState } from "react";

/** True only after hydration — use to gate client-only chart rendering. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
