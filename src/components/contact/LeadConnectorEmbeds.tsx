"use client";

import { useEffect } from "react";

export function LeadConnectorEmbeds() {
  useEffect(() => {
    const SCRIPT_SRC = "https://link.msgsndr.com/js/form_embed.js";
    if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return null;
}
