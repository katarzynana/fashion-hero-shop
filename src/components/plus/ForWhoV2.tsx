const points = [
  "Looking for unique pieces, not another mass collection",
  "Read reviews before buying — and want plenty of them",
  "Want to know who you're buying from",
  "Value curation over scrolling 100,000 products",
  "Like discovering brands before everyone else",
  "Care about craft, not throwaway fashion",
];

export const ForWhoV2 = () => {
  return (
    <section className="bg-cream px-6 md:px-10 py-20">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex items-end justify-between gap-6 mb-10">
          <h2 className="text-3xl md:text-4xl font-normal tracking-[0.4px] text-charcoal max-w-xl">
            <span className="italic font-serif">Plus</span> is for you if…
          </h2>
          <p className="hidden md:block text-[12px] font-medium tracking-[0.6px] text-muted-foreground">
            06 SIGNS
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {points.map((p) => (
            <span
              key={p}
              className="inline-flex items-center px-5 py-3 text-[14px] text-charcoal bg-background border border-border rounded-full hover:border-charcoal transition-colors"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
