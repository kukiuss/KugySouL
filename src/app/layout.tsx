import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { EnhancedHeader, EnhancedFooter } from "@/components/enhanced/enhanced-layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "KugySouL - Premium AI Assistant Platform",
  description: "KugySouL is an ultra-premium AI platform that can execute code, browse the web, write novels, and automate complex tasks. Perfect for developers, researchers, and creative professionals.",
  keywords: ["AI", "assistant", "code execution", "web browsing", "automation", "novel writing", "KugySouL", "premium"],
  authors: [{ name: "KugySouL Team" }],
  openGraph: {
    title: "KugySouL - Premium AI Assistant Platform",
    description: "KugySouL is an ultra-premium AI platform that can execute code, browse the web, write novels, and automate complex tasks.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "KugySouL - Premium AI Assistant Platform",
    description: "KugySouL is an ultra-premium AI platform that can execute code, browse the web, write novels, and automate complex tasks.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Kita akan merender layout tanpa header dan footer untuk halaman tertentu
  // Ini akan dihandle oleh komponen Header dan Footer yang sudah kita modifikasi
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <EnhancedHeader />
          <main className="flex-1">{children}</main>
          <EnhancedFooter />
        </div>
      </body>
    </html>
  );
}