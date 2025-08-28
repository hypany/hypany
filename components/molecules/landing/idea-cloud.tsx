"use client";

import ideasData from "@/data/ideas.json";
import React from "react";

type Position = {
	left: string; // percent string with rounding
	top: string; // percent string with rounding
	z: number; // zIndex base, later bubbles higher
	scale: string; // bubble size factor string
	rotate: string; // degrees rotation string
};

// removed: old text idea generator; we now consume curated ideas from JSON

// Helpers for deterministic hashing and formatting (SSR-safe)
function fnv1a32(str: string): number {
	let h = 0x811c9dc5;
	for (let i = 0; i < str.length; i++) {
		h ^= str.charCodeAt(i);
		// 32-bit FNV-1a prime 16777619
		h = (h + (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)) >>> 0;
	}
	return h >>> 0;
}

function hashFloat(str: string, salt: string): number {
	const n = fnv1a32(`${str}|${salt}`);
	return (n >>> 0) / 4294967295; // [0,1]
}

function clamp(n: number, min: number, max: number) {
	return Math.max(min, Math.min(max, n));
}

function fmt(n: number, d = 3): string {
	return n
		.toFixed(d)
		.replace(/\.0+$/, "")
		.replace(/(\.[0-9]*?)0+$/, "$1");
}

function positionFromText(text: string, index: number): Position {
	// Angle (radians) and radius using deterministic hashes
	const u1 = hashFloat(text, "angle");
	const u2 = Math.max(1e-6, hashFloat(text, "radius"));
	const angle = 2 * Math.PI * u1; // radians
	// Rayleigh-distributed radius for cloud-like density (center-heavy)
	const R = Math.sqrt(-2 * Math.log(u2)); // [0, inf)
	const rNorm = Math.min(1, R / 2.5); // cap at ~2.5 sigma
	// Elliptical spread – bigger cloud
	const maxX = 60; // percent radius horizontally
	const maxY = 44; // percent radius vertically
	const cx = clamp(50 + rNorm * maxX * Math.cos(angle), 2, 98);
	const cy = clamp(50 + rNorm * maxY * Math.sin(angle), 2, 98);
	// Size, depth, and rotation from hashes
	const s = hashFloat(text, "scale");
	const scaleNum = 0.95 + s * 0.9; // 0.95..1.85
	const rotNum = hashFloat(text, "rot") * 6 - 3; // -3..3 deg
	// Ensure newer ideas stack on top
	const z = 1000 + index; // strictly increasing with appearance order

	return {
		left: `${fmt(cx, 3)}%`,
		top: `${fmt(cy, 3)}%`,
		z,
		scale: fmt(scaleNum, 3),
		rotate: fmt(rotNum, 2),
	};
}

function ChatBubble({
	text,
	pos,
	visible,
	delayMs,
}: {
	text: string;
	pos: Position;
	visible: boolean;
	delayMs: number;
}) {
	return (
		<div
			className="absolute max-w-[300px] select-none"
			style={{
				left: pos.left,
				top: pos.top,
				zIndex: pos.z,
				transform: `translate(-50%, -50%) scale(${pos.scale}) rotate(${pos.rotate}deg)`,
				opacity: visible ? 1 : 0,
				transition: `opacity 420ms ease-out ${delayMs}ms, transform 420ms ease-out ${delayMs}ms`,
			}}
		>
			<div className="relative rounded-2xl border border-gray-200 bg-white/90 px-3 py-2 text-sm text-gray-800 shadow-md backdrop-blur">
				{text}
				{/* Tail */}
				<div className="absolute -bottom-1 left-6 h-3 w-3 rotate-45 border-b border-r border-gray-200 bg-white/90" />
			</div>
		</div>
	);
}

export function IdeaCloud() {
	const baseIdeas = ideasData.map((idea) => idea.user);
	const ideas = React.useMemo(() => {
		const arr = baseIdeas.slice();
		if (arr.length > 0) {
			arr[arr.length - 1] =
				"What if there's a platform that helps you fail fast?";
		}
		return arr;
	}, [baseIdeas]);
	const total = ideas.length;
	const positions = React.useMemo(
		() => ideas.map((t, i) => positionFromText(t, i)),
		[ideas],
	);

	const [visibleCount, setVisibleCount] = React.useState(0);

	React.useEffect(() => {
		let i = 0;
		const stepMs = 70; // ~7s total for 100 bubbles
		const id = setInterval(() => {
			i += 1;
			setVisibleCount((prev) => {
				if (prev >= total) {
					clearInterval(id);
					return prev;
				}
				return Math.min(total, prev + 1);
			});
			if (i >= total) clearInterval(id);
		}, stepMs);
		return () => clearInterval(id);
	}, [total]);

	return (
		<section
			aria-labelledby="idea-cloud"
			className="relative mx-auto w-full max-w-6xl"
		>
			<h2
				id="idea-cloud"
				className="relative text-lg font-semibold tracking-tight text-orange-500"
			>
				A Cloud of Startup Ideas
				<span className="absolute top-1 -left-[8px] h-5 w-[3px] rounded-r-sm bg-orange-500" />
			</h2>
			<p className="mt-2 max-w-xl text-3xl font-semibold tracking-tighter text-balance text-gray-900 md:text-4xl">
				Watch ideas appear, one by one.
			</p>

			<div className="relative mt-8 h-[900px] w-full overflow-visible">
				{ideas.map((text, i) => (
					<ChatBubble
						key={i}
						text={text}
						pos={positions[i]}
						visible={i < visibleCount}
						delayMs={i * 30}
					/>
				))}
			</div>
		</section>
	);
}

export default IdeaCloud;
