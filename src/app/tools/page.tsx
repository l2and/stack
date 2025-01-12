import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Tool } from "@/types"

function getTools() {
  const toolsDir = path.join(process.cwd(), "src/content/tools")
  const filenames = fs.readdirSync(toolsDir)

  return filenames.map((filename) => {
    const filePath = path.join(toolsDir, filename)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data } = matter(fileContents)
    return {
      ...data,
      slug: filename.replace(/\.md$/, ""),
    } as Tool
  })
}

export default function ToolsPage() {
  const tools = getTools()
  const categories = ["All", "AI", "Productivity", "Development", "Communication", "Design", "Other"]

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center gap-4 text-center mb-8">
        <h1 className="text-4xl font-bold">
          My <span className="gradient-text">Tools</span>
        </h1>
        <p className="text-muted-foreground max-w-[42rem]">
          A curated collection of tools I use daily for productivity, development, and more.
        </p>
      </div>

      <Tabs defaultValue="All" className="w-full">
        <TabsList className="flex flex-wrap justify-center mb-8">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="px-4">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tools
                .filter((tool) => category === "All" || tool.category === category)
                .map((tool) => (
                  <Link key={tool.slug} href={`/tools/${tool.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-xl">{tool.title}</CardTitle>
                          <Badge
                            variant={
                              tool.status === "Currently Using"
                                ? "default"
                                : tool.status === "Plan to Try"
                                ? "secondary"
                                : tool.status === "Actively Maintained"
                                ? "gold"
                                : "destructive"
                            }
                            className={
                              tool.status === "Actively Maintained"
                                ? "bg-amber-500 hover:bg-amber-600 animate-pulse shadow-lg shadow-amber-200/50 dark:shadow-amber-900/50"
                                : ""
                            }
                          >
                            {tool.status}
                          </Badge>
                        </div>
                        <CardDescription className="text-sm text-muted-foreground">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  )
}

export const revalidate = false // static 