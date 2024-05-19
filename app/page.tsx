import Link from "@/components/ui/link";
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

export default function Home() {
  return (
    <div className="bg-[#151515] min-h-screen text-white flex items-start justify-center">
      <div className="w-[700px] pt-20">
        <div className="flex m-2">
          <Link href="/" className="mr-2">
            home
          </Link>
          <Link className="mr-2" href="/docs">
            docs
          </Link>
          <Link href="https://git.new/contentio">
            github
          </Link>

        </div>
        <hr className="bg-gradient-to-r z-10 from-[#a4a4a4] to-[#151515] border-0 h-[2px] w-[80%]" />
        <div className="flex">
          <hr className="h-44 relative bottom-14 z-0  w-[2px] bg-gradient-to-t from-[#151515] border-0 via-white to-[#151515]" />
          <h1 className="text-6xl relative top-2 ml-2  font-medium">Contentio</h1>
        </div>
        <hr className="relative bottom-24 z-10 ml-[2px]  bg-gradient-to-r from-[#a4a4a4] to-[#151515] border-0 h-[2px] w-[80%]" />
        <p className="relative ml-2 bottom-[88px]">
          Contentio is a modern cli for adding content as mdx to your nextjs app. We add the code to your app, you can edit all of the file and customize it.
        </p>
      </div>
    </div>
  )
}
const mdxComponents = {
  h2: (props: any) => {
    return (
      <h2 {...props}>
        {props.children}
      </h2>
    );
  },
  a: (props: any) => {
    const p = {
      ...(props.href.startsWith("http") && {
        target: "_blank",
        rel: "noopener noreferrer",
      }),
    };
    return <a {...props} {...p} />;
  },
};