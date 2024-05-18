"use client"

import { toast } from "sonner";

export default function Copy({text, children}: {text: string, children: React.ReactNode}) {
    return (
        <div onClick={() => {navigator.clipboard.writeText(text); toast("Copied text succesfully to your clipboard.")}}>
            {children}
        </div>
    )
}