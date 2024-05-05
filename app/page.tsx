import { cn } from "@/lib/utils"
import { ReactNode } from "react"

export default function Home() {
  const GridComponent = ({children, className}: {children: ReactNode, className: string}) => {
    return (
      <div className={cn("flex flex-col border items-center justify-center", className)}>
        {children}
      </div>
    )
  }
  return (
    <div className="min-h-screen flex  justify-center">
      <div className="grid md:w-[800px] md:auto-rows-[10rem] grid-cols-1 md:grid-cols-2 ">
        <GridComponent className="col-span-1 md:col-span-2">
          <h1 className="text-xl text-accent">contentio</h1>
          <p>add content to your next application</p>
        </GridComponent>
        <GridComponent className="col-span-1">
          hey
        </GridComponent>
        <GridComponent className="col-span-1">
          I'm Henri
        </GridComponent>
        <GridComponent className="col-span-1">
          hey
        </GridComponent>
        <GridComponent className="col-span-1">
          I'm Henri
        </GridComponent>
      </div>
    </div>
  )
}