import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Process } from "@/types/index"
import { notFound } from "next/navigation"
import { ProcessCard } from "@/components/ui/process-card"
import { Card, CardContent } from "@/components/ui/card"
import Markdown from "react-markdown"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

async function getProcess(slug: string) {
  try {
    const filePath = path.join(process.cwd(), "src/content/processes", `${slug}.md`)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)
    return {
      ...data,
      content,
      slug,
    } as Process & { content: string }
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  const processesDir = path.join(process.cwd(), "src/content/processes")
  const files = fs.readdirSync(processesDir)
  return files.map((file) => ({
    slug: file.replace(/\.md$/, ""),
  }))
}

export default async function ProcessPage({ params }: PageProps) {
  const { slug } = await params
  const process = await getProcess(slug)
  
  if (!process) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <ProcessCard {...process} showContent />
        <Card>
          <CardContent className="pt-6">
            <div className="prose dark:prose-invert max-w-none">
              <Markdown>{process.content}</Markdown>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export const revalidate = false // static 