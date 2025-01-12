import Link from "next/link"
import { WarpBackground } from "@/components/ui/warp-background"
import { GITHUB_REPO_URL } from "@/lib/constants"

export default function Home() {
  return (
    <WarpBackground>
      <main className={`grid place-items-center px-2 py-4 md:px-24 md:py-12`} style={{ height: `calc(100vh - 230px)` }}>
        <div className="relative flex flex-col items-center justify-center gap-1 md:gap-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Gary&apos;s Stack
          </h1>
          <p className="max-w-[400px] text-sm text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            A curated collection of tools and processes I use to build, learn, and grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto sm:justify-center">
            <Link
              href="/tools"
              className="inline-flex h-10 items-center justify-center rounded-md bg-emerald-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-700 disabled:pointer-events-none disabled:opacity-50"
            >
              View My Tools
            </Link>
            <Link
              href="/processes"
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            >
              View My Processes
            </Link>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              Fork this template to showcase your own stack!
            </p>
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-emerald-600 hover:text-emerald-700 dark:text-emerald-500 dark:hover:text-emerald-400"
            >
              View on GitHub ↗
            </a>
          </div>
        </div>
      </main>
    </WarpBackground>
  )
}
