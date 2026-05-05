"use client";

import { useId, useState } from "react";
import { z } from "zod";

const PRICE_OPTIONS = [
  { value: "lt_19", label: "Up to PLN 19" },
  { value: "20_39", label: "PLN 20–39" },
  { value: "40_59", label: "PLN 40–59" },
  { value: "60_plus", label: "PLN 60+" },
  { value: "no_pay", label: "I wouldn't pay" },
] as const;

const VALUE_OPTIONS = [
  { value: "drops", label: "Curated drops from independent brands" },
  { value: "stylist", label: "Personal Stylist AI — recommendations for your style" },
  { value: "priority", label: "Priority Member — free shipping, priority returns" },
  { value: "tbyb", label: "Try Before You Buy — pay only for what you keep" },
  { value: "wardrobe", label: "Smart Wardrobe — planner + price alerts" },
] as const;

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Enter your email")
    .email("Invalid email address")
    .max(255),
  price: z.string().min(1, "Pick one option"),
  values: z
    .array(z.string())
    .min(1, "Select at least one option")
    .max(2, "Maximum 2"),
  reason: z.string().trim().max(1000).optional(),
});

type FieldKey = "email" | "price" | "values" | "reason";

export const SignupFormV2 = () => {
  const emailId = useId();
  const reasonId = useId();

  const [email, setEmail] = useState("");
  const [price, setPrice] = useState<string>("");
  const [values, setValues] = useState<string[]>([]);
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const toggleValue = (v: string) => {
    setValues((prev) => {
      if (prev.includes(v)) return prev.filter((x) => x !== v);
      if (prev.length >= 2) return prev;
      return [...prev, v];
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, price, values, reason });
    if (!parsed.success) {
      const fe: Partial<Record<FieldKey, string>> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as FieldKey;
        if (!fe[k]) fe[k] = issue.message;
      }
      setErrors(fe);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const submission = {
      ...parsed.data,
      submittedAt: new Date().toISOString(),
    };

    try {
      const key = "fhplus_waitlist";
      const prev = JSON.parse(localStorage.getItem(key) || "[]");
      prev.push(submission);
      localStorage.setItem(key, JSON.stringify(prev));
    } catch {
      /* ignore */
    }

    window.setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 300);
  };

  return (
    <section
      id="signup"
      className="bg-background px-6 md:px-10 py-20 scroll-mt-20"
    >
      <div className="max-w-[1100px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left rail */}
        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <p className="text-[11px] font-medium tracking-[0.6px] text-muted-foreground mb-4">
              JOIN THE WAITLIST
            </p>
            <h2 className="text-3xl md:text-[40px] leading-[1.05] font-normal tracking-[0.4px] text-charcoal">
              Help us design <span className="italic font-serif">Plus</span> for you.
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground max-w-md">
              Three quick questions. The first 500 people get 50% off the first
              3 months.
            </p>
            <ul className="mt-8 space-y-3 text-[13px] text-charcoal/80">
              <li className="flex gap-3">
                <span className="w-1 h-1 rounded-full bg-pink-500 mt-2.5" />
                Zero spam. Ever.
              </li>
              <li className="flex gap-3">
                <span className="w-1 h-1 rounded-full bg-pink-500 mt-2.5" />
                Behind-the-scenes updates every 2–3 weeks.
              </li>
              <li className="flex gap-3">
                <span className="w-1 h-1 rounded-full bg-pink-500 mt-2.5" />
                You influence what we ship at launch.
              </li>
            </ul>
          </div>
        </aside>

        {/* Form */}
        <div className="lg:col-span-7">
          {!done ? (
            <form onSubmit={handleSubmit} noValidate className="space-y-10 bg-cream rounded-sm border border-border p-6 md:p-10">
              {/* Email */}
              <div>
                <label
                  htmlFor={emailId}
                  className="block text-[11px] tracking-[0.6px] font-medium text-charcoal mb-3"
                >
                  EMAIL
                </label>
                <input
                  id={emailId}
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${emailId}-err` : undefined}
                  className="w-full bg-background border border-input rounded-sm px-4 py-3.5 text-[15px] text-charcoal placeholder:text-muted-foreground/70 focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal"
                />
                {errors.email && (
                  <p id={`${emailId}-err`} className="mt-2 text-[12px] text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Q1 — price (chip pills) */}
              <fieldset>
                <legend className="text-[11px] tracking-[0.6px] font-medium text-charcoal mb-4">
                  HOW MUCH WOULD YOU PAY MONTHLY FOR PLUS?
                </legend>
                <div className="flex flex-wrap gap-2">
                  {PRICE_OPTIONS.map((opt) => {
                    const selected = price === opt.value;
                    return (
                      <label
                        key={opt.value}
                        className={`cursor-pointer inline-flex items-center px-4 py-2.5 text-[13px] rounded-full border transition-colors ${
                          selected
                            ? "bg-charcoal text-white border-charcoal"
                            : "bg-background text-charcoal border-border hover:border-charcoal"
                        }`}
                      >
                        <input
                          type="radio"
                          name="price"
                          value={opt.value}
                          checked={selected}
                          onChange={() => setPrice(opt.value)}
                          className="sr-only"
                        />
                        {opt.label}
                      </label>
                    );
                  })}
                </div>
                {errors.price && (
                  <p className="mt-2 text-[12px] text-destructive">{errors.price}</p>
                )}
              </fieldset>

              {/* Q2 — values (chip pills, max 2) */}
              <fieldset>
                <div className="flex items-baseline justify-between mb-4">
                  <legend className="text-[11px] tracking-[0.6px] font-medium text-charcoal">
                    WHAT WOULD BE MOST VALUABLE TO YOU?
                  </legend>
                  <span className="text-[11px] text-muted-foreground">
                    Max 2 ({values.length}/2)
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {VALUE_OPTIONS.map((opt) => {
                    const selected = values.includes(opt.value);
                    const disabled = !selected && values.length >= 2;
                    return (
                      <label
                        key={opt.value}
                        className={`inline-flex items-center px-4 py-2.5 text-[13px] rounded-full border transition-colors ${
                          selected
                            ? "bg-charcoal text-white border-charcoal cursor-pointer"
                            : disabled
                              ? "bg-background text-muted-foreground border-border opacity-50 cursor-not-allowed"
                              : "bg-background text-charcoal border-border hover:border-charcoal cursor-pointer"
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="values"
                          value={opt.value}
                          checked={selected}
                          disabled={disabled}
                          onChange={() => toggleValue(opt.value)}
                          className="sr-only"
                        />
                        {opt.label}
                      </label>
                    );
                  })}
                </div>
                {errors.values && (
                  <p className="mt-2 text-[12px] text-destructive">{errors.values}</p>
                )}
              </fieldset>

              {/* Q3 — reason */}
              <div>
                <label
                  htmlFor={reasonId}
                  className="block text-[11px] tracking-[0.6px] font-medium text-charcoal mb-3"
                >
                  WHY?{" "}
                  <span className="text-muted-foreground tracking-normal normal-case">
                    (optional)
                  </span>
                </label>
                <textarea
                  id={reasonId}
                  rows={4}
                  maxLength={1000}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="What excites you most — or puts you off?"
                  className="w-full bg-background border border-input rounded-sm px-4 py-3 text-[15px] text-charcoal placeholder:text-muted-foreground/70 focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-white text-[12px] uppercase tracking-[0.6px] font-medium py-4 rounded-full transition-colors disabled:opacity-60"
                >
                  {submitting ? "Saving…" : "Put me on the list"}
                </button>
                <p className="mt-4 text-[12px] text-center text-muted-foreground">
                  We'll let you know when we launch. Zero spam.
                </p>
              </div>
            </form>
          ) : (
            <div className="bg-cream rounded-sm border border-border p-10 md:p-14 text-center">
              <p className="text-[11px] tracking-[0.6px] font-medium text-pink-500 mb-6">
                CONFIRMED
              </p>
              <h2 className="text-3xl md:text-4xl font-normal tracking-[0.4px] text-charcoal">
                You&apos;re on the list.
              </h2>
              <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground max-w-lg mx-auto">
                We&apos;ll let you know when we launch — spring 2026. Every 2–3 weeks
                we&apos;ll send behind-the-scenes content: conversations with sellers,
                sneak peeks of new brands, and our first product decisions.
              </p>
              <a
                href="/"
                className="inline-flex items-center justify-center mt-10 px-7 py-3 text-[12px] font-medium uppercase tracking-[0.6px] text-charcoal border border-charcoal rounded-full hover:bg-charcoal hover:text-white transition"
              >
                Back to FashionHero
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
