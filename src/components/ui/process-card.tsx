"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GlowCard } from "@/components/ui/glow-card"
import { Process } from "@/types"

interface ProcessCardProps {
  title: string
  slug: string
  description: string
  toolsInvolved: string[]
  steps: string[]
  notes?: string
  category: Process["category"]
  showContent?: boolean
}

export function ProcessCard({
  title,
  slug,
  description,
  toolsInvolved,
  steps,
  notes,
  category,
  showContent = false,
}: ProcessCardProps) {
  const content = (
    <Card className="h-full min-h-[300px] transition-colors group-hover:bg-muted/50">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-bold transition-colors group-hover:text-emerald-400">
            {title}
          </CardTitle>
          <Badge variant="outline" className="ml-2 shrink-0">
            {category}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          {toolsInvolved.slice(0, showContent ? undefined : 3).map((tool) => (
            <Badge key={tool} variant="secondary" className="text-xs">
              {tool}
            </Badge>
          ))}
          {!showContent && toolsInvolved.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{toolsInvolved.length - 3} more
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground">{description}</p>
        {showContent && (
          <>
            <div className="space-y-2">
              <h3 className="font-semibold">Key Steps</h3>
              <ol className="list-decimal list-inside text-sm text-muted-foreground">
                {steps.map((step, index) => (
                  <li key={index} className="mb-1">{step}</li>
                ))}
              </ol>
            </div>
            {notes && (
              <div className="space-y-2">
                <h3 className="font-semibold">Notes</h3>
                <div className="text-sm text-muted-foreground">
                  {notes}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )

  if (showContent) {
    return <GlowCard>{content}</GlowCard>
  }

  return (
    <div className="group relative">
      <Link href={`/processes/${slug}`}>
        <GlowCard>{content}</GlowCard>
      </Link>
    </div>
  )
} 