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

  return (
    <div className="space-y-12">
      {/* Opt-In Form */}
      <iframe
        src="https://api.leadconnectorhq.com/widget/form/tzOVDDrphRwwxVjUJKud"
        style={{ width: "100%", height: "1029px", border: "none", borderRadius: "5px" }}
        id="inline-tzOVDDrphRwwxVjUJKud"
        data-layout='{"id":"INLINE"}'
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Opt-In Form"
        data-height="1029"
        data-layout-iframe-id="inline-tzOVDDrphRwwxVjUJKud"
        data-form-id="tzOVDDrphRwwxVjUJKud"
        title="Opt-In Form"
      />

      {/* Booking Calendar */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
          Schedule a Call
        </p>
        <h2 className="mb-6 font-serif text-2xl font-bold text-forteca-navy">
          Book Time With Us
        </h2>
        <iframe
          src="https://api.leadconnectorhq.com/widget/booking/mjafIT5kvPfbIRbwhCtc"
          style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "700px" }}
          scrolling="no"
          id="gnxrzHxJv22boLn6r2mq_1777741914490"
          title="Book a Call"
        />
      </div>
    </div>
  );
}
