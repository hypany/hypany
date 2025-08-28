import {
	RiEditBoxFill,
	RiMailSendFill,
	RiLineChartFill,
	RiTestTubeFill,
} from "@remixicon/react";
import AnalyticsIllustration from "./analytics-illustration";
import { Divider } from "@/components/atoms/divider";
import { StickerCard } from "./sticker-card";

export function SolarAnalytics() {
	return (
		<section
			aria-labelledby="solar-analytics"
			className="relative mx-auto w-full max-w-6xl overflow-hidden"
		>
			<div>
				<h2
					id="solar-analytics"
					className="relative scroll-my-24 text-lg font-semibold tracking-tight text-orange-500"
				>
					Powerful Features
					<div className="absolute top-1 -left-[8px] h-5 w-[3px] rounded-r-sm bg-orange-500" />
				</h2>
				<p className="mt-2 max-w-lg text-3xl font-semibold tracking-tighter text-balance text-gray-900 md:text-4xl">
					Everything you need to validate ideas and launch with confidence
				</p>
			</div>
			<div className="*:pointer-events-none">
				<AnalyticsIllustration />
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
