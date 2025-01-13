import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Tool } from "@/types"
import { notFound } from "next/navigation"
import { ToolCard } from "@/components/ui/tool-card"
import { Card, CardContent } from "@/components/ui/card"
import Markdown from "react-markdown"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

interface PageProps {
  params: Promise<{
    slug: string
  }>  
}

async function getTool(slug: string) {
  try {
    const filePath = path.join(process.cwd(), "src/content/tools", `${slug}.md`)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)
    return {
      ...data,
      content,
      slug,
    } as Tool & { content: string }
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  const toolsDir = path.join(process.cwd(), "src/content/tools")
  const files = fs.readdirSync(toolsDir)
  return files.map((file) => ({
    slug: file.replace(/\.md$/, ""),
  }))
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params
  const tool = await getTool(slug)
  
  if (!tool) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link
          href="/tools"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Tools
        </Link>
        <ToolCard tool={tool} showContent />
        <Card>
          <CardContent className="pt-6">
            <div className="prose dark:prose-invert max-w-none">
              <Markdown>{tool.content}</Markdown>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export const revalidate = false // static 