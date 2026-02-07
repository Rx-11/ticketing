import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import FloatingPanels from "./components/FloatingPanels";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NFTickets — Fair On-Chain Ticketing",
  description:
    "XRPL-powered event ticketing with commit-reveal queues, fair pricing, and transparent splits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-grid`}
      >
        <FloatingPanels />
        <Navbar />
        <div className="relative z-10 pt-16">{children}</div>
      </body>
    </html>
  );
}
