import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Process } from "@/types"
import { ProcessCard } from "@/components/ui/process-card"
import { TabFilter } from "@/components/ui/tab-filter"

async function getProcesses() {
  const processesDir = path.join(process.cwd(), "src/content/processes")
  const files = fs.readdirSync(processesDir)

  return files.map((filename) => {
    const filePath = path.join(processesDir, filename)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data } = matter(fileContents)
    return {
      ...data,
      slug: filename.replace(/\.md$/, ""),
    } as Process
  })
}

export default async function ProcessesPage() {
  const processes = await getProcesses()
  const categories = ["All", "Personal", "Professional", "Development", "Content", "Other"]

  return (
    <div className="container py-6 md:py-12">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold tracking-tighter">My Processes</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A collection of workflows and methods I use to stay productive and organized.
        </p>
      </div>

      <TabFilter
        items={processes}
        categories={categories}
        renderItem={(process) => <ProcessCard {...process} />}
        filterItem={(process, category) => process.category === category}
      />
    </div>
  )
}

export const revalidate = false // static 