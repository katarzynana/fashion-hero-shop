import type { Metadata } from "next";
import { PlusHeroV2 } from "@/components/plus/PlusHeroV2";
import { BrandMarquee } from "@/components/plus/BrandMarquee";
import { PlusBenefits } from "@/components/plus/PlusBenefits";
import { DropPreview } from "@/components/plus/DropPreview";
import { HowADropWorks } from "@/components/plus/HowADropWorks";
import { FoundersStripV2 } from "@/components/plus/FoundersStripV2";
import { ForWhoV2 } from "@/components/plus/ForWhoV2";
import { SignupFormV2 } from "@/components/plus/SignupFormV2";

export const metadata: Metadata = {
  title: "FashionHero Plus",
  description:
    "A private door to Poland's most interesting independent designers. Weekly drops, brand stories, and 48h early access.",
};

export default function PlusPage() {
  return (
    <>
      <PlusHeroV2 />
      <BrandMarquee />
      <PlusBenefits />
      <DropPreview />
      <HowADropWorks />
      <FoundersStripV2 />
      <ForWhoV2 />
      <SignupFormV2 />
    </>
  );
}
