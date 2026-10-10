"use client";

export function ScoreRing({
  score,
  size = 64,
}: {
  score: number | null;
  size?: number;
}) {
  const r = (size - 10) / 2;
  const c = 2 * Math.PI * r;
  const pct = score == null ? 0 : score / 100;
  const color =
    score == null
      ? "#475569"
      : score >= 88
        ? "#34d399"
        : score >= 78
          ? "#7aa7ff"
          : "#fbbf24";
  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={score == null ? "No trust score yet" : `Trust score ${score} of 100`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={6} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={6} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - pct)}
        />
      </svg>
      <span className="absolute text-center leading-none">
        <span className="block text-lg font-extrabold text-white">
          {score == null ? "—" : score}
        </span>
        <span className="block text-[9px] font-medium uppercase tracking-wider text-slate-400">
          trust
        </span>
      </span>
    </div>
  );
}
