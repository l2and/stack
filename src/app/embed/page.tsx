// src/app/embed/page.tsx
"use client"

import { WarpBackground } from "@/components/ui/warp-background"
import { HeroSection } from "@/components/ui/hero-section"

export default function EmbedPage() {
  return (
    <WarpBackground className="min-h-screen">
      <main className="relative grid place-items-center min-h-screen w-full px-2 py-4 md:px-24 md:py-12 overflow-hidden">
        <HeroSection isEmbedded={true} />
      </main>
    </WarpBackground>
  )
}