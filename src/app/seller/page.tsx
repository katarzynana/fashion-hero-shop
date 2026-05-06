"use client";

import { useMemo, useRef, useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Search, Rocket, ArrowRight, RotateCcw, Star, ChevronLeft, X } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  sellerProducts,
  initialActivePromotions,
  evaluateProduct,
  type SellerProduct,
  type ActivePromotion,
} from "@/data/seller";

// Brand tokens (scoped to this prototype only)
const C = {
  bg: "#ECE9E2",
  ink: "#1a1a1a",
  body: "#4a4a4a",
  gold: "#B8945A",
  goldDark: "#9a7a47",
  border: "#e5e5e5",
  green: "#22c55e",
  red: "#ef4444",
  amber: "#f59e0b",
  cream2: "#f5f3f0",
};

function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-[14px]" style={{ color: C.ink }}>
      <Star className="w-3.5 h-3.5 fill-current" style={{ color: C.gold }} />
      {value.toFixed(1)}
    </span>
  );
}

function Badge({ tone, children }: { tone: "green" | "red" | "amber" | "neutral"; children: React.ReactNode }) {
  const map = {
    green: { bg: "#dcfce7", fg: "#15803d", border: "#bbf7d0" },
    red: { bg: "#fee2e2", fg: "#b91c1c", border: "#fecaca" },
    amber: { bg: "#fef3c7", fg: "#b45309", border: "#fde68a" },
    neutral: { bg: "#f3f4f6", fg: "#374151", border: "#e5e7eb" },
  }[tone];
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[12px] font-medium border"
      style={{ background: map.bg, color: map.fg, borderColor: map.border }}
    >
      {children}
    </span>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled,
  full,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  full?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium text-[14px] tracking-wide transition-colors ${full ? "w-full" : ""}`}
      style={{
        background: disabled ? "#d1d5db" : C.gold,
        color: disabled ? "#6b7280" : C.ink,
        height: 44,
        padding: "0 20px",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      onMouseEnter={(e) => !disabled && (e.currentTarget.style.background = C.goldDark)}
      onMouseLeave={(e) => !disabled && (e.currentTarget.style.background = C.gold)}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-lg font-medium text-[14px] border-2 transition-colors"
      style={{
        background: "transparent",
        color: C.ink,
        borderColor: C.ink,
        height: 40,
        padding: "0 16px",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.04)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {children}
    </button>
  );
}

export default function Seller() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showPricing, setShowPricing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activePromos, setActivePromos] = useState<ActivePromotion[]>(initialActivePromotions);
  const sectionBRef = useRef<HTMLDivElement>(null);
  const sectionCRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(
    () => sellerProducts.find((p) => p.id === selectedId) ?? null,
    [selectedId],
  );
  const check = selected ? evaluateProduct(selected) : null;

  function handleSelect(id: string) {
    setSelectedId(id);
    setShowPricing(false);
    setSuccess(false);
    setTimeout(() => sectionBRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  function proceedToPricing() {
    setShowPricing(true);
    setTimeout(() => pricingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  function startPromotion() {
    if (!selected) return;
    setSuccess(true);
    const exists = activePromos.find((p) => p.productId === selected.id);
    if (!exists) {
      setActivePromos((prev) => [
        ...prev,
        {
          productId: selected.id,
          productName: selected.name,
          startDate: "Apr 28",
          endDate: "May 8",
          estimatedReach: "160+ views",
          daysLeft: 10,
        },
      ]);
    }
  }

  function tryAnother() {
    setSelectedId(null);
    setShowPricing(false);
    setSuccess(false);
    setTimeout(() => sectionBRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  function viewActive() {
    sectionCRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function stopPromotion(productId: string) {
    setActivePromos((prev) => prev.filter((p) => p.productId !== productId));
  }

  return (
    <div
      style={{
        background: C.bg,
        color: C.body,
        fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        minHeight: "100vh",
      }}
    >
      <style>{`
        .seller-h { font-family: 'Playfair Display', Georgia, 'Times New Roman', serif; color: ${C.ink}; font-weight: 600; letter-spacing: -0.01em; }
        .seller-row:nth-child(even) { background: #ffffff; }
        .seller-row:nth-child(odd) { background: ${C.bg}; }
        .seller-row:hover { background: ${C.cream2} !important; cursor: pointer; }
        .fade-in { animation: fadeIn 280ms ease-out both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .slide-in { animation: slideIn 320ms cubic-bezier(0.2,0.8,0.2,1) both; }
        @keyframes slideIn { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: none; } }
      `}</style>

      {/* Header */}
      <header style={{ borderBottom: `1px solid ${C.border}`, background: C.bg }}>
        <div className="mx-auto max-w-[1200px] px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="inline-flex items-center gap-1 text-[13px]" style={{ color: C.body }}>
              <ChevronLeft className="w-4 h-4" /> Back
            </Link>
            <div className="seller-h text-[20px] md:text-[22px] ml-2">FashionHero <span style={{ color: C.gold }}>· Seller Panel</span></div>
          </div>
          <div className="text-[13px] hidden md:block" style={{ color: C.body }}>
            Seller: <span style={{ color: C.ink, fontWeight: 500 }}>Anna's Boutique</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-4 md:px-6 py-6 md:py-10 space-y-10 md:space-y-14">
        {/* Title */}
        <section>
          <h1 className="seller-h text-[28px] md:text-[36px] leading-tight">Promoted Listings</h1>
          <p className="mt-2 text-[15px] md:text-[16px] max-w-2xl">
            Boost a product for <span style={{ color: C.ink, fontWeight: 500 }}>25 PLN / 10 days</span>. Promoted products rank higher in search and category pages.
          </p>
        </section>

        {/* SECTION A — My Products */}
        <section>
          <div className="flex items-end justify-between gap-4 mb-4">
            <div>
              <div className="text-[12px] uppercase tracking-[0.18em]" style={{ color: C.gold }}>Section A</div>
              <h2 className="seller-h text-[22px] md:text-[26px]">My Products</h2>
            </div>
            <div className="text-[13px] hidden md:block">Tap a row to promote it</div>
          </div>

          {/* Desktop table */}
          <div
            className="hidden md:block rounded-xl overflow-hidden"
            style={{ border: `1px solid ${C.border}`, background: "#fff" }}
          >
            <table className="w-full text-[14px]">
              <thead>
                <tr style={{ background: "#fff", borderBottom: `1px solid ${C.border}` }}>
                  <th className="text-left p-4 font-medium" style={{ color: C.ink }}>Product</th>
                  <th className="text-left p-4 font-medium" style={{ color: C.ink }}>Category</th>
                  <th className="text-left p-4 font-medium" style={{ color: C.ink }}>Rating</th>
                  <th className="text-left p-4 font-medium" style={{ color: C.ink }}>Return rate</th>
                  <th className="text-left p-4 font-medium" style={{ color: C.ink }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {sellerProducts.map((p) => (
                  <tr key={p.id} className="seller-row" onClick={() => handleSelect(p.id)} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td className="p-4" style={{ color: C.ink, fontWeight: 500 }}>{p.name}</td>
                    <td className="p-4">{p.category}</td>
                    <td className="p-4"><Stars value={p.rating} /> <span className="text-[12px]" style={{ color: C.body }}>({p.reviews})</span></td>
                    <td className="p-4">
                      <Badge tone={p.returnRate < 50 ? "green" : "red"}>
                        {p.returnRate < 50 ? "✓" : "✕"} {p.returnRate}%
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge tone={p.status === "Active" ? "green" : "neutral"}>● {p.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {sellerProducts.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelect(p.id)}
                className="w-full text-left rounded-xl p-4"
                style={{
                  background: "#fff",
                  border: `1px solid ${selectedId === p.id ? C.gold : C.border}`,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="font-medium text-[15px]" style={{ color: C.ink }}>{p.name}</div>
                  <Badge tone={p.status === "Active" ? "green" : "neutral"}>{p.status}</Badge>
                </div>
                <div className="text-[13px] mt-1">{p.category}</div>
                <div className="flex items-center justify-between mt-3">
                  <Stars value={p.rating} />
                  <Badge tone={p.returnRate < 50 ? "green" : "red"}>
                    {p.returnRate < 50 ? "✓" : "✕"} return {p.returnRate}%
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* SECTION B — Promote */}
        <section ref={sectionBRef}>
          <div className="mb-4">
            <div className="text-[12px] uppercase tracking-[0.18em]" style={{ color: C.gold }}>Section B</div>
            <h2 className="seller-h text-[22px] md:text-[26px]">Promote this product</h2>
            <p className="text-[14px] mt-1">Increase visibility with a 10-day boost.</p>
          </div>

          {/* State 1: select */}
          <div
            className="rounded-xl p-4 md:p-5 mb-4"
            style={{ background: "#fff", border: `1px solid ${C.border}` }}
          >
            <label className="block text-[13px] mb-2" style={{ color: C.ink, fontWeight: 500 }}>
              Select product to promote
            </label>
            <div
              className="flex items-center gap-2 rounded-lg px-3"
              style={{ border: `1px solid ${C.border}`, background: C.bg, height: 44 }}
            >
              <Search className="w-4 h-4" style={{ color: C.body }} />
              <input
                placeholder="Search by product name…"
                className="flex-1 bg-transparent outline-none text-[14px]"
                style={{ color: C.ink }}
              />
            </div>

            <div className="mt-3 text-[12px] uppercase tracking-[0.14em]" style={{ color: C.body }}>
              Suggestions
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {sellerProducts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelect(p.id)}
                  className="rounded-full px-3 py-1.5 text-[13px] transition-colors"
                  style={{
                    border: `1px solid ${selectedId === p.id ? C.gold : C.border}`,
                    background: selectedId === p.id ? "#fff8ec" : "#fff",
                    color: C.ink,
                  }}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* State 2: quality check */}
          {selected && check && !success && (
            <div className="fade-in">
              <QualityCheckCard
                product={selected}
                check={check}
                onProceed={proceedToPricing}
                onTryAnother={tryAnother}
              />
            </div>
          )}

          {/* State 3: pricing */}
          {selected && check && (check.kind === "pass" || check.kind === "borderline") && showPricing && !success && (
            <div ref={pricingRef} className="mt-4 fade-in">
              <PricingCard product={selected} onStart={startPromotion} />
            </div>
          )}

          {/* Success */}
          {selected && success && (
            <div className="mt-4 slide-in">
              <SuccessCard
                product={selected}
                onViewActive={viewActive}
                onPromoteAnother={tryAnother}
              />
            </div>
          )}
        </section>

        {/* SECTION C — Active promotions */}
        <section ref={sectionCRef}>
          <div className="mb-4">
            <div className="text-[12px] uppercase tracking-[0.18em]" style={{ color: C.gold }}>Section C</div>
            <h2 className="seller-h text-[22px] md:text-[26px]">Active promotions</h2>
          </div>

          {/* Desktop */}
          <div className="hidden md:block rounded-xl overflow-hidden" style={{ border: `1px solid ${C.border}`, background: "#fff" }}>
            <table className="w-full text-[14px]">
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  <th className="text-left p-4 font-medium" style={{ color: C.ink }}>Product</th>
                  <th className="text-left p-4 font-medium" style={{ color: C.ink }}>Start</th>
                  <th className="text-left p-4 font-medium" style={{ color: C.ink }}>End</th>
                  <th className="text-left p-4 font-medium" style={{ color: C.ink }}>Est. reach</th>
                  <th className="text-left p-4 font-medium" style={{ color: C.ink }}>Days left</th>
                  <th className="text-right p-4 font-medium" style={{ color: C.ink }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {[...activePromos].sort((a, b) => b.daysLeft - a.daysLeft).map((p) => (
                  <tr key={p.productId} className="seller-row" style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td className="p-4" style={{ color: C.ink, fontWeight: 500 }}>{p.productName}</td>
                    <td className="p-4">{p.startDate}</td>
                    <td className="p-4">{p.endDate}</td>
                    <td className="p-4">{p.estimatedReach}</td>
                    <td className="p-4">
                      <Badge tone={p.daysLeft < 3 ? "red" : "neutral"}>
                        {p.daysLeft < 3 ? "⏳" : "•"} {p.daysLeft} days
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <StopPromotionButton productName={p.productName} onConfirm={() => stopPromotion(p.productId)} />
                    </td>
                  </tr>
                ))}
                {activePromos.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-[14px]" style={{ color: C.body }}>No active promotions.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="md:hidden space-y-3">
            {[...activePromos].sort((a, b) => b.daysLeft - a.daysLeft).map((p) => (
              <div key={p.productId} className="rounded-xl p-4" style={{ background: "#fff", border: `1px solid ${C.border}` }}>
                <div className="flex items-start justify-between gap-2">
                  <div className="font-medium text-[15px]" style={{ color: C.ink }}>{p.productName}</div>
                  {p.daysLeft < 3 ? (
                    <Badge tone="red">⏳ {p.daysLeft} days</Badge>
                  ) : (
                    <Badge tone="neutral">{p.daysLeft} days</Badge>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 text-[12px]">
                  <div><div style={{ color: C.body }}>Start</div><div style={{ color: C.ink }}>{p.startDate}</div></div>
                  <div><div style={{ color: C.body }}>End</div><div style={{ color: C.ink }}>{p.endDate}</div></div>
                  <div><div style={{ color: C.body }}>Reach</div><div style={{ color: C.ink }}>{p.estimatedReach}</div></div>
                </div>
                <div className="mt-4 flex justify-end">
                  <StopPromotionButton productName={p.productName} onConfirm={() => stopPromotion(p.productId)} />
                </div>
              </div>
            ))}
            {activePromos.length === 0 && (
              <div className="text-[14px] text-center py-6" style={{ color: C.body }}>No active promotions.</div>
            )}
          </div>
        </section>

        <footer className="pt-4 text-[12px]" style={{ color: C.body }}>
          Prototype for validation only — no real charges. © FashionHero
        </footer>
      </main>
    </div>
  );
}

/* ---------------- Quality Check ---------------- */

function QualityCheckCard({
  product,
  check,
  onProceed,
  onTryAnother,
}: {
  product: SellerProduct;
  check: ReturnType<typeof evaluateProduct>;
  onProceed: () => void;
  onTryAnother: () => void;
}) {
  if (check.kind === "pass") {
    return (
      <Wrap accent={C.green} icon={<CheckCircle2 className="w-7 h-7" style={{ color: C.green }} />}>
        <Heading title="You qualify for Promoted" subtitle="Your metrics look good" />
        <Metrics
          rows={[
            { label: "Return rate", value: `${check.returnRate}%`, threshold: "< 50%", ok: true },
            { label: "Rating", value: `${check.rating}/5`, threshold: "≥ 3.5", ok: true },
          ]}
        />
        <div className="mt-5">
          <PrimaryButton onClick={onProceed}>
            Proceed to pricing <ArrowRight className="w-4 h-4" />
          </PrimaryButton>
        </div>
      </Wrap>
    );
  }

  if (check.kind === "borderline") {
    return (
      <Wrap accent={C.amber} icon={<AlertTriangle className="w-7 h-7" style={{ color: C.amber }} />}>
        <Heading title="You almost qualify" subtitle="Your return rate is close to the threshold" />
        <Metrics
          rows={[
            { label: "Return rate", value: `${check.returnRate}%`, threshold: "< 50%", warn: true },
            { label: "Rating", value: `${check.rating}/5`, threshold: "≥ 3.5", ok: true },
          ]}
        />
        <p className="text-[14px] mt-4" style={{ color: C.body }}>
          Improve slightly and you'll fully unlock Promoted. Focus on reducing returns for this product.
        </p>
        <div className="mt-5">
          <PrimaryButton onClick={onProceed}>
            Proceed to pricing (borderline) <ArrowRight className="w-4 h-4" />
          </PrimaryButton>
        </div>
      </Wrap>
    );
  }

  const isReturn = check.kind === "fail-return";
  const tips = isReturn
    ? ["Check product descriptions for clarity", "Ask customers for feedback", "Review product quality with supplier"]
    : ["Respond to customer reviews", "Focus on quality improvements", "Build positive feedback"];

  return (
    <Wrap accent={C.red} icon={<XCircle className="w-7 h-7" style={{ color: C.red }} />}>
      <Heading title="You don't qualify yet" subtitle={isReturn ? "Return rate too high" : "Rating too low"} />
      <div className="mt-3 rounded-lg p-3" style={{ background: "#fff5f5", border: `1px solid #fecaca` }}>
        <div className="text-[13px]" style={{ color: C.ink }}>
          {isReturn ? (
            <>Your return rate: <b>{check.returnRate}%</b> — required: <b>&lt; 50%</b></>
          ) : (
            <>Your rating: <b>{check.rating}/5</b> — required: <b>≥ 3.5</b></>
          )}
        </div>
      </div>
      <div className="mt-4">
        <div className="text-[13px] font-medium" style={{ color: C.ink }}>How to improve</div>
        <ul className="mt-2 space-y-1.5 text-[14px]">
          {tips.map((t) => (
            <li key={t}>💡 {t}</li>
          ))}
        </ul>
      </div>
      <div className="mt-5">
        <SecondaryButton onClick={onTryAnother}>
          <RotateCcw className="w-4 h-4" /> Try another product
        </SecondaryButton>
      </div>
    </Wrap>
  );
}

