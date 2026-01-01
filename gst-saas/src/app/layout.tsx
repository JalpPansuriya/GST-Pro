import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GST Compliance SaaS | Simple GST Management for Indian Businesses",
  description: "Streamline your GST compliance with automated GSTR-1, GSTR-3B filing, ITC tracking, and invoice management for small Indian businesses.",
  keywords: ["GST", "GSTR-1", "GSTR-3B", "ITC", "Invoice", "Tax", "India", "Compliance"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

