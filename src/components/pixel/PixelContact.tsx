"use client";
import { useEffect } from "react";

export default function PixelContact() {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "Contact");
    }
  }, []);
  return null;
}
