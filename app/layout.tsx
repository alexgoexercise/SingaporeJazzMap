import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Playfair_Display } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "SG Jazz Map — Singapore Jazz Venues",
  description:
    "Discover jazz bars and live music venues across Singapore on an interactive map.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col overflow-x-hidden bg-navy-deep text-cream">
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}
