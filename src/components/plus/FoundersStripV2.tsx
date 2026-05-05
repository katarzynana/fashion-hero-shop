const founderImg =
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&q=80";

export const FoundersStripV2 = () => {
  return (
    <section className="bg-charcoal text-white px-6 md:px-10 py-20">
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-3 flex md:block items-center gap-4">
          <img
            src={founderImg}
            alt="Maja Kowalczyk, CEO of FashionHero"
            width={120}
            height={120}
            loading="lazy"
            className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover ring-2 ring-white/20"
          />
          <div className="md:mt-5">
            <p className="text-[13px] tracking-[0.4px]">Maja Kowalczyk</p>
            <p className="text-[11px] text-white/60 tracking-[0.6px]">
              CEO, FASHIONHERO
            </p>
          </div>
        </div>
        <div className="md:col-span-9">
          <p className="text-[11px] font-medium tracking-[0.6px] text-white/60 mb-4">
            FROM THE FOUNDER
          </p>
          <p className="text-2xl md:text-[32px] leading-[1.3] font-normal tracking-[0.2px]">
            We built FashionHero with{" "}
            <span className="italic font-serif">4,200 independent sellers</span>.
            Plus is our way to spotlight the ones truly worth knowing.
          </p>
        </div>
      </div>
    </section>
  );
};
