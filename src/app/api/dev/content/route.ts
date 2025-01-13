import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Tool } from "@/types"

interface Process {
  title: string
  category: string
  description: string
  slug: string
}

function getTools() {
  const toolsDir = path.join(process.cwd(), "src/content/tools")
  const files = fs.readdirSync(toolsDir)
  
  return files.map((file) => {
    const fileContents = fs.readFileSync(path.join(toolsDir, file), "utf8")
    const { data } = matter(fileContents)
    return {
      ...data,
      slug: file.replace(/\.md$/, ""),
    } as Tool
  })
}

function getProcesses() {
  const processesDir = path.join(process.cwd(), "src/content/processes")
  const files = fs.readdirSync(processesDir)
  
  return files.map((file) => {
    const fileContents = fs.readFileSync(path.join(processesDir, file), "utf8")
    const { data } = matter(fileContents)
    return {
      ...data,
      slug: file.replace(/\.md$/, ""),
    } as Process
  })
}

export async function GET() {
  const tools = getTools()
  const processes = getProcesses()

  return NextResponse.json({ tools, processes })
} 