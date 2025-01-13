import { ReactNode } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TabFilterProps<T> {
  items: T[]
  categories: string[]
  defaultCategory?: string
  renderItem: (item: T) => ReactNode
  filterItem: (item: T, category: string) => boolean
  gridClassName?: string
}

export function TabFilter<T>({
  items,
  categories,
  defaultCategory = "All",
  renderItem,
  filterItem,
  gridClassName = "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
}: TabFilterProps<T>) {
  return (
    <div className="relative mt-8">
      <Tabs defaultValue={defaultCategory} className="flex flex-col">
        <div className="sticky top-14 z-10 -mx-2 px-2 md:mx-0 md:px-0">
          <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-4 rounded-xl">
            <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent min-h-fit h-auto py-2">
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
          </div>
        </div>

        <div className="mt-4">
          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className={gridClassName}>
                {category === defaultCategory
                  ? items.map((item, index) => (
                      <div key={index}>{renderItem(item)}</div>
                    ))
                  : items
                      .filter((item) => filterItem(item, category))
                      .map((item, index) => (
                        <div key={index}>{renderItem(item)}</div>
                      ))}
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  )
} 