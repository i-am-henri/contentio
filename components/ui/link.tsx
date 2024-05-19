
import { cn } from "@/lib/utils";
import NextLink from "next/link"
interface Props extends React.RefAttributes<HTMLAnchorElement> {
    href: string,
    children: React.ReactNode,
    className?: string
}
export default function Link({
    children,
    className,
    ...props
    
}: Props) {
    return (
      <NextLink  {...props} target="_blank" className={cn("relative after:absolute after:bg-neutral-400 after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300", className)}>
        <span className="text-neutral-400">{children}</span>
      </NextLink>
    );
  }