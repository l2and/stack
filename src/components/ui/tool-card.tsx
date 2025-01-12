import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GlowCard } from "@/components/ui/glow-card"
import { Tool } from "@/types"

interface ToolCardProps {
  tool: Tool
  showContent?: boolean
}

export function ToolCard({ tool, showContent = false }: ToolCardProps) {
  return (
    <GlowCard>
      <Card className="h-full flex flex-col transition-colors hover:bg-muted/50">
        <CardHeader className="space-y-4">
          <div className="flex justify-between items-start">
            <CardTitle className="text-2xl font-bold">
              <Link 
                href={`/tools/${tool.slug}`}
                className="hover:text-primary transition-colors"
              >
                {tool.title}
              </Link>
            </CardTitle>
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
          {tool.url && (
            <div className="mt-2">
              <a 
                href={tool.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {tool.url} ↗
              </a>
            </div>
          )}
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
    </GlowCard>
  )
} 