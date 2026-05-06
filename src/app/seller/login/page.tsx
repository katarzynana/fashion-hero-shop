"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { toast, Toaster } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { track } from "@/lib/analytics";

const signInSchema = z.object({
  login: z.string().trim().min(1, "Enter your email or store name").max(120),
  password: z.string().min(6, "At least 6 characters").max(100),
});

const resetSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(255),
});

type FieldErrors = Partial<Record<"login" | "password", string>>;

const SellerLogin = () => {
  const router = useRouter();
  const loginId = useId();
  const passwordId = useId();
  const resetId = useId();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const [resetOpen, setResetOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetSubmitting, setResetSubmitting] = useState(false);

  useEffect(() => {
    track("page_view", { page: "seller_login" });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = signInSchema.safeParse({ login, password });
    if (!parsed.success) {
      const fe: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FieldErrors;
        if (!fe[k]) fe[k] = issue.message;
      }
      setErrors(fe);
      return;
    }
    setErrors({});
    setSubmitting(true);
    track("form_submitted", { form: "seller_login" });
    toast.success("We'll be in touch", {
      description: "Seller sign-in is coming soon. Thanks for your interest.",
    });
    window.setTimeout(() => {
      setSubmitting(false);
      router.push("/seller");
    }, 800);
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = resetSchema.safeParse({ email: resetEmail });
    if (!parsed.success) {
      setResetError(parsed.error.issues[0]?.message ?? "Invalid email");
      return;
    }
    setResetError(null);
    setResetSubmitting(true);
    track("form_submitted", { form: "seller_forgot_password" });
    window.setTimeout(() => {
      setResetSubmitting(false);
      setResetOpen(false);
      setResetEmail("");
      toast.success("If an account exists, we'll send a reset link.");
    }, 600);
  };

  return (
    <>
      <Toaster />
      <div className="px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left rail */}
          <aside className="lg:col-span-5">
            <p className="text-[11px] font-medium tracking-[0.6px] text-muted-foreground mb-4">
              SELLER CENTER
            </p>
            <h1 className="text-3xl md:text-[40px] leading-[1.05] font-normal tracking-[0.4px] text-charcoal">
              Sign in to <span className="italic font-serif">FashionHero</span>{" "}
              for sellers.
            </h1>
            <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground max-w-md">
              Manage your listings, track orders, and run promoted campaigns —
              all from one dashboard.
            </p>
            <ul className="mt-8 space-y-3 text-[13px] text-charcoal/80">
              <li className="flex gap-3">
                <span className="w-1 h-1 rounded-full bg-pink-500 mt-2.5" />
                2.4M shoppers across the EU
              </li>
              <li className="flex gap-3">
                <span className="w-1 h-1 rounded-full bg-pink-500 mt-2.5" />
                Promoted Program with transparent reach
              </li>
              <li className="flex gap-3">
                <span className="w-1 h-1 rounded-full bg-pink-500 mt-2.5" />
                Simple shipping & returns workflow
              </li>
            </ul>
          </aside>

          {/* Form card */}
          <div className="lg:col-span-7 w-full">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-8 bg-cream rounded-sm border border-border p-6 md:p-10"
            >
              <div>
                <label
                  htmlFor={loginId}
                  className="block text-[11px] tracking-[0.6px] font-medium text-charcoal mb-3"
                >
                  EMAIL OR STORE NAME
                </label>
                <input
                  id={loginId}
                  type="text"
                  autoComplete="username"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder="you@example.com or your-store"
                  aria-invalid={Boolean(errors.login)}
                  aria-describedby={errors.login ? `${loginId}-err` : undefined}
                  className="w-full bg-background border border-input rounded-sm px-4 py-3.5 text-[15px] text-charcoal placeholder:text-muted-foreground/70 focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal"
                />
                {errors.login && (
                  <p
                    id={`${loginId}-err`}
                    className="mt-2 text-[12px] text-destructive"
                  >
                    {errors.login}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-3">
                  <label
                    htmlFor={passwordId}
                    className="block text-[11px] tracking-[0.6px] font-medium text-charcoal"
                  >
                    PASSWORD
                  </label>

                  <Dialog open={resetOpen} onOpenChange={setResetOpen}>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="text-[12px] text-charcoal/70 hover:text-charcoal underline underline-offset-2"
                      >
                        Forgot password?
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-background border-border rounded-sm">
                      <DialogHeader>
                        <DialogTitle className="text-charcoal text-xl font-normal tracking-[0.4px]">
                          Reset your password
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground text-[13px]">
                          Enter the email tied to your seller account. We'll
                          send a reset link.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleReset} noValidate className="space-y-4">
                        <div>
                          <label
                            htmlFor={resetId}
                            className="block text-[11px] tracking-[0.6px] font-medium text-charcoal mb-2"
                          >
                            EMAIL
                          </label>
                          <input
                            id={resetId}
                            type="email"
                            autoComplete="email"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            placeholder="you@example.com"
                            aria-invalid={Boolean(resetError)}
                            className="w-full bg-background border border-input rounded-sm px-4 py-3 text-[15px] text-charcoal placeholder:text-muted-foreground/70 focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal"
                          />
                          {resetError && (
                            <p className="mt-2 text-[12px] text-destructive">
                              {resetError}
                            </p>
                          )}
                        </div>
                        <DialogFooter className="sm:justify-end">
                          <button
                            type="submit"
                            disabled={resetSubmitting}
                            className="inline-flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-white text-[12px] uppercase tracking-[0.6px] font-medium px-6 py-3 rounded-full transition-colors disabled:opacity-60"
                          >
                            {resetSubmitting ? "Sending…" : "Send reset link"}
                          </button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="relative">
                  <input
                    id={passwordId}
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password ? `${passwordId}-err` : undefined
                    }
                    className="w-full bg-background border border-input rounded-sm px-4 pr-12 py-3.5 text-[15px] text-charcoal placeholder:text-muted-foreground/70 focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-charcoal"
                  >
                    {showPassword ? (
                      <EyeOff className="w-[18px] h-[18px]" />
                    ) : (
                      <Eye className="w-[18px] h-[18px]" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p
                    id={`${passwordId}-err`}
                    className="mt-2 text-[12px] text-destructive"
                  >
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-white text-[12px] uppercase tracking-[0.6px] font-medium py-4 rounded-full transition-colors disabled:opacity-60"
                >
                  {submitting ? "Signing in…" : "Sign in"}
                </button>
              </div>

              <div className="pt-4 border-t border-border text-center">
                <p className="text-[13px] text-muted-foreground">
                  New seller?{" "}
                  <Link
                    href="/seller"
                    className="text-charcoal underline underline-offset-2 hover:text-pink-600"
                  >
                    Apply to sell on FashionHero
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerLogin;
