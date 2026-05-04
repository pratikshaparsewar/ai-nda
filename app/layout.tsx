import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Should I Sign This?",
  description: "AI-powered contract risk analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <body className="min-h-full antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
