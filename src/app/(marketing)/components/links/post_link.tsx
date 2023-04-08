import Link from "next/link"
import {ReactNode} from "react"

import {cn} from "@/lib/styles"

import LinkContent from "./link_content"

interface Props {
	url: string
	className?: string
	children?: ReactNode
	title?: string
	LinkClassName?: string
	arrow: "left" | "right"
}

export default function PostLink({
	url,
	className,
	children,
	title,
	LinkClassName,
	arrow,
}: Props) {
	return (
		<Link
			href={url}
			className={cn(
				"text-slate-500 transition-all hover:text-blue-600 ",
				className
			)}
		>
			{children || (
				<LinkContent title={title} className={LinkClassName} arrow={arrow} />
			)}
		</Link>
	)
}