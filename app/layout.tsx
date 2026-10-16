import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

// Geist for headings and body; JetBrains Mono for numbers and coordinates.
const geist = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PolisenseAI - Geospatial Analysis for Climate and Infrastructure",
  description: "Geospatial analysis for climate and infrastructure decisions. Polisense turns satellite, climate, infrastructure and regulatory data into ranked, explainable answers on where to invest, protect and intervene first.",
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/polisense_logo.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
