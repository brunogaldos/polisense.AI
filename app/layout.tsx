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
  title: "PolisenseAI - AI-Powered Resource & Energy Access Intelligence",
  description: "Democratizing resource and energy infrastructure planning with AI. Analyze geospatial data, predict demand, and accelerate access in underserved communities.",
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
