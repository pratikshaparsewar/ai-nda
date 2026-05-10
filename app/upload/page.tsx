"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handleFile(f: File) {
    if (f.type === "application/pdf") { setFile(f); setError(null); }
  }
  function handleDrop(e: React.DragEvent) {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0]; if (f) handleFile(f);
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (f) handleFile(f);
  }

  async function handleAnalyze() {
    if (!file) return;
    setLoading(true); setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error ?? "Upload failed");
      router.push(`/document/${data.documentId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-violet-600/8 blur-[100px]" />
      </div>

      <div className="relative w-full max-w-lg flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors w-fit">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back
          </Link>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">Upload your contract</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">PDF only · Never stored permanently · Analyzed in seconds</p>
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-14 text-center transition-all duration-200 cursor-pointer
            ${dragging
              ? "border-violet-500 bg-violet-500/[0.07] shadow-lg shadow-violet-500/10"
              : file
              ? "border-emerald-500/40 bg-emerald-500/[0.05]"
              : "border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-900"
            }`}
        >
          <input ref={inputRef} type="file" accept="application/pdf" className="hidden" onChange={handleChange} />
          {file ? (
            <>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 dark:text-emerald-400"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              </div>
              <div>
                <p className="font-semibold text-zinc-800 dark:text-zinc-100">{file.name}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{(file.size / 1024).toFixed(1)} KB · PDF</p>
              </div>
              <span className="text-xs text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-800 rounded-full px-3 py-1">Click to replace</span>
            </>
          ) : (
            <>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </div>
              <div>
                <p className="font-semibold text-zinc-700 dark:text-zinc-200">Drop your PDF here</p>
                <p className="text-sm text-zinc-400 mt-1">or click to browse</p>
              </div>
            </>
          )}
        </button>

        {error && (
          <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-red-500"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <button
          onClick={handleAnalyze}
          disabled={!file || loading}
          className={`flex items-center justify-center gap-3 rounded-2xl px-8 py-4 text-base font-semibold transition-all duration-200
            ${!file || loading
              ? "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-400 dark:text-zinc-600 cursor-not-allowed border border-zinc-200 dark:border-zinc-800"
              : "bg-violet-600 text-white shadow-lg shadow-violet-500/25 hover:bg-violet-500 hover:shadow-violet-500/40 hover:-translate-y-0.5 active:translate-y-0"
            }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
              Processing PDF &amp; embedding clauses…
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Analyze Contract
            </>
          )}
        </button>
      </div>
    </main>
  );
}
