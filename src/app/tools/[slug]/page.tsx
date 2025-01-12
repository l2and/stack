import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tool } from "@/types"
import { notFound } from "next/navigation"
import Markdown from "react-markdown"

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
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="space-y-4">
          <div className="flex justify-between items-start">
            <CardTitle className="text-3xl font-bold">
              {tool.title}
            </CardTitle>
            <Badge
              variant={
                tool.status === "Currently Using"
                  ? "default"
                  : tool.status === "Plan to Try"
                  ? "secondary"
                  : "destructive"
              }
            >
              {tool.status}
            </Badge>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">{tool.category}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold">How to Use</h3>
              <div className="text-sm text-muted-foreground whitespace-pre-line">
                {tool.howToUse}
              </div>
            </div>
            {tool.caveats && (
              <div className="space-y-2">
                <h3 className="font-semibold">Caveats</h3>
                <div className="text-sm text-muted-foreground whitespace-pre-line">
                  {tool.caveats}
                </div>
              </div>
            )}
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <Markdown>{tool.content}</Markdown>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export const revalidate = false // static 