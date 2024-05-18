import { Copy as CopyIcon } from 'lucide-react'
import Copy from "@/components/editor/Copy"
import { codeToHtml } from 'shiki'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
export default async function Viewer({ code, language = "typescript" }: { code: string, language: string }) {
    const html = await codeToHtml(code, {
        lang: language,
        theme: "vesper"
    })

    return (
        <div className='border docs my-1 border-black rounded-md p-2 bg-[#101010] flex' >
            <div dangerouslySetInnerHTML={{ __html: html }} className='w-full'></div>
            <div className='w-5 h-full ml-5'>
                <Copy text={code}>
                    <Tooltip>
                        <TooltipTrigger>
                            <CopyIcon className='h-4 mt-1  cursor-pointer w-4' />
                        </TooltipTrigger>
                        <TooltipContent>
                            copy to clipboard
                        </TooltipContent>
                    </Tooltip>
                </Copy>
            </div>
        </div>
    )
}