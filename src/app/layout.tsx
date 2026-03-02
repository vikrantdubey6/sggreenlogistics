import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SG Green Logistics | Truck Lookup System",
  description:
    "SG Green Logistics Truck Lookup System — instantly view truck details by scanning a QR code or entering a Truck ID. For assistance call 011-111-000-1.",
  keywords: [
    "SG Green Logistics",
    "truck lookup",
    "QR code truck",
    "logistics tracking",
    "truck information system",
  ],
  openGraph: {
    title: "SG Green Logistics | Truck Lookup System",
    description:
      "Scan a QR code or enter a Truck ID to instantly view SG Green Logistics truck details.",
    siteName: "SG Green Logistics",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
