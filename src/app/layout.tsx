import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/ui/globals.css";
import { WalletIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/ui/font";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finovia",
  description: "Track. Analyze. Act.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
