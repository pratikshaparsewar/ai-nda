import Link from "next/link";
import { MarketingNav } from "@/components/MarketingNav";
import { FadeIn } from "@/components/FadeIn";
import { Footer } from "@/components/Footer";

const PRINCIPLES = [
  {
    title: "Transparency over mystification",
    desc: "Every verdict comes with evidence. We show you the exact clause we flagged, not just a score.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  },
  {
    title: "Accessible to everyone",
    desc: "No login. No payment. No gatekeeping. Contract clarity should not be a privilege of the wealthy.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    title: "Grounded in the actual text",
    desc: "We use RAG so every answer is backed by the real clause from your document, not a hallucination.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  },
  {
    title: "Augmentation, not replacement",
    desc: "We never tell you not to consult a lawyer. We help you arrive at that conversation informed, not confused.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
];

const POSITIONING = [
  {
    label: "What we are",
    border: "border-emerald-500/20",
    bg: "bg-emerald-50 dark:bg-emerald-500/[0.04]",
    badge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
    items: [
      "A first-pass review tool that surfaces risk instantly",
      "Plain-English translation of legal complexity",
      "A way to arrive at lawyer conversations better prepared",
      "A reference for self-education about your own agreements",
      "A RAG-powered chat interface tied to your specific document",
    ],
  },
  {
    label: "What we're not",
    border: "border-red-500/20",
    bg: "bg-red-50 dark:bg-red-500/[0.04]",
    badge: "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400",
    items: [
      "A replacement for qualified legal counsel",
      "A law firm or licensed legal service",
      "Infallible — AI can miss context, nuance, or jurisdiction-specific issues",
      "Liable for decisions made based on our analysis",
      "A substitute for negotiation experience or legal strategy",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <MarketingNav />
      <main className="relative min-h-screen overflow-hidden pt-14">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[700px]">
          <div className="w-full h-full rounded-full bg-violet-600/8 blur-[130px]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 py-24 flex flex-col gap-20">

          <FadeIn>
            <div className="flex flex-col gap-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 w-fit">
                About
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.05]">
                No one should sign
                <br />
                <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                  blind agreements.
                </span>
              </h1>
              <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                Should I Sign This? was built to give anyone — regardless of budget or legal background — the ability to understand what they&apos;re agreeing to before it&apos;s too late.
              </p>
            </div>
          </FadeIn>

          {/* Mission */}
          <FadeIn>
            <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-8 sm:p-10 flex flex-col gap-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Mission</span>
              <p className="text-xl sm:text-2xl font-semibold text-zinc-700 dark:text-zinc-200 leading-relaxed">
                Legal clarity is a right, not a luxury. We exist to remove the information asymmetry between the people who draft contracts and the people who sign them.
              </p>
              <p className="text-sm text-zinc-500 leading-relaxed">
                34.75 million small businesses in the U.S. operate without legal counsel. Millions of freelancers, students, and early-career professionals sign agreements they don&apos;t fully understand every single day. The consequences range from lost IP to multi-year non-compete restrictions to forfeited compensation. Should I Sign This? exists to close that gap.
              </p>
            </div>
          </FadeIn>

          {/* Positioning */}
          <div className="flex flex-col gap-5">
            <FadeIn>
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50">We augment lawyers. We don&apos;t replace them.</h2>
                <p className="text-zinc-500 text-sm max-w-xl">
                  AI can find patterns and surface risk faster than any human. But legal judgment, negotiation strategy, and jurisdiction-specific knowledge require a real attorney.
                </p>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {POSITIONING.map((p, i) => (
                <FadeIn key={p.label} delay={i * 0.1}>
                  <div className={`rounded-2xl border p-6 flex flex-col gap-4 ${p.border} ${p.bg}`}>
                    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider w-fit ${p.badge}`}>{p.label}</span>
                    <ul className="flex flex-col gap-2.5">
                      {p.items.map(item => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="mt-1.5 flex-shrink-0 h-1 w-1 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                          <span className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Principles */}
          <div className="flex flex-col gap-5">
            <FadeIn>
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50">How we think about it</h2>
                <p className="text-zinc-500 text-sm">Four principles that guide every product decision.</p>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PRINCIPLES.map((p, i) => (
                <FadeIn key={p.title} delay={i * 0.1}>
                  <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-5 flex gap-4 hover:border-zinc-300 dark:hover:border-white/10 transition-colors">
                    <div className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/50 text-zinc-500 dark:text-zinc-400">
                      {p.icon}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100">{p.title}</h3>
                      <p className="text-xs text-zinc-500 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Stack */}
          <FadeIn>
            <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-7 flex flex-col gap-4">
              <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Built in the open</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Should I Sign This? is a full-stack Next.js application built on the App Router with Supabase Postgres, pgvector for semantic search, LangChain for document processing, and GPT-4o for analysis. Designed to be deployed on Vercel in under five minutes.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Next.js 16", "GPT-4o", "pgvector", "LangChain.js", "Supabase", "Tailwind CSS v4"].map(t => (
                  <span key={t} className="rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-1 text-xs text-zinc-500">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn>
            <div className="rounded-2xl border border-violet-500/20 bg-violet-50 dark:bg-violet-500/[0.05] p-10 flex flex-col items-center gap-5 text-center">
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50">Try it yourself.</h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed text-sm">No login, no payment, no catch. Upload a contract and see exactly what it means for you.</p>
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
