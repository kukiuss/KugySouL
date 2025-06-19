import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "KugySouL - Premium AI Assistant Platform",
  description: "KugySouL is the ultimate premium AI platform that can execute code, browse the web, write novels, and automate complex tasks. Experience the future of AI assistance.",
  keywords: ["AI", "assistant", "premium", "code execution", "web browsing", "automation", "novel writing", "KugySouL"],
  authors: [{ name: "KugySouL Team" }],
  openGraph: {
    title: "KugySouL - Premium AI Assistant Platform",
    description: "KugySouL is the ultimate premium AI platform that can execute code, browse the web, write novels, and automate complex tasks.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "KugySouL - Premium AI Assistant Platform",
    description: "KugySouL is the ultimate premium AI platform that can execute code, browse the web, write novels, and automate complex tasks.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
