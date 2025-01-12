import Link from "next/link"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 lg:p-24">
      <div className="container flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome to{" "}
          <span className="gradient-text">{siteConfig.name}</span>
        </h1>
        
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          {siteConfig.description}
        </p>

        <div className="flex gap-4">
          <Link href="/tools">
            <Button variant="default" size="lg" className="gradient-bg">
              View My Tools
            </Button>
          </Link>
          <Link href="/processes">
            <Button variant="outline" size="lg">
              View My Processes
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
