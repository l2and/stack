import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Tool, Process } from "@/types"

function getTools(): Tool[] {
  const toolsPath = path.join(process.cwd(), "src/data/tools.json")
  const toolsData = JSON.parse(fs.readFileSync(toolsPath, "utf8"))
  return toolsData.tools
}

function getProcesses(): Process[] {
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