import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Process } from "@/types"

function getProcesses() {
  const processesDir = path.join(process.cwd(), "src/content/processes")
  const filenames = fs.readdirSync(processesDir)

  return filenames.map((filename) => {
    const filePath = path.join(processesDir, filename)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data } = matter(fileContents)
    return {
      ...data,
      slug: filename.replace(/\.md$/, ""),
    } as Process
  })
}

export default function ProcessesPage() {
  const processes = getProcesses()
  const categories = ["All", "Personal", "Professional", "Development", "Content", "Other"]

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center gap-4 text-center mb-8">
        <h1 className="text-4xl font-bold">
          My <span className="gradient-text">Processes</span>
        </h1>
        <p className="text-muted-foreground max-w-[42rem]">
          Step-by-step workflows and methods I use to stay organized and efficient.
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
              {processes
                .filter((process) => category === "All" || process.category === category)
                .map((process) => (
                  <Link key={process.slug} href={`/processes/${process.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-xl">{process.title}</CardTitle>
                          <Badge variant="outline">{process.category}</Badge>
                        </div>
                        <CardDescription className="text-sm text-muted-foreground">
                          {process.description}
                        </CardDescription>
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">Tools Used:</h4>
                          <div className="flex flex-wrap gap-2">
                            {process.toolsInvolved.map((tool) => (
                              <Badge key={tool} variant="secondary" className="text-xs">
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        </div>
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