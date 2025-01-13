"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Tool } from "@/types"

interface Process {
  title: string
  category: string
  description: string
  slug: string
}

export default function DevPage() {
  const [tools, setTools] = useState<Tool[]>([])
  const [processes, setProcesses] = useState<Process[]>([])
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({})

  // Load data and checked state on mount
  useEffect(() => {
    // Load checked state from localStorage
    const savedState = localStorage.getItem('devPageCheckedItems')
    if (savedState) {
      setCheckedItems(JSON.parse(savedState))
    }

    // Fetch tools and processes
    fetch('/api/dev/content')
      .then(res => res.json())
      .then(data => {
        setTools(data.tools)
        setProcesses(data.processes)
      })
  }, [])

  // Save to localStorage whenever checked state changes
  useEffect(() => {
    localStorage.setItem('devPageCheckedItems', JSON.stringify(checkedItems))
  }, [checkedItems])

  const handleCheckChange = (id: string, checked: boolean) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: checked
    }))
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Development Tasks</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Tools to Update</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tools.map((tool) => (
                <div key={tool.slug} className="flex items-center space-x-4">
                  <Checkbox 
                    id={`tool-${tool.slug}`}
                    checked={checkedItems[`tool-${tool.slug}`] || false}
                    onCheckedChange={(checked) => 
                      handleCheckChange(`tool-${tool.slug}`, checked as boolean)
                    }
                  />
                  <label 
                    htmlFor={`tool-${tool.slug}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <Link 
                      href={`/tools/${tool.slug}`}
                      className="hover:underline text-blue-500"
                    >
                      {tool.title}
                    </Link>
                    <span className="ml-2 text-muted-foreground">
                      ({tool.category})
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Processes to Update</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {processes.map((process) => (
                <div key={process.slug} className="flex items-center space-x-4">
                  <Checkbox 
                    id={`process-${process.slug}`}
                    checked={checkedItems[`process-${process.slug}`] || false}
                    onCheckedChange={(checked) => 
                      handleCheckChange(`process-${process.slug}`, checked as boolean)
                    }
                  />
                  <label 
                    htmlFor={`process-${process.slug}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <Link 
                      href={`/processes/${process.slug}`}
                      className="hover:underline text-blue-500"
                    >
                      {process.title}
                    </Link>
                    <span className="ml-2 text-muted-foreground">
                      ({process.category})
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
} 