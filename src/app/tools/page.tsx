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
    <div className="container py-6 md:py-12">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold tracking-tighter">My Tools</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A curated collection of tools I use daily for productivity, development, and more.
        </p>
      </div>

      <Tabs defaultValue="All" className="mt-8">
        <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="rounded-full bg-muted px-4 py-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-16 sm:mt-20">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category === "All"
                ? tools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)
                : tools
                    .filter((tool) => tool.category === category)
                    .map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export const revalidate = false // static 