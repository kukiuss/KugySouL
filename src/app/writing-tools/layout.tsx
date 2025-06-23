import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Writing Tools - KugySouL",
  description: "Access premium human-like writing tools including content generation, text humanization, style analysis, and AI detection checking.",
};

export default function WritingToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}