import Link from "next/link";
import { MarketingNav } from "@/components/MarketingNav";
import { FadeIn } from "@/components/FadeIn";
import { Footer } from "@/components/Footer";

const STATS = [
  {
    number: "34.75M",
    label: "Small businesses in the U.S.",
    sub: "Most have no legal counsel on retainer.",
    gradient: "from-violet-500/20 to-transparent",
    border: "border-violet-500/20",
    text: "text-violet-600 dark:text-violet-400",
  },
  {
    number: "9%",
    label: "Business value leaked annually",
    sub: "Due to poor contract management and missed obligations.",
    gradient: "from-amber-500/20 to-transparent",
    border: "border-amber-500/20",
    text: "text-amber-600 dark:text-amber-400",
  },
  {
    number: "$396B",
    label: "U.S. legal services market",
    sub: "Most of it is priced out of reach for individuals and small teams.",
    gradient: "from-red-500/20 to-transparent",
    border: "border-red-500/20",
    text: "text-red-600 dark:text-red-400",
  },
];

const PAIN_POINTS = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    title: "The language is designed to confuse",
    desc: "Legal contracts are written for lawyers, not the people signing them. Dense clauses, nested references, and passive voice make it nearly impossible to understand what you're agreeing to without a law degree.",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    title: "Legal review is expensive",
    desc: "A single contract review from a qualified attorney can cost $500–$2,000. For a freelancer negotiating a client NDA or a founder signing a term sheet, that's often not an option.",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    title: "Deals move fast, lawyers don't",
    desc: "Contracts often need to be signed within 24–48 hours. Getting a lawyer scheduled, briefed, and back to you in that window is rarely realistic — especially for early-stage companies.",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    title: "The consequences are permanent",
    desc: "A single clause you didn't understand — a broad non-compete, an unlimited IP assignment, an asymmetric termination — can follow you for years. Most people only discover the cost after they've signed.",
  },
];

export default function ProblemPage() {
  return (
    <>
      <MarketingNav />
      <main className="relative min-h-screen overflow-hidden pt-14">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[700px]">
          <div className="w-full h-full rounded-full bg-red-500/8 blur-[130px]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 py-24 flex flex-col gap-24">

          {/* Hero */}
          <FadeIn>
            <div className="flex flex-col gap-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-red-600 dark:text-red-400 w-fit">
                The Problem
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.05]">
                Most people sign contracts
                <br />
                <span className="bg-gradient-to-r from-red-500 to-orange-500 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">
                  they don&apos;t understand.
                </span>
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                Founders, freelancers, students, and small business owners are routinely handed complex legal agreements and expected to sign them on the spot — often without any professional guidance.
              </p>
            </div>
          </FadeIn>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {STATS.map((s, i) => (
              <FadeIn key={s.number} delay={i * 0.1}>
                <div className={`relative overflow-hidden rounded-2xl border bg-white dark:bg-transparent p-6 flex flex-col gap-3 ${s.border}`}>
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-50 dark:opacity-100`} />
                  <div className={`relative text-4xl sm:text-5xl font-black tabular-nums tracking-tight ${s.text}`}>{s.number}</div>
                  <div className="relative flex flex-col gap-1">
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{s.label}</p>
                    <p className="text-xs text-zinc-500 leading-relaxed">{s.sub}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Pull quote */}
          <FadeIn>
            <blockquote className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-zinc-50 dark:bg-white/[0.02] p-8">
              <p className="text-xl sm:text-2xl font-semibold text-zinc-700 dark:text-zinc-200 leading-relaxed italic">
                &ldquo;Small businesses, independent professionals, and first-time founders are most vulnerable — they rarely have in-house counsel, yet they sign some of the most consequential agreements of their careers.&rdquo;
              </p>
            </blockquote>
          </FadeIn>

          {/* Pain points */}
          <div className="flex flex-col gap-4">
            <FadeIn>
              <div className="flex flex-col gap-2 mb-2">
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50">Why this keeps happening</h2>
                <p className="text-zinc-500 text-sm">Four structural reasons people sign what they shouldn&apos;t.</p>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PAIN_POINTS.map((p, i) => (
                <FadeIn key={p.title} delay={i * 0.1}>
                  <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-6 flex flex-col gap-4 hover:border-zinc-300 dark:hover:border-white/10 transition-colors h-full">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/50 text-zinc-500 dark:text-zinc-400">
                      {p.icon}
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100">{p.title}</h3>
                      <p className="text-sm text-zinc-500 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* CTA */}
          <FadeIn>
            <div className="rounded-2xl border border-violet-500/20 bg-violet-50 dark:bg-violet-500/[0.05] p-10 flex flex-col items-center gap-5 text-center">
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50">There&apos;s a better way.</h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed text-sm">
                Upload your contract and get a plain-English verdict in under 30 seconds — for free, with no login required.
              </p>
              <Link href="/upload" className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:bg-violet-500 hover:-translate-y-0.5 transition-all">
                Analyze your contract →
              </Link>
            </div>
          </FadeIn>

        </div>
      </main>
      <Footer />
    </>
  );
}
