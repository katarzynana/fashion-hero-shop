"use client";

const heroImg =
  "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&q=80";

const collage = [
  "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1200&q=80",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
];

export const PlusHeroV2 = () => {
  const onCta = () => {
    document
      .getElementById("signup")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative bg-background overflow-hidden">
      <div className="grid lg:grid-cols-12 gap-0 lg:gap-10 max-w-[1500px] mx-auto px-6 md:px-10 pt-12 lg:pt-20 pb-16 lg:pb-24">
        {/* Copy */}
        <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1 pt-10 lg:pt-0">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[10px] tracking-[0.18em] font-medium px-1.5 py-0.5 border border-forest text-forest rounded-sm">
              PLUS
            </span>
            <span className="text-[11px] font-medium tracking-[0.6px] text-muted-foreground">
              INVITATION ONLY · SPRING 2026
            </span>
          </div>

          <h1 className="text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.04] lg:text-[64px] lg:leading-[1.02] font-normal tracking-[0.4px] text-charcoal">
            A private door to Poland&apos;s
            <span className="italic font-serif font-normal"> most interesting </span>
            independent designers.
          </h1>

          <p className="mt-7 text-[15px] md:text-base leading-relaxed text-muted-foreground max-w-lg">
            Weekly drops from carefully selected brands. Brand stories. Early
            access to new collections. Everything you won&apos;t find in the
            mainstream.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              onClick={onCta}
              className="inline-flex items-center justify-center px-7 py-3 text-[12px] font-medium uppercase tracking-[0.6px] text-white bg-pink-500 border border-pink-500 rounded-full hover:bg-pink-600 hover:border-pink-600 transition-all duration-200"
            >
              Join the waitlist
            </button>
            <a
              href="#how"
              className="inline-flex items-center justify-center px-7 py-3 text-[12px] font-medium uppercase tracking-[0.6px] text-charcoal border border-charcoal rounded-full hover:bg-charcoal hover:text-white transition-all duration-200"
            >
              How it works
            </a>
          </div>

          <p className="mt-5 text-[12px] text-muted-foreground tracking-wide">
            From PLN 39 / month &nbsp;·&nbsp; Launching spring 2026
          </p>
        </div>

        {/* Layered collage */}
        <div className="lg:col-span-6 order-1 lg:order-2 relative h-[55vh] lg:h-[640px]">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[72%] h-[78%] overflow-hidden rounded-sm shadow-xl">
              <img
                src={heroImg}
                alt="Independent designer at work"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-[55%] h-[55%] overflow-hidden rounded-sm shadow-2xl ring-4 ring-background">
              <img
                src={collage[0]}
                alt="Tailored garment detail"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="hidden md:block absolute top-[42%] left-[36%] w-[34%] h-[30%] overflow-hidden rounded-sm shadow-xl ring-4 ring-background">
              <img
                src={collage[1]}
                alt="Fabric texture closeup"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Floating chip */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full shadow flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
              <span className="text-[10px] font-medium tracking-[0.6px] text-charcoal">
                NEXT DROP — MON 9AM
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
