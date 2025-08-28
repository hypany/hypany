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

// Deterministic spark data per-row (SSR-safe)
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

export default function IdeasTableClient({ items }: { items: IdeaItem[] }) {
  return (
    <div className="mt-8">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell style={{ width: "26%" }}>User</TableHeaderCell>
            <TableHeaderCell style={{ width: "22%" }}>Product</TableHeaderCell>
            <TableHeaderCell style={{ width: "32%" }}>Engineering</TableHeaderCell>
            <TableHeaderCell style={{ width: "12%" }}>Legal</TableHeaderCell>
            <TableHeaderCell className="text-right" style={{ width: "8%" }}>
              Vibe Check
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row, i) => {
            const seriesKey = `v${i}`;
            const sparkData = makeSparkData(seriesKey, 28);
            return (
              <TableRow key={i}>
                <TableCell>
                  <span className="font-medium text-gray-900">{row.user}</span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-800">{row.product}</span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {row.engineering?.map((tag, idx) => (
                      <Badge key={idx} variant="neutral">{tag}</Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {row.legal?.map((tag, idx) => (
                      <Badge key={idx} variant="neutral">{tag}</Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end">
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
    </div>
  );
}

