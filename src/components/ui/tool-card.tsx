"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GlowCard } from "@/components/ui/glow-card"
import { ToolLogo } from "@/components/ui/tool-logo"
import { ExternalLink } from "@/components/ui/external-link"
import { Tool } from "@/types"

interface ToolCardProps {
  tool: Tool
  showContent?: boolean
}

const getToolLogo = (slug: string): string => {
  const logoMap: { [key: string]: string } = {
    'chatgpt': 'openai',
    'notion': 'notion',
    'apple-notes': 'apple',
    'telegram': 'telegram',
    'x-twitter': 'x',
    'google-calendar': 'google-calendar',
    'microsoft-todo': 'microsoft',
    'canva': 'canva',
    'perplexity': 'perplexity',
    'google': 'google',
    'linear': 'linear',
    'cursor': 'cursor',
    'super-so': 'super-so',
  }

  return `/images/tools/${logoMap[slug] || slug}.svg`
}

export function ToolCard({ tool, showContent = false }: ToolCardProps) {
  return (
    <div className="group">
      <GlowCard>
        <Link href={`/tools/${tool.slug}`} className="block">
          <Card className="h-full flex flex-col transition-colors group-hover:bg-muted/50">
            <CardHeader className="space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-3">
                  <ToolLogo
                    src={getToolLogo(tool.slug)}
                    alt={`${tool.title} logo`}
                  />
                  <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {tool.title}
                  </CardTitle>
                </div>
                <Badge
                  variant={
                    tool.status === "Currently Using"
                      ? "default"
                      : tool.status === "Plan to Try"
                      ? "secondary"
                      : tool.status === "Actively Maintained"
                      ? "gold"
                      : tool.status === "Plan to Build"
                      ? "monochrome"
                      : "destructive"
                  }
                  className={
                    tool.status === "Actively Maintained"
                      ? "bg-amber-500 hover:bg-amber-600 animate-pulse shadow-lg shadow-amber-200/50 dark:shadow-amber-900/50"
                      : ""
                  }
                >
                  {tool.status}
                </Badge>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline">{tool.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground mb-4">{tool.description}</p>
              {showContent && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="font-semibold">How to Use</h3>
                    <div className="text-sm text-muted-foreground whitespace-pre-line">
                      {tool.howToUse}
                    </div>
                  </div>
                  {tool.caveats && (
                    <div className="space-y-2">
                      <h3 className="font-semibold">Caveats</h3>
                      <div className="text-sm text-muted-foreground whitespace-pre-line">
                        {tool.caveats}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </Link>
      </GlowCard>
      {tool.url && (
        <div className="mt-2 px-6">
          <ExternalLink 
            href={tool.url}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {tool.url} ↗
          </ExternalLink>
        </div>
      )}
    </div>
  )
} 