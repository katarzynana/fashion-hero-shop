import { Lock } from "lucide-react";
import { promotedHome } from "@/data/promoted";

export const DropPreview = () => {
  const items = promotedHome.slice(0, 4);
  return (
    <section className="bg-cream px-6 md:px-10 py-20">
      <div className="max-w-[1500px] mx-auto">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-[11px] font-medium tracking-[0.6px] text-muted-foreground mb-3">
              THIS WEEK · 04 OF 05 BRANDS
            </p>
            <h2 className="text-3xl md:text-4xl font-normal tracking-[0.4px] text-charcoal">
              Members preview
            </h2>
          </div>
          <span className="hidden md:inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.6px] text-charcoal border border-charcoal px-3 py-1.5 rounded-full">
            <Lock className="w-3 h-3" /> LOCKED
          </span>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((p) => (
              <div key={p.id} className="group">
                <div
                  className="relative aspect-square rounded-sm overflow-hidden"
                  style={{ background: p.gradient }}
                >
                  <div className="absolute inset-0 backdrop-blur-md bg-white/10" />
                  <div className="absolute top-3 left-3 bg-white text-charcoal text-[10px] font-semibold tracking-[0.6px] px-2 py-1 rounded-full">
                    PLUS
                  </div>
                </div>
                <div className="pt-3 px-1">
                  <p className="text-[12px] text-muted-foreground italic">
                    {p.brand}
                  </p>
                  <h3 className="text-[13px] font-medium text-charcoal blur-[3px] select-none">
                    {p.name}
                  </h3>
                  <p className="text-[13px] font-medium text-charcoal blur-[3px] select-none">
                    {p.price} zl
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Center unlock CTA */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <a
              href="#signup"
              className="pointer-events-auto inline-flex items-center gap-2 px-7 py-3 text-[12px] font-medium uppercase tracking-[0.6px] text-white bg-charcoal rounded-full hover:bg-charcoal/85 transition shadow-xl"
            >
              <Lock className="w-3.5 h-3.5" />
              Unlock with PLUS
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
