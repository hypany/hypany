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
						<Button asChild className="text-md">
							<Link href="#">Start Testing Free</Link>
						</Button>
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
