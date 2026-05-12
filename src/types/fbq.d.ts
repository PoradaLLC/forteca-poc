declare global {
  interface Window {
    fbq?: (
      command: "track" | "trackCustom",
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export {};
