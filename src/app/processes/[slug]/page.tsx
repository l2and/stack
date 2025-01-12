import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Process } from "@/types"
import { notFound } from "next/navigation"
import Markdown from "react-markdown"

interface PageProps {
  params: {
    slug: string
  }
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
  } catch (error) {
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
  const process = await getProcess(params.slug)

  if (!process) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="space-y-4">
          <div className="flex justify-between items-start">
            <CardTitle className="text-3xl font-bold">
              {process.title}
            </CardTitle>
            <Badge variant="outline">{process.category}</Badge>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Tools Used</h3>
            <div className="flex flex-wrap gap-2">
              {process.toolsInvolved.map((tool) => (
                <Badge key={tool} variant="secondary">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Key Steps</h3>
              <ol className="list-decimal list-inside text-sm text-muted-foreground">
                {process.steps.map((step, index) => (
                  <li key={index} className="mb-1">{step}</li>
                ))}
              </ol>
            </div>
            {process.notes && (
              <div className="space-y-2">
                <h3 className="font-semibold">Notes</h3>
                <div className="text-sm text-muted-foreground">
                  {process.notes}
                </div>
              </div>
            )}
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <Markdown>{process.content}</Markdown>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export const revalidate = false // static 