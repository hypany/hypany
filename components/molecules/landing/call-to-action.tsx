import { Button } from "@/components/atoms/button";
import Link from "next/link";

export function CallToAction() {
	return (
		<section aria-labelledby="cta-title" className="mx-auto max-w-6xl">
			<div className="flex flex-col items-center justify-center gap-8 text-center">
				<div className="sm:col-span-2">
					<h2
						id="cta-title"
						className="scroll-my-60 text-3xl font-semibold tracking-tighter text-balance text-gray-900 md:text-4xl"
					>
						Want to collect ready-to-pay users?
					</h2>
					<p className="mt-3 mb-8 text-lg text-gray-600">
						Join thousands of entrepreneurs who've validated their ideas before
						spending months building.
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<Link
							className="inline-flex cursor-pointer flex-row items-center justify-center gap-1 rounded-md border-b-[1.5px] border-orange-700 bg-linear-to-b from-orange-400 to-orange-500 px-5 py-3 leading-4 font-medium tracking-wide whitespace-nowrap text-white shadow-[0_0_0_2px_rgba(0,0,0,0.04),0_0_14px_0_rgba(255,255,255,0.19)] transition-all duration-200 ease-in-out hover:shadow-orange-300"
							href="/sign-in"
						>
							Start Testing Ideas
						</Link>
						<Button asChild className="text-md" variant="secondary">
							<Link href="#">View Success Stories</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default CallToAction;
