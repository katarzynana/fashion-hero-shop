import { brands } from "@/data/promoted";

export const BrandMarquee = () => {
  const row = [...brands, ...brands];
  return (
    <section
      aria-hidden="true"
      className="bg-cream border-y border-border py-5 overflow-hidden"
    >
      <div className="flex items-center gap-3 mb-3 px-6 md:px-10 max-w-[1500px] mx-auto">
        <span className="text-[10px] font-medium tracking-[0.6px] text-muted-foreground">
          PARTNER ATELIERS
        </span>
        <span className="flex-1 h-px bg-border" />
      </div>
      <div className="relative">
        <div className="flex gap-12 marquee-track whitespace-nowrap">
          {row.map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="text-[18px] md:text-[22px] font-normal italic tracking-[0.4px] text-charcoal/80"
            >
              {b}
              <span className="ml-12 text-charcoal/30">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
