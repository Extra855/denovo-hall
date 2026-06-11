"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function VisualEditing() {
  const router = useRouter();

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    async function enableVisualEditing() {
      try {
        const { enableVisualEditing } = await import("@sanity/visual-editing");
        cleanup = enableVisualEditing({
          zIndex: 9999,
          refresh: ({ source }) => {
            if (source === "manual") {
              router.refresh();
            }
            return false;
          },
        });
      } catch {
        // Visual editing not available
      }
    }

    enableVisualEditing();

    return () => {
      cleanup?.();
    };
  }, [router]);

  return null;
}
