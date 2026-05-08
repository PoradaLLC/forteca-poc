"use client";
import { useEffect } from "react";

export default function PixelLead() {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "Lead");
    }
  }, []);
  return null;
}
