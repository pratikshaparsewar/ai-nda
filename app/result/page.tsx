"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface NdaResult {
  summary: string;
  risks: string[];
  recommendation: string;
  decision: "SIGN" | "NEGOTIATE" | "DO NOT SIGN";
  risk_score: number;
}

const decisionConfig = {
  "SIGN": {
    glow: "bg-emerald-500/10",
    gradient: "from-emerald-950/60 via-zinc-950 to-zinc-950",
    border: "border-emerald-500/25",
    shadow: "shadow-emerald-500/15",
    text: "text-emerald-400",
    badge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    bar: "from-emerald-600 to-emerald-400",
    scoreText: "text-emerald-400",
    subtext: "Safe to proceed",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    ),
  },
  "NEGOTIATE": {
    glow: "bg-amber-500/10",
    gradient: "from-amber-950/60 via-zinc-950 to-zinc-950",
    border: "border-amber-500/25",
    shadow: "shadow-amber-500/15",
    text: "text-amber-400",
    badge: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    bar: "from-amber-600 to-amber-400",
    scoreText: "text-amber-400",
    subtext: "Negotiate before signing",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    ),
  },
  "DO NOT SIGN": {
    glow: "bg-red-500/10",
    gradient: "from-red-950/60 via-zinc-950 to-zinc-950",
    border: "border-red-500/25",
    shadow: "shadow-red-500/15",
    text: "text-red-400",
    badge: "bg-red-500/10 border-red-500/20 text-red-400",
    bar: "from-red-600 to-red-400",
    scoreText: "text-red-400",
    subtext: "High risk — do not sign",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
    ),
  },
};

export default function ResultPage() {
  const [result, setResult] = useState<NdaResult | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("ndaResult");
    if (raw) setResult(JSON.parse(raw));
  }, []);

  if (!result) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-zinc-500">No analysis found.</p>
          <Link href="/upload" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
            Upload a contract →
          </Link>
        </div>
      </main>
    );
  }

  const decision = result.decision in decisionConfig ? result.decision : "NEGOTIATE";
  const cfg = decisionConfig[decision];

  return (
    <main className="relative min-h-screen px-6 py-12 overflow-hidden">

      {/* Ambient glow behind hero */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px]">
        <div className={`w-full h-full rounded-full blur-[120px] opacity-60 ${cfg.glow}`} />
      </div>

      <div className="relative mx-auto max-w-2xl flex flex-col gap-6">

        {/* Nav */}
        <Link
          href="/upload"
          className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors w-fit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Upload another
        </Link>

        {/* ── Hero Decision Card ── */}
        <div className={`relative overflow-hidden rounded-3xl border bg-gradient-to-br p-8 shadow-2xl ${cfg.gradient} ${cfg.border} ${cfg.shadow}`}>
          {/* Subtle inner glow top-right */}
          <div className={`pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full blur-3xl opacity-40 ${cfg.glow}`} />

          <div className="relative flex flex-col items-center gap-6 text-center py-4">

            {/* Badge */}
            <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest ${cfg.badge}`}>
              AI Verdict
            </span>

            {/* Icon + Decision */}
            <div className={`flex flex-col items-center gap-3 ${cfg.text}`}>
              {cfg.icon}
              <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-none">
                {decision}
              </h1>
              <p className="text-sm font-medium opacity-60">{cfg.subtext}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/5" />

            {/* Risk Score */}
            <div className="w-full flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400 font-medium">Risk Score</span>
                <span className={`text-3xl font-black tabular-nums ${cfg.scoreText}`}>
                  {result.risk_score}
                  <span className="text-base font-normal text-zinc-600">/100</span>
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${cfg.bar}`}
                  style={{ width: `${result.risk_score}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-zinc-600">
                <span>Low risk</span>
                <span>High risk</span>
              </div>
            </div>

          </div>
        </div>

        {/* ── Summary ── */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 flex flex-col gap-3 backdrop-blur-sm">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Summary</h2>
          <p className="text-zinc-300 leading-relaxed text-sm">{result.summary}</p>
        </div>

        {/* ── Risks ── */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 flex flex-col gap-4 backdrop-blur-sm">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
            Risks
            <span className="ml-1 rounded-full bg-red-500/10 border border-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-400">{result.risks.length}</span>
          </h2>
          <div className="flex flex-col gap-2.5">
            {result.risks.map((risk, i) => (
              <div key={i} className="flex gap-3 rounded-xl border border-red-500/10 bg-red-500/[0.04] px-4 py-3">
                <span className="mt-0.5 flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500/15 text-[10px] font-bold text-red-400">
                  {i + 1}
                </span>
                <p className="text-sm text-zinc-300 leading-relaxed">{risk}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Recommendation ── */}
        <div className="rounded-2xl border border-violet-500/15 bg-violet-500/[0.04] p-6 flex flex-col gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            Recommendation
          </h2>
          <p className="text-zinc-300 leading-relaxed text-sm">{result.recommendation}</p>
        </div>

        {/* Footer action */}
        <Link
          href="/upload"
          className="flex items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-6 py-4 text-sm font-semibold text-zinc-400 transition-all hover:border-zinc-700 hover:text-zinc-200 hover:bg-zinc-900"
        >
          Analyze another contract
        </Link>

      </div>
    </main>
  );
}
