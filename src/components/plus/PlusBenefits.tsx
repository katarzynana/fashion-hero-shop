const items = [
  {
    tag: "WEEKLY",
    title: "Monday drops",
    body:
      "Every Monday, 5 carefully selected independent brands — before they go public.",
    img: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=900&q=80",
  },
  {
    tag: "STORIES",
    title: "Brand stories",
    body:
      "Meet the designers, their inspirations and process. Not just clothes — stories.",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80",
  },
  {
    tag: "PRIORITY",
    title: "48h early access",
    body:
      "Head start over the rest of the platform. Your favorite seller drops a collection? You're first in line.",
    img: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=900&q=80",
  },
];

export const PlusBenefits = () => {
  return (
    <section className="bg-background px-6 md:px-10 py-20">
      <div className="max-w-[1300px] mx-auto">
        <div className="flex items-end justify-between gap-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-normal tracking-[0.4px] text-charcoal max-w-xl">
            What you get with{" "}
            <span className="italic font-serif">FashionHero Plus</span>
          </h2>
          <p className="hidden md:block text-[12px] font-medium tracking-[0.6px] text-muted-foreground">
            03 PILLARS
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((i) => (
            <article
              key={i.title}
              className="group bg-cream rounded-sm overflow-hidden border border-border hover:border-charcoal/40 transition-colors"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={i.img}
                  alt={i.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="text-[11px] font-medium tracking-[0.6px] text-muted-foreground mb-2">
                  {i.tag}
                </p>
                <h3 className="text-xl md:text-2xl font-normal text-charcoal mb-3 leading-snug">
                  {i.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {i.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
