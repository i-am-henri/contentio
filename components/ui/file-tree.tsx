"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown, Folder, FileArchive  } from "lucide-react"

import { cn } from "@/lib/utils"

const FileTree = AccordionPrimitive.Root

const FileTreeItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
FileTreeItem.displayName = "AccordionItem"

const FileTreeTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-start font-medium transition-all hover:underline ",
        className
      )}
      {...props}
    >
      <Folder id="folder" className="mr-2 h-4 w-4  "/>
      {children}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
FileTreeTrigger.displayName = AccordionPrimitive.Trigger.displayName

const FileTreeContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden ml-3 text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-1 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

FileTreeContent.displayName = AccordionPrimitive.Content.displayName
const File = ({children}: {children: React.ReactNode}) => {
  return (
    <div
      className={"flex flex-1 items-center justify-start font-medium transition-all hover:underline "}
    >
      <FileArchive id="folder" className="mr-2 h-4 w-4  "/>
      {children}
    </div>
  )
}
export { FileTree, FileTreeItem, FileTreeTrigger, FileTreeContent, File }
