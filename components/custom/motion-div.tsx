"use client"
import {motion} from "framer-motion"
interface Props {
    children: React.ReactNode,
    className?: string,
    layoutId?: string
}
export default function MotionDiv(props: Props) {
    return (
        <motion.div layoutId={props.layoutId} className={props.className}>
            {props.children}
        </motion.div>
    )
}