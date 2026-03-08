"use client";

import dynamic from "next/dynamic";

const GlobalCanvasNoSSR = dynamic(
  () => import("@/components/global/GlobalCanvas").then(mod => mod.GlobalCanvas),
  { ssr: false }
);

export function GlobalCanvasWrapper() {
  return <GlobalCanvasNoSSR />;
}
