"use client";

import { useEffect } from "react";

export function useDynamicBG({ isDark }: { isDark: boolean }) {
  useEffect(() => {
    if (isDark) {
      document.body.style.backgroundColor = "var(--color-neutral-900)";
    } else {
      document.body.style.backgroundColor = "var(--color-white)";
    }
  }, [isDark]);
}
