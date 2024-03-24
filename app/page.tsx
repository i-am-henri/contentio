import Img from "next/image"
import Screenshot from "@/public/scrnsht.webp"
export default function Home() {
  return (
    <div>
      <section className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl text-center mt-[20vh]">
          Add content to<br />your next-app
        </h1>
        <p>
          npx next-content
        </p>
        <Img className="rounded-[20px] border-4 border-[#ffffff1f] ring-[1px] ring-white " src={Screenshot} width={500} height={500} alt="a screenshot" />
      </section>
    </div>
  )
}