"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MarketingNav } from "@/components/MarketingNav";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";

// ─── Floating product preview cards ──────────────────────────────────────────

function VerdictCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: -3 }}
      animate={{ opacity: 1, y: 0, rotate: -3 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-2xl border border-red-500/25 bg-gradient-to-br from-red-950/60 via-zinc-950 to-zinc-950 p-5 shadow-2xl shadow-red-500/10 w-60"
      >
        <div className="flex flex-col gap-3.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-red-400 border border-red-500/20 bg-red-500/10 rounded-full px-3 py-1 w-fit flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-red-400 animate-pulse" />
            AI Verdict
          </span>
          <div>
            <div className="text-3xl font-black text-red-400 leading-none">DO NOT SIGN</div>
            <div className="text-xs text-zinc-500 mt-1">Severe risk detected</div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-zinc-500">Risk Score</span>
              <span className="text-red-400 font-bold">84 / 100</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full w-[84%] bg-gradient-to-r from-red-600 to-red-400 rounded-full" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 pt-0.5">
            {["Unlimited IP assignment", "3-year non-compete", "Unilateral amendment"].map(flag => (
              <div key={flag} className="flex items-center gap-2 text-xs text-zinc-400">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500/70 flex-shrink-0" />
                {flag}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ChatCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotate: 3 }}
      animate={{ opacity: 1, y: 0, rotate: 3 }}
      transition={{ duration: 0.7, delay: 0.75, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="relative rounded-2xl border border-white/[0.09] bg-zinc-900/90 backdrop-blur-sm p-4 shadow-xl w-52"
      >
        <div className="flex flex-col gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">RAG Chat</p>
          <div className="flex flex-col gap-2">
            <div className="rounded-xl bg-zinc-800 px-3 py-2 text-xs text-zinc-300">
              Who owns IP I create?
            </div>
            <div className="rounded-xl bg-violet-600/20 border border-violet-500/20 px-3 py-2 text-xs text-violet-300 leading-relaxed">
              Per §4.2, all IP created during the engagement is assigned to the company…
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { number: "34.75M", label: "U.S. small businesses without in-house legal counsel", color: "text-violet-600 dark:text-violet-400" },
  { number: "9%",     label: "Business value leaked annually via poor contract management", color: "text-amber-600 dark:text-amber-400" },
  { number: "$396B",  label: "U.S. legal services market — largely out of reach for individuals", color: "text-red-600 dark:text-red-400" },
];

const STEPS = [
  { n: "01", title: "Upload PDF",       desc: "Drop your contract. Processed in memory, never stored permanently." },
  { n: "02", title: "RAG Analysis",     desc: "Every clause chunked, embedded, and indexed with pgvector for semantic search." },
  { n: "03", title: "Verdict + Evidence", desc: "GPT-4o reads your document and returns a decision backed by exact clause quotes." },
];

const FEATURES = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    title: "AI Verdict",
    desc: "SIGN, NEGOTIATE, or DO NOT SIGN — with a 0–100 risk score and severity rating.",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    title: "Red Flag Detection",
    desc: "Every concerning clause surfaced with exact evidence quotes and severity levels.",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    title: "RAG Chat",
    desc: "Ask anything about the contract. Every answer cites the exact clause from your document.",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>,
    title: "Negotiation Playbook",
    desc: "Specific redline suggestions and questions to ask before you sign.",
  },
];

const PAIN_POINTS = [
  { emoji: "💸", title: "Lawyers cost $500–$2,000/hr", desc: "A single contract review is out of reach for most individuals and early-stage companies." },
  { emoji: "🔒", title: "Decisions are irreversible",   desc: "A non-compete or IP assignment you missed can follow you for years after signing." },
  { emoji: "⏱",  title: "Deals move fast",              desc: "Contracts arrive with 24-hour deadlines — no time to schedule attorney review." },
  { emoji: "📖", title: "Language is a weapon",         desc: "Legal prose is written by lawyers, for lawyers — deliberately hard to parse without training." },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <MarketingNav />
      <main className="relative overflow-hidden">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="relative flex flex-col items-center justify-center min-h-[92vh] px-6 pt-28 pb-24">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[700px] w-[700px] rounded-full bg-violet-600/10 dark:bg-violet-600/8 blur-[140px]" />
          </div>
          <div className="pointer-events-none absolute top-1/3 left-1/4 h-[300px] w-[300px] rounded-full bg-fuchsia-600/5 blur-[100px]" />

          <div className="relative flex flex-col lg:flex-row items-center gap-16 max-w-6xl w-full mx-auto">
            {/* Text */}
            <div className="flex-1 flex flex-col items-center lg:items-start gap-7 text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-500 dark:bg-violet-400 animate-pulse" />
                  AI-Powered Contract Analysis
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.05]"
              >
                Should you sign
                <br />
                <span className="bg-gradient-to-r from-violet-600 via-violet-500 to-fuchsia-500 dark:from-violet-400 dark:via-violet-300 dark:to-fuchsia-400 bg-clip-text text-transparent">
                  this contract?
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="text-lg text-zinc-600 dark:text-zinc-400 max-w-lg leading-relaxed"
              >
                AI that reads every clause, flags hidden risks, scores your exposure, and tells you what to negotiate — in plain English, in 30 seconds.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-3"
              >
                <Link
                  href="/upload"
                  className="inline-flex items-center gap-2.5 rounded-2xl bg-violet-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:bg-violet-500 hover:shadow-violet-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  Upload your contract
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  How it works
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-zinc-400 dark:text-zinc-600"
              >
                {["GPT-4o", "pgvector RAG", "No login required", "Free forever"].map(t => (
                  <span key={t} className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><polyline points="20 6 9 17 4 12"/></svg>
                    {t}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Floating cards */}
            <div className="hidden lg:flex flex-shrink-0 relative items-center justify-center w-72 h-80">
              <div className="absolute top-0 left-0">
                <VerdictCard />
              </div>
              <div className="absolute bottom-0 right-0">
                <ChatCard />
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ─────────────────────────────────────────────────────────── */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {STATS.map(s => (
                  <div key={s.number} className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-6 text-center flex flex-col gap-2 hover:border-zinc-300 dark:hover:border-white/10 transition-colors">
                    <span className={`text-4xl sm:text-5xl font-black tabular-nums tracking-tight ${s.color}`}>{s.number}</span>
                    <p className="text-xs text-zinc-500 leading-relaxed">{s.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── PROBLEM PREVIEW ───────────────────────────────────────────────── */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-4xl flex flex-col gap-12">
            <FadeIn className="flex flex-col gap-4 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-red-600 dark:text-red-400 mx-auto">
                The Problem
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-50">
                Most people sign contracts
                <br />
                <span className="bg-gradient-to-r from-red-500 to-orange-500 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">
                  they don&apos;t understand.
                </span>
              </h2>
              <p className="text-zinc-500 max-w-xl mx-auto text-sm leading-relaxed">
                Founders, freelancers, and small businesses sign agreements every day without realizing the hidden risks — because legal language is designed to be opaque.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PAIN_POINTS.map((p, i) => (
                <FadeIn key={p.title} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-5 flex gap-4 hover:border-zinc-300 dark:hover:border-white/10 transition-all h-full"
                  >
                    <span className="text-2xl flex-shrink-0 mt-0.5">{p.emoji}</span>
                    <div>
                      <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 mb-1">{p.title}</h3>
                      <p className="text-xs text-zinc-500 leading-relaxed">{p.desc}</p>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>

            <FadeIn className="text-center">
              <Link href="/problem" className="text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-500 inline-flex items-center gap-1.5 transition-colors">
                Read the full problem breakdown
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* ── HOW IT WORKS PREVIEW ──────────────────────────────────────────── */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-4xl flex flex-col gap-12">
            <FadeIn className="flex flex-col gap-3 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mx-auto">
                How It Works
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-50">
                From PDF to verdict
                <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent"> in seconds.</span>
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {STEPS.map((s, i) => (
                <FadeIn key={s.n} delay={i * 0.12}>
                  <div className="relative rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-6 flex flex-col gap-4 h-full">
                    <span className="text-5xl font-black tabular-nums text-zinc-100 dark:text-zinc-800/80 leading-none">{s.n}</span>
                    <div>
                      <h3 className="font-bold text-zinc-800 dark:text-zinc-100 mb-1">{s.title}</h3>
                      <p className="text-xs text-zinc-500 leading-relaxed">{s.desc}</p>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="hidden sm:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-zinc-950 rounded-full p-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-300 dark:text-zinc-700"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                      </div>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn className="text-center">
              <Link href="/how-it-works" className="text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-500 inline-flex items-center gap-1.5 transition-colors">
                See the full technical breakdown
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* ── FEATURES ──────────────────────────────────────────────────────── */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-4xl flex flex-col gap-10">
            <FadeIn className="text-center flex flex-col gap-3">
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-50">Everything in one verdict.</h2>
              <p className="text-zinc-500 text-sm max-w-md mx-auto">No back-and-forth. No account. One upload, one complete analysis.</p>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FEATURES.map((f, i) => (
                <FadeIn key={f.title} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-5 flex gap-4 hover:border-violet-500/30 dark:hover:border-violet-500/20 hover:shadow-lg hover:shadow-violet-500/5 transition-all cursor-default"
                  >
                    <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400">
                      {f.icon}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{f.title}</h3>
                      <p className="text-xs text-zinc-500 leading-relaxed">{f.desc}</p>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-violet-50 dark:bg-violet-500/[0.06] p-12 flex flex-col items-center gap-6 text-center">
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[100px]" />
                </div>
                <span className="relative inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
                  Free · No Login · 30 Seconds
                </span>
                <h2 className="relative text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-50 max-w-lg leading-tight">
                  Stop signing contracts you don&apos;t understand.
                </h2>
                <p className="relative text-zinc-600 dark:text-zinc-400 max-w-md text-sm leading-relaxed">
                  Upload any NDA, employment agreement, or vendor contract. Get an AI verdict with evidence — right now.
                </p>
                <Link
                  href="/upload"
                  className="relative inline-flex items-center gap-2.5 rounded-2xl bg-violet-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 hover:bg-violet-500 hover:shadow-violet-500/50 hover:-translate-y-0.5 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  Analyze your contract for free
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
