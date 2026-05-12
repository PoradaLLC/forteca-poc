"use client";
import { useEffect } from "react";

export default function PixelContact() {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "Contact");
    }
  }, []);
  return null;
}
