"use client";

import React from "react";
import { Badge } from "@/components/atoms/badge";

type BubbleIdea = {
  user: string;
  product: string;
  engineering: string[];
  legal: string[];
};

export default function FloatingHypanyBubble({ item }: { item: BubbleIdea }) {
  const [stage, setStage] = React.useState<0 | 1 | 2 | 3>(0);

  React.useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 1100); // show product
    const t2 = setTimeout(() => setStage(2), 2100); // add engineering
    const t3 = setTimeout(() => setStage(3), 3000); // add legal
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[2000] flex max-w-[520px] flex-col gap-2">
      {/* User message */}
      <div className="self-end">
        <div className="relative max-w-[480px] rounded-2xl bg-gray-900 px-4 py-2 text-sm text-white shadow-lg">
          {item.user}
          <div className="absolute -bottom-1 right-6 h-3 w-3 rotate-45 bg-gray-900" />
        </div>
      </div>

      {/* Hypany response */}
      <div className="self-start">
        <div className="relative max-w-[520px] rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-lg">
          <div className="mb-1 font-semibold text-orange-600">Hypany</div>
          {/* Progressive conversion into a mini table */}
          <div className="grid grid-cols-[100px_1fr] items-start gap-x-3 gap-y-1">
            <div className="text-gray-500">Product</div>
            <div className={stage >= 1 ? "opacity-100 transition-opacity" : "opacity-0"}>{item.product}</div>
            <div className="text-gray-500">Engineering</div>
            <div className={stage >= 2 ? "opacity-100 transition-opacity" : "opacity-0"}>
              <div className="flex flex-wrap gap-1">
                {item.engineering?.map((tag, i) => (
                  <Badge key={i} variant="neutral">{tag}</Badge>
                ))}
              </div>
            </div>
            <div className="text-gray-500">Legal</div>
            <div className={stage >= 3 ? "opacity-100 transition-opacity" : "opacity-0"}>
              <div className="flex flex-wrap gap-1">
                {item.legal?.map((tag, i) => (
                  <Badge key={i} variant="neutral">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-1 left-6 h-3 w-3 rotate-45 border-b border-l border-orange-200 bg-white" />
        </div>
      </div>
    </div>
  );
}

