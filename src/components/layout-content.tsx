// src/components/layout-content.tsx
"use client"

import { usePathname } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useTheme } from "next-themes"
import { useEffect } from "react"

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isEmbedRoute = pathname.startsWith('/embed');
  const { setTheme } = useTheme();
  
  // Set theme based on route when component mounts or route changes
  useEffect(() => {
    // Set light theme for embed routes, dark for others
    if (isEmbedRoute) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, [isEmbedRoute, setTheme]);

  return (
    <div className="relative flex min-h-screen flex-col">
      {!isEmbedRoute && <SiteHeader />}
      <main className="flex-1">
        {children}
      </main>
      {!isEmbedRoute && <SiteFooter />}
    </div>
  );
}