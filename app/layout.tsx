import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Geist_Mono, Funnel_Display } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import LoadingOrBg from "@/components/layout/loading-or-bg";
import ScrollToTop from "@/components/layout/scroll-to-top";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  display: "swap",
});

const sans = Funnel_Display({
  subsets: ["latin"],
  variable: "--default-sansserif",
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "white",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://winc.ne.jp"),
  title: {
    default: "WINC - 早稲田大学公認 ITサークル | アプリ・Web開発",
    template: "%s | WINC - 早稲田ITサークル",
  },
  description:
    "WINC（早稲田コンピューター研究会）は早稲田大学公認のITサークルです。アプリ開発・Web制作・プログラミング学習を通じて、エンジニアを目指す学生が集まっています。新入生歓迎・企業のWeb制作依頼も受付中。",
  keywords: [
    "早稲田 ITサークル",
    "早稲田 プログラミングサークル",
    "早稲田 コンピューター研究会",
    "アプリ開発 サークル",
    "Web制作 依頼 早稲田",
    "WINC",
    "早稲田大学 エンジニア",
    "早稲田大学 プログラミング",
  ],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "WINC - 早稲田コンピューター研究会",
    title: "WINC - 早稲田大学公認 ITサークル | アプリ・Web開発",
    description:
      "WINC（早稲田コンピューター研究会）は早稲田大学公認のITサークルです。アプリ開発・Web制作・プログラミング学習を通じて、エンジニアを目指す学生が集まっています。",
  },
  twitter: {
    card: "summary_large_image",
    title: "WINC - 早稲田大学公認 ITサークル",
    description:
      "早稲田大学公認のITサークル。アプリ開発・Web制作・プログラミング学習。新入生歓迎中。",
  },
  alternates: {
    canonical: "/",
  },
  appleWebApp: {
    title: "WINC",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className="overscroll-x-none overflow-x-hidden bg-background -z-10 relative"
    >
      <body
        suppressHydrationWarning
        className={`${notoSansJp.variable} ${geistMono.variable} ${sans.variable} antialiased min-h-screen bg-gradient-orange-50 z-0 relative`}
      >
        <ScrollToTop />
        <LoadingOrBg />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
