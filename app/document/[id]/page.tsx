"use client";

import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Analysis, ChatMessage, RedFlag } from "@/types";

// ─── Decision config ─────────────────────────────────────────────────────────

const DECISION = {
  "SIGN": {
    glow: "bg-emerald-500/10",
    gradient: "from-emerald-50 via-white to-white dark:from-emerald-950/70 dark:via-zinc-950 dark:to-zinc-950",
    border: "border-emerald-500/25",
    shadow: "shadow-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    badge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
    bar: "from-emerald-600 to-emerald-400",
    subtext: "Standard terms — safe to proceed",
  },
  "NEGOTIATE": {
    glow: "bg-amber-500/10",
    gradient: "from-amber-50 via-white to-white dark:from-amber-950/70 dark:via-zinc-950 dark:to-zinc-950",
    border: "border-amber-500/25",
    shadow: "shadow-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    badge: "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400",
    bar: "from-amber-600 to-amber-400",
    subtext: "Concerning clauses — negotiate before signing",
  },
  "DO NOT SIGN": {
    glow: "bg-red-500/10",
    gradient: "from-red-50 via-white to-white dark:from-red-950/70 dark:via-zinc-950 dark:to-zinc-950",
    border: "border-red-500/25",
    shadow: "shadow-red-500/10",
    text: "text-red-600 dark:text-red-400",
    badge: "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400",
    bar: "from-red-600 to-red-400",
    subtext: "Severe risk — do not sign as written",
  },
} as const;

const SEVERITY = {
  LOW:      { text: "text-zinc-600 dark:text-zinc-400",   badge: "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400" },
  MEDIUM:   { text: "text-amber-600 dark:text-amber-400", badge: "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400" },
  HIGH:     { text: "text-orange-600 dark:text-orange-400",badge: "bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-400" },
  CRITICAL: { text: "text-red-600 dark:text-red-400",     badge: "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400" },
};

// ─── Loading state ────────────────────────────────────────────────────────────

const STEPS = [
  "Reading contract clauses",
  "Identifying risk factors",
  "Scoring obligations",
  "Generating verdict",
];

