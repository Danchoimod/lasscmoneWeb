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
  title: "LF Launcher: Ultimate Minecraft Launcher for Mods & Maps",
  description: "Download the best Minecraft Launcher for Android and PC. Explore curated mods, maps, resource packs, and more at LF Launcher.",
  keywords: ["Minecraft", "Launcher", "Mods", "Maps", "Resource Packs", "Android Minecraft", "LF Launcher"],
  authors: [{ name: "LF Launcher Team" }],
  icons: {
    icon: '/icons/icon.jpg',
  },
  openGraph: {
    title: "LF Launcher: Ultimate Minecraft Launcher for Mods & Maps",
    description: "Download the best Minecraft Launcher for Android and PC. Explore curated mods, maps, resource packs, and more at LF Launcher.",
    url: "https://lflauncher.org",
    siteName: "LF Launcher",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LF Launcher - The Ultimate Minecraft Modding Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LF Launcher: Ultimate Minecraft Launcher for Mods & Maps",
    description: "Download the best Minecraft Launcher for Android and PC. Curated mods, maps, and more.",
    images: ["/og-image.png"],
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

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "LF Launcher",
                "url": "https://lflauncher.org",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://lflauncher.org/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "LF Launcher",
                "url": "https://lflauncher.org",
                "logo": "https://lflauncher.org/icons/icon.jpg",
                "sameAs": [
                  "https://www.facebook.com/lflauncher",
                  "https://youtube.com/@lflauncher"
                ]
              }
            ])
          }}
        />
      </body>
    </html>
  );
}
