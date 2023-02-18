import Link from "next/link"
import {ReactNode} from "react"

import HighlightWrapper from "@/components/common/highlighter"
import PageWrapper from "@/components/page_wrapper"

interface Props {
	children: ReactNode
}

export default function MarketingLayout({children}: Props) {
	return (
		<>
			<header className="sticky top-0 mb-10 bg-white dark:bg-black dark:text-white">
				<div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-5">
					<Link href="/">
						<strong>M.C.D</strong>
					</Link>
					<nav className="">
						<ul className="flex gap-3">
							<li>
								<Link href="/blog">Blog</Link>
							</li>
							<li>
								<Link href="/about">About</Link>
							</li>
						</ul>
					</nav>
				</div>
			</header>
			<PageWrapper>{children}</PageWrapper>
			<footer className="sticky bottom-0 bg-white dark:bg-black dark:text-white">
				<div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-5">
					<small>
						Made by Marcell Ciszek Druzynski built with{" "}
						<HighlightWrapper>Next js</HighlightWrapper>, Typeset{" "}
						<HighlightWrapper>Inter</HighlightWrapper>. Deployed on{" "}
						<HighlightWrapper>Vercel</HighlightWrapper>{" "}
					</small>
				</div>
			</footer>
		</>
	)
}