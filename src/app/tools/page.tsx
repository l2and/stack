import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Tool } from "@/types"
import { ToolCard } from "@/components/ui/tool-card"
import { TabFilter } from "@/components/ui/tab-filter"

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

      <TabFilter
        items={tools}
        categories={categories}
        renderItem={(tool) => <ToolCard tool={tool} />}
        filterItem={(tool, category) => tool.category === category}
      />
    </div>
  )
}

export const revalidate = false // static 