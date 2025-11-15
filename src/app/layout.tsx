import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"], // Common weights, can be adjusted
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Join Elitewise Escapes",
  description: "Onboarding funnel for Elitewise Escapes",
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
