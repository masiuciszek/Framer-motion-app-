import Link from "next/link"

import HighlightWrapper from "@/components/common/highlighter"

export default async function Home() {
	return (
		<div className="flex flex-1 items-center">
			<div className="flex flex-col">
				<h1>Hi and welcome!</h1>
				<p>
					My name is <strong>Marcell Ciszek Druzynski</strong> and I&apos;m a
					software developer from Gotheburg Sweden.
				</p>

				<p>Here where I write about what is closest to my heart in tech.</p>
				<p>
					topics like <HighlightWrapper>React</HighlightWrapper>,{" "}
					<HighlightWrapper>TypeScript/Javascript</HighlightWrapper> and other
					software development topics.
				</p>
				<aside className="flex items-center gap-5 pt-5">
					<Link href="/blog">Blog</Link>
					<Link href="/blog">About</Link>
				</aside>
			</div>
		</div>
	)
}