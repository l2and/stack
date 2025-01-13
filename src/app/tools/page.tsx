"use client"

import { useEffect, useState } from "react"
import { TabFilter } from "@/components/ui/tab-filter"
import { Tool } from "@/types"

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([])

  useEffect(() => {
    fetch('/api/dev/content')
      .then(res => res.json())
      .then(data => {
        setTools(data.tools)
      })
  }, [])

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Tools</h1>
        <TabFilter items={tools} type="tool" />
      </div>
    </main>
  )
} 