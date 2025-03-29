"use client"

import { useEffect, useState } from "react"
import { TabFilter } from "@/components/ui/tab-filter"

interface Process {
  title: string
  category: string
  description: string
  slug: string
}

export default function ProcessesPage() {
  const [processes, setProcesses] = useState<Process[]>([])

  useEffect(() => {
    fetch('/api/dev/content')
      .then(res => res.json())
      .then(data => {
        setProcesses(data.processes)
      })
  }, [])

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Processes</h1>
          <p className="text-lg text-muted-foreground">My systematic approaches to common tasks and workflows.</p>
        </div>
        <TabFilter items={processes} type="process" />
      </div>
    </main>
  )
} 