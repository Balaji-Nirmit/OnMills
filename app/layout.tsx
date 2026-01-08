import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from 'next/font/google'
import {
  ClerkProvider
} from '@clerk/nextjs'
import { Toaster } from "sonner";
const inter = Inter({
  subsets: ["latin"]
})

export const metadata : Metadata = {
  metadataBase: new URL("https://onmills.vercel.app"),
  title: {
    default: "OnMills",
    template: "%s | OnMills",
  },
  description: "Track every phase instantly",
  keywords: ["OnMills", "Developer Blog", "Tech Community", "Midnight Typers", "Programming", "saas", "factory", "management"],
  authors: [{ name: "CursorBits" }],
  creator: "CursorBits",
  
  // Icons (Green items from your folder only)
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", rel: "icon" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  manifest: "/site.webmanifest",

  // Social Media Previews (Using icons instead of a separate thumbnail)
  openGraph: {
    title: "OnMills",
    description: "Track every phase instantly",
    url: "https://onmills.vercel.app",
    siteName: "OnMills",
    images: [
      {
        url: "/apple-touch-icon.png", // Using high-res icon for previews
        width: 180,
        height: 180,
        alt: "OnMills Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary", // Changed to "summary" as it fits square icons better
    title: "OnMills",
    description: "Track every phase instantly",
    images: ["/apple-touch-icon.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <main className="min-h-screen">{children}</main>
          <Toaster richColors/>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
