// src/app/layout.tsx (server component)
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { siteConfig } from "@/config/site"
import { ThemeProvider } from "@/components/theme-provider"
import { LayoutContent } from "@/components/layout-content" // New component
import { cn } from "@/lib/utils" 

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Tools",
    "Processes",
    "Productivity",
    "Development",
    "Stack",
    "Workflow",
  ],
  authors: [
    {
      name: "Randall Hidajat",
      url: "https://randall.hidajat.me",
    },
  ],
  creator: "Gary Sheng",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.png`],
    creator: "@garysheng",
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.className
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LayoutContent>{children}</LayoutContent>
        </ThemeProvider>
      </body>
    </html>
  )
}