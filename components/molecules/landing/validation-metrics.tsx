"use client";

import { LineChart } from "@/components/atoms/line-chart";

const data = [
	{ month: "Jan", "Ideas Tested": 12, "Validated": 1, "Sign-ups": 342 },
	{ month: "Feb", "Ideas Tested": 18, "Validated": 2, "Sign-ups": 523 },
	{ month: "Mar", "Ideas Tested": 24, "Validated": 2, "Sign-ups": 687 },
	{ month: "Apr", "Ideas Tested": 31, "Validated": 3, "Sign-ups": 892 },
	{ month: "May", "Ideas Tested": 42, "Validated": 5, "Sign-ups": 1243 },
	{ month: "Jun", "Ideas Tested": 56, "Validated": 7, "Sign-ups": 1876 },
	{ month: "Jul", "Ideas Tested": 68, "Validated": 8, "Sign-ups": 2234 },
	{ month: "Aug", "Ideas Tested": 82, "Validated": 11, "Sign-ups": 3102 },
	{ month: "Sep", "Ideas Tested": 97, "Validated": 14, "Sign-ups": 4231 },
];

export function ValidationMetrics() {
	return (
		<section
			aria-labelledby="validation-metrics"
			className="relative mx-auto w-full max-w-6xl px-4 xl:px-0"
		>
			<div className="rounded-2xl bg-white p-8 ring-1 ring-gray-200 shadow-sm">
				<h2
					id="validation-metrics"
					className="text-2xl font-semibold tracking-tight text-gray-900"
				>
					The 97th Idea Effect
				</h2>
				<p className="mt-2 text-gray-600">
					Most successful founders test 90+ ideas before finding product-market fit
				</p>
				<div className="mt-8">
					<LineChart
						data={data}
						index="month"
						categories={["Ideas Tested", "Validated", "Sign-ups"]}
						colors={["gray", "orange", "emerald"]}
						valueFormatter={(value) => value.toLocaleString()}
						showLegend={true}
						showYAxis={true}
						className="h-80"
					/>
				</div>
				<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
					<div>
						<p className="text-sm font-medium text-gray-500">Average Ideas Tested</p>
						<p className="mt-1 text-3xl font-semibold text-gray-900">97</p>
						<p className="mt-1 text-sm text-gray-600">Before finding PMF</p>
					</div>
					<div>
						<p className="text-sm font-medium text-gray-500">Success Rate</p>
						<p className="mt-1 text-3xl font-semibold text-orange-500">14.4%</p>
						<p className="mt-1 text-sm text-gray-600">Of ideas get validated</p>
					</div>
					<div>
						<p className="text-sm font-medium text-gray-500">Avg. Sign-ups</p>
						<p className="mt-1 text-3xl font-semibold text-emerald-500">302</p>
						<p className="mt-1 text-sm text-gray-600">Per validated idea</p>
					</div>
				</div>
			</div>
		</section>
	);
}