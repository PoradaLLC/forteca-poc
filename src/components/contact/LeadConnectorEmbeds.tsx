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
    <>
      {/* Opt-In Form */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-forteca-navy/5">
        <iframe
          src="https://api.leadconnectorhq.com/widget/form/tzOVDDrphRwwxVjUJKud"
          style={{ width: "100%", height: "1029px", border: "none" }}
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
      </div>

      {/* Booking Calendar */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-forteca-navy/5">
        <iframe
          src="https://api.leadconnectorhq.com/widget/booking/mjafIT5kvPfbIRbwhCtc"
          style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "700px", display: "block" }}
          scrolling="no"
          id="gnxrzHxJv22boLn6r2mq_1777741914490"
          title="Book a Call"
        />
      </div>
    </>
  );
}
