export function AlumniNetwork() {
	return (
		<section
			id="alumni"
			aria-labelledby="alumni-title"
			className="relative mx-auto w-full max-w-6xl px-4 xl:px-0"
		>
			<div className="text-center">
				<h2
					id="alumni-title"
					className="text-3xl font-semibold tracking-tighter text-gray-900 md:text-4xl"
				>
					Free Forever, Pay It Forward
				</h2>
				<p className="mt-4 mx-auto max-w-2xl text-lg text-gray-600">
					Hypany is completely free. We only ask that successful alumni help the next generation
					of founders validate their ideas faster.
				</p>
			</div>

			<div className="mt-12 grid gap-8 md:grid-cols-3">
				<div className="text-center">
					<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
						<span className="text-2xl">🎯</span>
					</div>
					<h3 className="mt-4 text-lg font-semibold text-gray-900">Test Ideas Free</h3>
					<p className="mt-2 text-gray-600">
						No credit card, no trial period. Use all features to validate unlimited ideas.
					</p>
				</div>

				<div className="text-center">
					<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
						<span className="text-2xl">🤝</span>
					</div>
					<h3 className="mt-4 text-lg font-semibold text-gray-900">Join Alumni Network</h3>
					<p className="mt-2 text-gray-600">
						Connect with founders who've validated ideas and launched successful startups.
					</p>
				</div>

				<div className="text-center">
					<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
						<span className="text-2xl">💡</span>
					</div>
					<h3 className="mt-4 text-lg font-semibold text-gray-900">Give Back</h3>
					<p className="mt-2 text-gray-600">
						Share your learnings, mentor new founders, and help others avoid your mistakes.
					</p>
				</div>
			</div>

			<div className="mt-16 rounded-2xl bg-gray-50 p-8">
				<div className="flex flex-col items-center text-center">
					<img
						src="https://github.com/anaclumos.png"
						alt="Sunghyun Cho"
						className="h-20 w-20 rounded-full"
					/>
					<p className="mt-6 text-lg italic text-gray-700">
						"I built this because I wasted 2 years building products nobody wanted. 
						After testing 100+ ideas and finally finding one that worked, I realized 
						the process itself was the product. Every founder should test 100 ideas 
						before committing to one."
					</p>
					<p className="mt-4 font-semibold text-gray-900">Sunghyun Cho</p>
					<p className="text-sm text-gray-600">Creator of Hypany</p>
				</div>
			</div>
		</section>
	);
}