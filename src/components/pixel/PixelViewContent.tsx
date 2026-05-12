"use client";
import { useEffect } from "react";

export default function PixelViewContent({
  name,
  slug,
}: {
  name: string;
  slug: string;
}) {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "ViewContent", {
        content_name: name,
        content_ids: [slug],
        content_type: "hotel",
      });
    }
  }, [name, slug]);
  return null;
}
