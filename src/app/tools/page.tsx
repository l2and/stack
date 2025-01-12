import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Tool } from "@/types"
import { ToolCard } from "@/components/ui/tool-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

async function getTools() {
  const toolsDir = path.join(process.cwd(), "src/content/tools")
  const files = fs.readdirSync(toolsDir)
  
  const tools = files.map((file) => {
    const filePath = path.join(toolsDir, file)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data } = matter(fileContents)
    return {
      ...data,
      slug: file.replace(/\.md$/, ""),
    } as Tool
  })

  return tools
}

export default async function ToolsPage() {
  const tools = await getTools()
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
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  )
}

export const revalidate = false // static 