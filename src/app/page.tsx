import Link from "next/link"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { WarpBackground } from "@/components/ui/warp-background"

export default function Home() {
  return (
    <WarpBackground className="min-h-screen">
      <main className="flex min-h-screen flex-col items-center justify-center p-8 relative">
        <div className="container max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
            {siteConfig.name}
          </h1>
          <p className="text-xl text-muted-foreground">
            {siteConfig.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link href="/tools">View My Tools</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/processes">View My Processes</Link>
            </Button>
          </div>
        </div>
      </main>
    </WarpBackground>
  )
}
