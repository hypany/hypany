import RandomIdeasClient, {
	type IdeaItem,
} from "@/components/molecules/landing/random-ideas-client";
import allIdeas from "@/data/ideas.json";
import { unstable_noStore as noStore } from "next/cache";

type RawIdea = {
	user?: string;
	product?: string;
	engineering?: string | string[];
	legal?: string | string[];
	hypany?: string; // backward compat
};

function normalizeIdea(x: RawIdea): IdeaItem | null {
	if (!x) return null;
	const user = x.user ?? "";
	const product = x.product ?? x.hypany ?? "";
	const engineering = Array.isArray(x.engineering)
		? x.engineering
		: x.engineering
			? [x.engineering]
			: [];
	const legal = Array.isArray(x.legal) ? x.legal : x.legal ? [x.legal] : [];
	if (!user) return null;
	return { user, product, engineering, legal };
}

function sampleN<T>(arr: T[], count: number): T[] {
	const n = arr.length;
	if (n <= count) return arr.slice();
	const picked = new Set<number>();
	while (picked.size < count) {
		const idx = Math.floor(Math.random() * n);
		picked.add(idx);
	}
	return Array.from(picked).map((i) => arr[i]);
}

export default async function RandomIdeasSection() {
	noStore(); // make this server-rendered per request
	const normalized = (allIdeas as RawIdea[])
		.map(normalizeIdea)
		.filter((x): x is IdeaItem => !!x);
	const selected = sampleN(normalized, 5);

	return (
		<section
			aria-labelledby="ideas-table"
			className="relative mx-auto w-full max-w-6xl"
		>
			<h2 className="relative text-lg font-semibold tracking-tight text-orange-500">
				Hypany AI
				<span className="absolute top-1 -left-[8px] h-5 w-[3px] rounded-r-sm bg-orange-500" />
			</h2>
			<p className="mt-2 max-w-3xl text-3xl font-semibold tracking-tighter text-balance text-gray-900 md:text-4xl">
				Hypany augments your idea to actionable startup plans
			</p>

			<RandomIdeasClient items={selected} />
		</section>
	);
}
