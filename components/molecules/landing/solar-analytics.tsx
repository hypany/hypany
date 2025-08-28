"use client";

import { Divider } from "@/components/atoms/divider";
import { LineChart } from "@/components/atoms/line-chart";
import {
	RiEditBoxFill,
	RiLineChartFill,
	RiMailSendFill,
	RiTestTubeFill,
} from "@remixicon/react";
import { StickerCard } from "./sticker-card";

const data = [
	{ month: "Jan", "Ideas Tested": 12, Validated: 1 },
	{ month: "Feb", "Ideas Tested": 18, Validated: 2 },
	{ month: "Mar", "Ideas Tested": 24, Validated: 2 },
	{ month: "Apr", "Ideas Tested": 31, Validated: 3 },
	{ month: "May", "Ideas Tested": 42, Validated: 5 },
	{ month: "Jun", "Ideas Tested": 56, Validated: 7 },
	{ month: "Jul", "Ideas Tested": 68, Validated: 8 },
	{ month: "Aug", "Ideas Tested": 82, Validated: 11 },
	{ month: "Sep", "Ideas Tested": 97, Validated: 14 },
];

export function SolarAnalytics() {
	return (
		<section
			aria-labelledby="solar-analytics"
			className="relative mx-auto w-full max-w-6xl overflow-hidden"
		>
			<h2
				id="solar-analytics"
				className="relative scroll-my-24 text-lg font-semibold tracking-tight text-orange-500"
			>
				First 96 Ideas will fail
				<div className="absolute top-1 -left-[8px] h-5 w-[3px] rounded-r-sm bg-orange-500" />
			</h2>
			<p className="mt-2 max-w-lg text-3xl font-semibold tracking-tighter text-balance text-gray-900 md:text-4xl">
				It's important to fail fast.
			</p>
			<div className="mt-8">
				<LineChart
					data={data}
					index="month"
					categories={["Ideas Tested", "Validated"]}
					colors={["gray", "orange"]}
					valueFormatter={(value) => value.toLocaleString()}
					showLegend={true}
					showYAxis={true}
					className="h-80"
				/>
			</div>
			<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
				<div>
					<p className="text-sm font-medium text-gray-500">
						Average Ideas Tested
					</p>
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
			<Divider className="mt-0"></Divider>
			<div className="grid grid-cols-1 grid-rows-2 gap-6 md:grid-cols-4 md:grid-rows-1">
				<StickerCard
					Icon={RiEditBoxFill}
					title="WYSIWYG Editor"
					description="Create stunning landing pages without coding. Drag, drop, and customize."
				/>
				<StickerCard
					Icon={RiTestTubeFill}
					title="A/B Testing"
					description="Test different versions to find what converts best with your audience."
				/>
				<StickerCard
					Icon={RiMailSendFill}
					title="Email Campaigns"
					description="Nurture waitlist users with automated email sequences and updates."
				/>
				<StickerCard
					Icon={RiLineChartFill}
					title="Real-time Analytics"
					description="Track visitor behavior, conversion rates, and engagement metrics instantly."
				/>
			</div>
		</section>
	);
}
