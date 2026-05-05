const steps = [
  {
    day: "MON",
    time: "09:00",
    title: "The drop lands",
    body: "5 brands, hand-picked. Notification + email with the full edit.",
  },
  {
    day: "MON–WED",
    time: "48H",
    title: "Members-only window",
    body: "Browse and shop before anyone else on FashionHero.",
  },
  {
    day: "WED",
    time: "09:00",
    title: "Public release",
    body: "Whatever's left opens to the rest of the marketplace.",
  },
];

export const HowADropWorks = () => {
  return (
    <section id="how" className="bg-background px-6 md:px-10 py-20">
      <div className="max-w-[1300px] mx-auto">
        <div className="mb-12">
          <p className="text-[11px] font-medium tracking-[0.6px] text-muted-foreground mb-3">
            HOW IT WORKS
          </p>
          <h2 className="text-3xl md:text-4xl font-normal tracking-[0.4px] text-charcoal max-w-2xl">
            One drop. <span className="italic font-serif">Forty-eight</span> hours of head start.
          </h2>
        </div>

        <div className="relative">
          {/* progress rail */}
          <div className="hidden md:block absolute top-[34px] left-0 right-0 h-[2px] bg-border">
            <div className="h-full bg-charcoal w-2/3" />
          </div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-6 relative">
            {steps.map((s, idx) => (
              <div key={s.title} className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-[18px] h-[18px] rounded-full bg-charcoal ring-4 ring-background relative z-10" />
                  <span className="text-[10px] font-medium tracking-[0.6px] text-muted-foreground">
                    STEP {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-[12px] font-medium tracking-[0.6px] text-pink-500 mb-2">
                  {s.day} · {s.time}
                </p>
                <h3 className="text-xl md:text-2xl font-normal text-charcoal mb-3 leading-snug">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
