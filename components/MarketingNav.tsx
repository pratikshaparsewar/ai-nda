"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { href: "/problem",      label: "Problem"      },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/use-cases",    label: "Use Cases"    },
  { href: "/about",        label: "About"        },
];

export function MarketingNav() {
  const path = usePathname();
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-zinc-200 dark:border-white/[0.06] bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between gap-6">
        <Link href="/" className="flex-shrink-0 text-sm font-bold text-zinc-900 dark:text-zinc-100 hover:text-zinc-700 dark:hover:text-white transition-colors">
          Should I Sign This?
        </Link>

        <nav className="hidden sm:flex items-center gap-0.5">
          {LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                path === l.href
                  ? "text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-white/[0.07]"
                  : "text-zinc-500 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/[0.04]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/upload"
            className="flex-shrink-0 rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-violet-500/20 hover:bg-violet-500 transition-all"
          >
            Analyze a Contract
          </Link>
        </div>
      </div>
    </header>
  );
}
