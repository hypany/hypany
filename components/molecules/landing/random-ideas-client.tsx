"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/components/atoms/table";
import { SparkAreaChart } from "@/components/atoms/spark-chart";
import { Badge } from "@/components/atoms/badge";

export type IdeaItem = {
  user: string;
  product: string;
  engineering: string[];
  legal: string[];
};

// Deterministic spark series per row (no randomness)
function fnv1a32(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = (h + (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)) >>> 0;
  }
  return h >>> 0;
}
function hashFloat(str: string, salt = ""): number {
  const n = fnv1a32(`${str}|${salt}`);
  return (n >>> 0) / 4294967295;
}
function makeSparkData(key: string, points = 28) {
  const data: Array<Record<string, number | string>> = [];
  const base = 50 + hashFloat(key, "base") * 50;
  const trend = hashFloat(key, "trend");
  const vol = 0.12 + hashFloat(key, "vol") * 0.32;
  const drift = (trend - 0.5) * 0.12;
  let v = base * (0.7 + trend * 0.6);
  for (let i = 0; i < points; i++) {
    const t = `T${String(i + 1).padStart(2, "0")}`;
    const n = (hashFloat(key, `n${i}`) - 0.5) * 2;
    v = Math.max(5, v * (1 + drift * 0.05) + n * vol * 8);
    data.push({ t, [key]: Number(v.toFixed(2)) });
  }
  return data;
}

export default function RandomIdeasClient({ items }: { items: IdeaItem[] }) {
  const [visibleCount, setVisibleCount] = React.useState(0);
  const [highlightIndex, setHighlightIndex] = React.useState<number | null>(null);
  const [bubbleIndex, setBubbleIndex] = React.useState(0);

  // Sequentially reveal rows: show bubble for next item, then add row after 3s with glow
  React.useEffect(() => {
    if (visibleCount >= items.length) return; // done
    // show bubble for current bubbleIndex
    const revealTimer = setTimeout(() => {
      setVisibleCount((c) => c + 1); // add row
      setHighlightIndex(bubbleIndex); // glow this row
      // small delay then clear highlight and move to next bubble
      const clearTimer = setTimeout(() => {
        setHighlightIndex(null);
        setBubbleIndex((b) => b + 1);
      }, 1600);
      return () => clearTimeout(clearTimer);
    }, 3000);
    return () => clearTimeout(revealTimer);
  }, [bubbleIndex, visibleCount, items.length]);

  const bubbleVisible = bubbleIndex < items.length && visibleCount <= items.length;
  const bubbleItem = items[bubbleIndex];

  return (
    <div className="mt-8">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell style={{ width: "38%" }}>Product</TableHeaderCell>
            <TableHeaderCell style={{ width: "38%" }}>Engineering</TableHeaderCell>
            <TableHeaderCell style={{ width: "14%" }}>Legal</TableHeaderCell>
            <TableHeaderCell className="text-right" style={{ width: "10%" }}>
              Vibe Check
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.slice(0, visibleCount).map((row, i) => {
            const seriesKey = `v${i}`;
            const sparkData = makeSparkData(seriesKey, 28);
            const glow = highlightIndex === i;
            return (
              <TableRow key={i}>
                <TableCell style={{ width: "38%" }}>
                  <div className={glow ? "shimmer-cell" : undefined}>
                    <span className="text-gray-800">{row.product}</span>
                  </div>
                </TableCell>
                <TableCell style={{ width: "38%" }}>
                  <div className={glow ? "shimmer-cell" : undefined}>
                    <div className="flex flex-wrap gap-1.5">
                      {row.engineering?.map((tag, idx) => (
                        <Badge key={idx} variant="neutral">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ width: "14%" }}>
                  <div className={glow ? "shimmer-cell" : undefined}>
                    <div className="flex flex-wrap gap-1.5">
                      {row.legal?.map((tag, idx) => (
                        <Badge key={idx} variant="neutral">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right" style={{ width: "10%" }}>
                  <div className={glow ? "shimmer-cell flex justify-end" : "flex justify-end"}>
                    <SparkAreaChart
                      data={sparkData}
                      index="t"
                      categories={[seriesKey]}
                      className="h-8 w-40"
                      fill="gradient"
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Bubble at the bottom */}
      {bubbleVisible && bubbleItem ? (
        <div className="mt-4 flex w-full justify-start">
          <div className="relative max-w-[720px] rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-lg">
            {bubbleItem.user}
            <div className="absolute -bottom-1 left-6 h-3 w-3 rotate-45 border-b border-l border-orange-200 bg-white" />
          </div>
        </div>
      ) : null}

      {/* Scoped shimmer styles */}
      <style jsx>{`
        .shimmer-cell { position: relative; }
        .shimmer-cell::after {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 12px;
          background: radial-gradient( circle at 50% 50%, rgba(255,200,130,0.55), rgba(255,165,0,0.22) 36%, rgba(255,255,255,0) 65% );
          filter: blur(6px);
          opacity: 0;
          animation: hypanyGlow 1.4s ease-out forwards;
          pointer-events: none;
        }
        @keyframes hypanyGlow {
          0% { opacity: 0.95; }
          70% { opacity: 0.35; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
