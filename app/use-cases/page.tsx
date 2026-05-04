import Link from "next/link";
import { MarketingNav } from "@/components/MarketingNav";
import { FadeIn } from "@/components/FadeIn";
import { Footer } from "@/components/Footer";

const USE_CASES = [
  {
    border: "border-violet-500/20",
    bg: "bg-violet-50 dark:bg-violet-500/[0.04]",
    badge: "bg-violet-500/10 border-violet-500/20 text-violet-600 dark:text-violet-400",
    iconColor: "text-violet-500 dark:text-violet-400",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>,
    title: "Startup Founders",
    headline: "Read every agreement before it binds the company.",
    desc: "Co-founder agreements, investor NDAs, vendor contracts, and employee offer letters all carry long-term legal weight. A single unchecked IP assignment clause can mean you don't own your own product.",
    tags: ["Co-founder agreements", "Investor NDAs", "Term sheets", "Vendor contracts"],
    quote: "You wouldn't ship without a code review. Don't sign without a contract review.",
  },
  {
    border: "border-emerald-500/20",
    bg: "bg-emerald-50 dark:bg-emerald-500/[0.04]",
    badge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
    iconColor: "text-emerald-500 dark:text-emerald-400",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
    title: "Freelancers",
    headline: "Know what you're giving up before you start the work.",
    desc: "Client service agreements often contain hidden IP assignments, non-solicitation clauses, and payment terms that disadvantage the freelancer. Most clients won't flag these — it's your responsibility to read them.",
    tags: ["Client agreements", "IP assignment", "Non-solicitation", "Payment terms"],
    quote: "The clause you missed is the one that costs you the most.",
  },
  {
    border: "border-amber-500/20",
    bg: "bg-amber-50 dark:bg-amber-500/[0.04]",
    badge: "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400",
    iconColor: "text-amber-500 dark:text-amber-400",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    title: "Small Businesses",
    headline: "Protect margins before contracts erode them.",
    desc: "Lease agreements, supplier contracts, and partnership terms are often drafted by the other party's lawyer — meaning they're written to protect the other party. Understanding what you're committing to is critical.",
    tags: ["Lease agreements", "Supplier contracts", "Partnerships", "Service terms"],
    quote: "9% of business value leaks through poorly managed contracts. Don't be part of that statistic.",
  },
  {
    border: "border-blue-500/20",
    bg: "bg-blue-50 dark:bg-blue-500/[0.04]",
    badge: "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400",
    iconColor: "text-blue-500 dark:text-blue-400",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
    title: "Students & Early Professionals",
    headline: "Your first contract sets precedents that follow you.",
    desc: "Internship agreements, research NDAs, and first job offer letters often contain non-compete clauses and IP assignments that could affect your career for years. You deserve to understand what you're agreeing to.",
    tags: ["Internship agreements", "Research NDAs", "Job offers", "Non-competes"],
    quote: "Most people sign their first serious contract without reading it fully. Don't be most people.",
  },
  {
    border: "border-rose-500/20",
    bg: "bg-rose-50 dark:bg-rose-500/[0.04]",
    badge: "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400",
    iconColor: "text-rose-500 dark:text-rose-400",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    title: "Legal Teams",
    headline: "Cut first-pass review time in half.",
    desc: "Use AI to triage incoming contracts before attorney review — flagging the highest-risk clauses, scoring overall risk, and generating a structured summary. Reserve expensive attorney time for what actually needs it.",
    tags: ["First-pass triage", "Risk scoring", "Clause flagging", "Summary generation"],
    quote: "AI doesn't replace your judgment. It removes the noise so you can apply it where it matters.",
  },
];

export default function UseCasesPage() {
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
                Use Cases
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.05]">
                Built for the people
                <br />
                <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                  lawyers ignore.
                </span>
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                Whether you&apos;re signing your first NDA or reviewing your hundredth vendor agreement, Should I Sign This? gives you the same clarity that used to cost hundreds of dollars an hour.
              </p>
            </div>
          </FadeIn>

          <div className="flex flex-col gap-5">
            {USE_CASES.map((uc, i) => (
              <FadeIn key={uc.title} delay={i * 0.08}>
                <div className={`rounded-2xl border p-7 flex flex-col gap-5 ${uc.border} ${uc.bg}`}>
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-xl border bg-white dark:bg-zinc-900 ${uc.border} ${uc.iconColor}`}>
                      {uc.icon}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-black text-lg text-zinc-900 dark:text-zinc-100">{uc.title}</h3>
                        <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${uc.badge}`}>Use case</span>
                      </div>
                      <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">{uc.headline}</p>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{uc.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {uc.tags.map(tag => (
                      <span key={tag} className="rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 px-3 py-1 text-xs text-zinc-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <blockquote className="border-l-2 border-zinc-300 dark:border-zinc-700 pl-4">
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 italic leading-relaxed">{uc.quote}</p>
                  </blockquote>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="rounded-2xl border border-violet-500/20 bg-violet-50 dark:bg-violet-500/[0.05] p-10 flex flex-col items-center gap-5 text-center">
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50">Whatever you&apos;re signing — read it first.</h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed text-sm">No account. No payment. Just upload your contract and get a clear verdict.</p>
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
