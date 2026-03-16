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
  title: "LF Launcher - Ultimate Minecraft Experience",
  description: "Download the best Minecraft Launcher for Android and PC. Explore curated mods, maps, resource packs, and more at LF Launcher.",
  keywords: ["Minecraft", "Launcher", "Mods", "Maps", "Resource Packs", "Android Minecraft", "LF Launcher"],
  authors: [{ name: "LF Launcher Team" }],
  icons: {
    icon: '/icons/icon.jpg',
  },
  openGraph: {
    title: "LF Launcher - Ultimate Minecraft Experience",
    description: "Download the best Minecraft Launcher for Android and PC. Explore curated mods, maps, resource packs, and more at LF Launcher.",
    url: "https://lflauncher.org",
    siteName: "LF Launcher",
    images: [
      {
        url: "/icons/icon.jpg",
        width: 800,
        height: 800,
        alt: "LF Launcher Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LF Launcher - Ultimate Minecraft Experience",
    description: "Download the best Minecraft Launcher for Android and PC. Curated mods, maps, and more.",
    images: ["/icons/icon.jpg"],
  },
};

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { getCategories } from "@/lib/api";
import Providers from "@/components/providers/SessionProvider";
import NextTopLoader from 'nextjs-toploader';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader
          color="#00a63e"
          initialPosition={0.08}
          crawlSpeed={200}
          height={2}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
        />
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar initialCategories={categories} />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