function LoadingState() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step >= STEPS.length - 1) return;
    const t = setTimeout(() => setStep(s => s + 1), 2200);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-8 max-w-sm w-full">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-violet-500/20" />
          <svg className="animate-spin text-violet-500 dark:text-violet-400" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Analyzing contract…</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">This takes about 15–30 seconds</p>
        </div>
        <ul className="w-full flex flex-col gap-2.5">
          {STEPS.map((s, i) => (
            <li key={i} className={`flex items-center gap-3 text-sm transition-colors duration-500 ${i <= step ? "text-zinc-800 dark:text-zinc-200" : "text-zinc-500 dark:text-zinc-600"}`}>
              <span className={`flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold transition-all duration-500 ${
                i < step
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400"
                  : i === step
                  ? "border-violet-500/40 bg-violet-500/10 text-violet-500 dark:text-violet-400 animate-pulse"
                  : "border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-600"
              }`}>
                {i < step ? "✓" : i === step ? "·" : "○"}
              </span>
              {s}
              {i === step && <span className="text-zinc-400 dark:text-zinc-600 animate-pulse">…</span>}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

// ─── Tab components ───────────────────────────────────────────────────────────

function OverviewTab({ analysis }: { analysis: Analysis }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-6 flex flex-col gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Plain-English Summary</h3>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm whitespace-pre-line">{analysis.summary}</p>
      </div>

      <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-6 flex flex-col gap-4">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          Potential Consequences
        </h3>
        <ul className="flex flex-col gap-2.5">
          {analysis.consequences.map((c, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 flex-shrink-0 h-1.5 w-1.5 rounded-full bg-amber-500/70" />
              <span className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function RedFlagsTab({ analysis }: { analysis: Analysis }) {
  if (!analysis.red_flags.length) {
    return (
      <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-10 text-center">
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">No red flags identified.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {analysis.red_flags.map((flag: RedFlag, i: number) => {
        const sev = SEVERITY[flag.severity] ?? SEVERITY.MEDIUM;
        return (
          <div key={i} className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-600 dark:text-zinc-400">
                  {i + 1}
                </span>
                <h4 className={`font-semibold text-sm ${sev.text}`}>{flag.title}</h4>
              </div>
              <span className={`flex-shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${sev.badge}`}>
                {flag.severity}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{flag.description}</p>
            {flag.evidence && (
              <blockquote className="rounded-xl border-l-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/80 px-4 py-3">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mb-1.5 uppercase tracking-wider">Evidence</p>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 italic leading-relaxed">"{flag.evidence}"</p>
              </blockquote>
            )}
          </div>
        );
      })}
    </div>
  );
}

function NegotiationTab({ analysis }: { analysis: Analysis }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-6 flex flex-col gap-4">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-violet-500 dark:text-violet-400"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
          Negotiation Advice
        </h3>
        <ol className="flex flex-col gap-3">
          {analysis.negotiation_advice.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/10 border border-violet-500/20 text-[10px] font-bold text-violet-600 dark:text-violet-400">
                {i + 1}
              </span>
              <span className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{item}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-6 flex flex-col gap-4">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 dark:text-blue-400"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          Questions to Ask
        </h3>
        <ol className="flex flex-col gap-3">
          {analysis.questions_to_ask.map((q, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                {i + 1}
              </span>
              <span className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{q}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function ChatTab({ documentId }: { documentId: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const msg = input.trim();
    if (!msg || loading) return;

    setInput("");
    setMessages(prev => [...prev, { role: "user", content: msg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId, message: msg, history: messages }),
      });
      const data = await res.json();
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: data.answer ?? "Sorry, something went wrong.", sources: data.sources ?? [] },
      ]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Suggested prompts */}
      {messages.length === 0 && (
        <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-5 flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Suggested questions</p>
          <div className="flex flex-wrap gap-2">
            {[
              "What is the confidentiality period?",
              "Can I work for competitors after this?",
              "Who owns IP created during the engagement?",
              "What happens if I breach this contract?",
            ].map(q => (
              <button
                key={q}
                onClick={() => setInput(q)}
                className="rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex flex-col gap-4 min-h-[200px]">
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col gap-2 ${m.role === "user" ? "items-end" : "items-start"}`}>
            <div className={`rounded-2xl px-4 py-3 max-w-[85%] text-sm leading-relaxed ${
              m.role === "user"
                ? "bg-violet-600 text-white rounded-br-sm"
                : "bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.06] text-zinc-700 dark:text-zinc-300 rounded-bl-sm"
            }`}>
              {m.content}
            </div>

            {m.role === "assistant" && m.sources && m.sources.length > 0 && (
              <div className="w-full max-w-[90%] flex flex-col gap-2">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-600 font-semibold px-1">Source clauses</p>
                {m.sources.map((src, j) => (
                  <blockquote key={j} className="rounded-xl border-l-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50/80 dark:bg-zinc-900/60 px-3 py-2">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3">{src}</p>
                  </blockquote>
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-start">
            <div className="rounded-2xl rounded-bl-sm bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.06] px-4 py-3">
              <div className="flex gap-1.5 items-center h-4">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 animate-bounce [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 animate-bounce [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 animate-bounce" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="flex gap-3 sticky bottom-6">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about a specific clause…"
          className="flex-1 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 outline-none focus:border-zinc-400 dark:focus:border-zinc-600 focus:bg-white dark:focus:bg-zinc-900 transition-colors backdrop-blur-sm"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-500/20 hover:bg-violet-500 transition-all disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-600 disabled:shadow-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </form>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

type Tab = "overview" | "red-flags" | "negotiation" | "chat";

export default function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("overview");

  useEffect(() => {
    fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentId: id }),
    })
      .then(r => r.json())
      .then(data => {
        if (!data.success) throw new Error(data.error ?? "Analysis failed");
        setAnalysis(data.analysis);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingState />;

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center gap-4 text-center max-w-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 dark:text-red-400"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          </div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Analysis failed</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{error}</p>
          <Link href="/upload" className="rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 transition-colors">
            Try again
          </Link>
        </div>
      </main>
    );
  }

  if (!analysis) return null;

  const decision = analysis.decision in DECISION ? analysis.decision : "NEGOTIATE";
  const cfg = DECISION[decision];
  const criticalCount = analysis.red_flags.filter(f => f.severity === "CRITICAL" || f.severity === "HIGH").length;

  const TABS: { key: Tab; label: string; count?: number }[] = [
    { key: "overview", label: "Overview" },
    { key: "red-flags", label: "Red Flags", count: analysis.red_flags.length },
    { key: "negotiation", label: "Negotiation" },
    { key: "chat", label: "Chat" },
  ];

  return (
    <main className="relative min-h-screen pb-16 overflow-hidden">

      {/* Ambient glow */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[320px] z-0">
        <div className={`w-full h-full rounded-full blur-[140px] opacity-30 dark:opacity-50 ${cfg.glow}`} />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-6 pt-10 flex flex-col gap-8">

        {/* Nav */}
        <Link href="/upload" className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Analyze another
        </Link>

        {/* ── Hero decision card ── */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
          className={`relative overflow-hidden rounded-3xl border shadow-2xl bg-gradient-to-br p-8 ${cfg.gradient} ${cfg.border} ${cfg.shadow}`}
        >
          {/* Inner highlight */}
          <div className={`pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full blur-3xl opacity-20 dark:opacity-30 ${cfg.glow}`} />

          <div className="relative flex flex-col gap-7">
            {/* Top row */}
            <div className="flex items-start justify-between">
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-widest ${cfg.badge}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                AI Verdict
              </span>
              {criticalCount > 0 && (
                <span className="text-xs text-zinc-500 dark:text-zinc-400">{criticalCount} high-risk clause{criticalCount !== 1 ? "s" : ""}</span>
              )}
            </div>

            {/* Decision */}
            <div className="flex flex-col gap-1.5">
              <h1 className={`text-5xl sm:text-6xl font-black tracking-tight leading-none ${cfg.text}`}>
                {decision}
              </h1>
              <p className={`text-sm font-medium opacity-70 ${cfg.text}`}>{cfg.subtext}</p>
            </div>

            {/* Risk score */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Risk Score</span>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-black tabular-nums leading-none ${cfg.text}`}>{analysis.risk_score}</span>
                  <span className="text-sm text-zinc-400 dark:text-zinc-500">/100</span>
                  <span className={`ml-2 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${cfg.badge}`}>{analysis.risk_level}</span>
                </div>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-200/60 dark:bg-white/5 overflow-hidden">
                <div className={`h-full rounded-full bg-gradient-to-r transition-all ${cfg.bar}`} style={{ width: `${analysis.risk_score}%` }} />
              </div>
              <div className="flex justify-between text-[11px] text-zinc-400 dark:text-zinc-500">
                <span>Low risk</span>
                <span>High risk</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Tab bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex items-center gap-1 rounded-xl border border-zinc-200 dark:border-white/[0.06] bg-zinc-100/80 dark:bg-zinc-900/60 p-1 backdrop-blur-sm"
        >
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                tab === t.key
                  ? "bg-white dark:bg-white/[0.08] text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              {t.label}
              {t.count !== undefined && (
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${
                  tab === t.key
                    ? "bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
                    : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500"
                }`}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* ── Tab content ── */}
        {tab === "overview"    && <OverviewTab    analysis={analysis} />}
        {tab === "red-flags"   && <RedFlagsTab    analysis={analysis} />}
        {tab === "negotiation" && <NegotiationTab analysis={analysis} />}
        {tab === "chat"        && <ChatTab        documentId={id}     />}

      </div>
    </main>
  );
}
