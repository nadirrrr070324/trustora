"use client";
import { Star, StarHalf } from "lucide-react";

export function Stars({ value, size = 14 }: { value: number; size?: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <span
      className="inline-flex items-center gap-0.5 text-amber-300"
      role="img"
      aria-label={`${value.toFixed(1)} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full)
          return <Star key={i} size={size} fill="currentColor" strokeWidth={0} />;
        if (i === full && half)
          return (
            <span key={i} className="relative inline-flex" style={{ width: size, height: size }}>
              <Star size={size} className="absolute inset-0 text-slate-600" />
              <StarHalf size={size} fill="currentColor" strokeWidth={0} className="absolute inset-0" />
            </span>
          );
        return <Star key={i} size={size} className="text-slate-600" />;
      })}
    </span>
  );
}