function Wrap({ accent, icon, children }: { accent: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-5 md:p-6"
      style={{
        background: "#fff",
        border: `1px solid ${C.border}`,
        borderLeft: `4px solid ${accent}`,
      }}
    >
      <div className="flex items-start gap-3">
        <div>{icon}</div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

function Heading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <>
      <h3 className="seller-h text-[20px] md:text-[22px]">{title}</h3>
      <p className="text-[14px]" style={{ color: C.body }}>{subtitle}</p>
    </>
  );
}

function Metrics({
  rows,
}: {
  rows: { label: string; value: string; threshold: string; ok?: boolean; warn?: boolean }[];
}) {
  return (
    <div className="mt-4 space-y-2">
      {rows.map((r) => (
        <div key={r.label} className="flex items-center justify-between rounded-lg px-3 py-2"
          style={{ background: C.bg, border: `1px solid ${C.border}` }}>
          <div className="text-[14px]" style={{ color: C.ink }}>
            {r.label}: <b>{r.value}</b> <span style={{ color: C.body }}>({r.threshold})</span>
          </div>
          {r.warn ? (
            <Badge tone="amber">⚠ near limit</Badge>
          ) : r.ok ? (
            <Badge tone="green">✓ pass</Badge>
          ) : (
            <Badge tone="red">✕ fail</Badge>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------------- Pricing ---------------- */

function PricingCard({ product, onStart }: { product: SellerProduct; onStart: () => void }) {
  const orders10 = product.ordersPerDay * 10;
  const lowExtra = Math.round(orders10 * 0.2);
  const highExtra = Math.round(orders10 * 0.35);
  return (
    <div className="rounded-xl p-5 md:p-6" style={{ background: "#fff", border: `1px solid ${C.border}` }}>
      <h3 className="seller-h text-[20px] md:text-[24px]">Promote: {product.name}</h3>

      <div className="grid md:grid-cols-2 gap-4 mt-5">
        <div className="rounded-lg p-4" style={{ background: C.bg, border: `1px solid ${C.border}` }}>
          <div className="text-[12px] uppercase tracking-[0.14em]" style={{ color: C.gold }}>Your performance</div>
          <div className="mt-2 text-[15px]" style={{ color: C.ink }}>
            📊 Avg <b>{product.ordersPerDay} orders / day</b> <span style={{ color: C.body }}>(last 30 days)</span>
          </div>
          <div className="mt-3 text-[13px]">
            With Promoted boost:<br />
            🚀 <b style={{ color: C.ink }}>+20–35%</b> visibility increase<br />
            Estimated <b style={{ color: C.ink }}>+{lowExtra}–{highExtra}</b> additional orders in 10 days
          </div>
        </div>

        <div className="rounded-lg p-4" style={{ background: "#fff8ec", border: `1px solid #f1e0bf` }}>
          <div className="text-[12px] uppercase tracking-[0.14em]" style={{ color: C.gold }}>Pricing</div>
          <div className="mt-2 seller-h text-[28px]">25 PLN <span className="text-[15px] font-normal" style={{ color: C.body }}>/ 10 days</span></div>
          <ul className="mt-3 space-y-1.5 text-[13px]" style={{ color: C.ink }}>
            <li>✓ Ranking boost in search results</li>
            <li>✓ Boost in category pages</li>
            <li>✓ 10-day campaign</li>
          </ul>
          <div className="mt-4">
            <PrimaryButton onClick={onStart} full>
              <Rocket className="w-4 h-4" /> Start promotion
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Success ---------------- */

function SuccessCard({
  product,
  onViewActive,
  onPromoteAnother,
}: {
  product: SellerProduct;
  onViewActive: () => void;
  onPromoteAnother: () => void;
}) {
  return (
    <div
      className="rounded-xl p-5 md:p-6"
      style={{ background: "#fff", border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.green}` }}
    >
      <div className="flex items-start gap-3">
        <CheckCircle2 className="w-9 h-9" style={{ color: C.green }} />
        <div className="flex-1">
          <h3 className="seller-h text-[22px] md:text-[26px]">Promotion active!</h3>
          <p className="text-[14px]" style={{ color: C.body }}>Your boost is live.</p>

          <div className="mt-4 rounded-lg p-4 text-[14px]" style={{ background: C.bg, border: `1px solid ${C.border}` }}>
            <div><span style={{ color: C.body }}>Product:</span> <b style={{ color: C.ink }}>{product.name}</b></div>
            <div className="mt-1"><span style={{ color: C.body }}>Active until:</span> <b style={{ color: C.ink }}>May 8, 2026</b></div>
            <div className="mt-1"><span style={{ color: C.body }}>Estimated reach:</span> <b style={{ color: C.ink }}>160+ additional views</b></div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <SecondaryButton onClick={onViewActive}>View active promotions</SecondaryButton>
            <SecondaryButton onClick={onPromoteAnother}>Promote another product</SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Stop Promotion ---------------- */

function StopPromotionButton({
  productName,
  onConfirm,
}: {
  productName: string;
  onConfirm: () => void;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className="rounded-full px-3 py-1.5 text-[13px] transition-colors"
          style={{ border: `1px solid ${C.border}`, background: "#fff", color: C.ink }}
          onMouseEnter={(e) => (e.currentTarget.style.background = C.cream2)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
        >
          Stop
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent
        className="rounded-xl"
        style={{
          background: "#fff",
          border: `1px solid ${C.border}`,
          color: C.body,
          fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="seller-h text-[20px] md:text-[22px]">
            Stop promotion?
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-3 text-[14px]" style={{ color: C.body }}>
              <p>
                You're about to stop the promotion for{" "}
                <b style={{ color: C.ink }}>{productName}</b>. This will immediately remove the visibility boost.
              </p>
              <div
                className="rounded-lg p-3 text-[13px] flex items-start gap-2"
                style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.ink }}
              >
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: C.gold }} />
                <span>
                  <b>No refund.</b> The 25 PLN fee for this boost will not be returned, even if days remain.
                </span>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="rounded-full px-4 py-1.5 text-[13px] font-normal"
            style={{ border: `1px solid ${C.border}`, background: "#fff", color: C.ink, height: "auto" }}
          >
            Keep running
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="rounded-lg text-[14px] font-medium hover:opacity-90"
            style={{ background: C.gold, color: C.ink, height: 44, padding: "0 20px" }}
          >
            Stop without refund
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
