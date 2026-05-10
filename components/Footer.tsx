import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-white/[0.06] bg-white/50 dark:bg-white/[0.01] backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-6 py-12 flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row justify-between gap-10">
          <div className="flex flex-col gap-3 max-w-xs">
            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Should I Sign This?</span>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              AI-powered contract analysis for founders, freelancers, and small businesses. Understand what you&apos;re agreeing to before it&apos;s too late.
            </p>
          </div>
          <div className="flex gap-12">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Product</p>
              <div className="flex flex-col gap-2">
                {[
                  { href: "/upload",        label: "Analyze Contract" },
                  { href: "/how-it-works",  label: "How It Works"    },
                  { href: "/use-cases",     label: "Use Cases"       },
                ].map(l => (
                  <Link key={l.href} href={l.href} className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors w-fit">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Company</p>
              <div className="flex flex-col gap-2">
                {[
                  { href: "/problem", label: "The Problem" },
                  { href: "/about",   label: "About"       },
                ].map(l => (
                  <Link key={l.href} href={l.href} className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors w-fit">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-white/[0.06] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">© 2025 Should I Sign This?</p>
          <p className="text-xs text-zinc-400 sm:max-w-sm sm:text-right leading-relaxed">
            ⚠ Not legal advice. Always consult a qualified attorney before making legal decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
