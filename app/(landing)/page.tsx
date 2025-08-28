import { CallToAction } from "@/components/molecules/landing/call-to-action";
import FeatureDivider from "@/components/molecules/landing/feature-divider";
import Features from "@/components/molecules/landing/features";
import { Hero } from "@/components/molecules/landing/hero";
import { SolarAnalytics } from "@/components/molecules/landing/solar-analytics";
import { ValidationMetrics } from "@/components/molecules/landing/validation-metrics";
import { AlumniNetwork } from "@/components/molecules/landing/alumni-network";

export default function Home() {
	return (
		<main className="relative mx-auto flex flex-col">
			<div className="pt-56">
				<Hero />
			</div>
			<div className="mt-52 px-4 xl:px-0">
				<Features />
			</div>
			<div className="mt-32">
				<ValidationMetrics />
			</div>
			<FeatureDivider className="my-16 max-w-6xl" />
			<div className="mt-12 mb-20 px-4 xl:px-0">
				<SolarAnalytics />
			</div>
			<div className="mt-20 mb-20">
				<AlumniNetwork />
			</div>
			<div className="mt-10 mb-40 px-4 xl:px-0">
				<CallToAction />
			</div>
		</main>
	);
}
