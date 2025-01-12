import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Process } from "@/types"
import { ProcessCard } from "@/components/ui/process-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
                ? processes.map((process) => <ProcessCard key={process.slug} {...process} />)
                : processes
                    .filter((process) => process.category === category)
                    .map((process) => <ProcessCard key={process.slug} {...process} />)}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export const revalidate = false // static 