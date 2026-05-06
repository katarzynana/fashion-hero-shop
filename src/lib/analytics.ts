// Lightweight analytics shim. Real provider (PostHog/Hotjar) wires in later.
// Events: page_view, cta_click_hero, form_started, form_submitted, field_abandoned

type EventName =
  | "page_view"
  | "cta_click_hero"
  | "form_started"
  | "form_submitted"
  | "field_abandoned";

export function track(event: EventName, payload: Record<string, unknown> = {}) {
  const entry = { event, payload, ts: new Date().toISOString() };

  // eslint-disable-next-line no-console
  console.info("[analytics]", entry);

  // Fan out to common providers when present.
  const w = window as unknown as {
    posthog?: { capture: (n: string, p?: Record<string, unknown>) => void };
    hj?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  };

  try {
    w.posthog?.capture(event, payload);
    w.hj?.("event", event);
    w.dataLayer?.push({ event, ...payload });
  } catch {
    /* swallow — analytics never breaks UX */
  }

  // Persist locally for the validation test.
  try {
    const key = "fhplus_events";
    const prev = JSON.parse(localStorage.getItem(key) || "[]");
    prev.push(entry);
    localStorage.setItem(key, JSON.stringify(prev.slice(-200)));
  } catch {
    /* ignore */
  }
}
