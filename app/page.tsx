import Link from "@/components/ui/link";
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

export default function Home() {
  return (
    <>
      <div className="flex m-2">
        <Link href="/" className="mr-2">
          home
        </Link>
        <Link className="mr-2" href="/docs">
          docs
        </Link>
        <Link href="https://git.new/contentio" target="blank">
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
      <div className="flex ml-2 space-y-16 flex-col">
        <div>
          <h2 className="text-xl mb-2">Free to use</h2>
          <p className="text-[#d0d0d0]">We are free for everyone. In addition, we are open source. You can view, edit and create new code to help to make our platform better. </p>
        </div>
        <div>
          <h2 className="text-xl mb-2">Works with nextjs</h2>
          <p className="text-[#d0d0d0]">Our platform is designed for <Link href="https://nextjs.org">nextjs</Link>, the framework from vercel. This means, we optimized the code for dynamic rendering, and static rendering.</p>
        </div>
        <div>
          <h2 className="text-xl mb-2">Code in your app, not in the node_modules</h2>
          <p className="text-[#d0d0d0]">We are not a traditional npm-package. The cli will add the code in a folder, which you can decide. This is inspired by the <Link href="https://ui.shadcn.com">shadcn ui</Link>. This means, you can edit the code, without any problems. It makes also easier to add extensions from other people or companys. </p>
        </div>
        <div>
          <h2 className="text-xl mb-2">Modern styling</h2>
          <p className="text-[#d0d0d0]">The cli provides a function a to add prebuilt ui elements which are optimized for docs. This is working like the shadcn-ui components. In-Fact, some of the components required to use shadcn components. You can customize all of the components, and the color, border-radius and so on is based on custom preferenzes, which are defined in your global css file.</p>
        </div>
        <div className="text-[#d0d0d0] pb-4">
          <hr className="mb-4 border-[#d0d0d0]" />
          made by <Link href="https://henri.gg">henri</Link> and the <Link href="https://git.new/contentio">community on github</Link>.
        </div>
      </div>
    </>
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