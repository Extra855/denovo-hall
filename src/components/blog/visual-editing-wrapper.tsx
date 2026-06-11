"use client";

import dynamic from "next/dynamic";

const VisualEditing = dynamic(
  () => import("./visual-editing").then((mod) => mod.VisualEditing),
  { ssr: false },
);

export function VisualEditingWrapper() {
  return <VisualEditing />;
}
