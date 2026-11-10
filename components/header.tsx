'use client';
import Image from "next/image";
import Link from "next/link";

import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { useScrollStatus } from "@/hooks/scroll-status";
import { PrimaryButton } from "./buttons/PrimaryButton";
import { SnsLinks } from "./sns-links";

const DESKTOP_NAV_ITEMS = [
  { href: "/blog", label: "ブログ" },
  { href: "/projects", label: "プロジェクト・制作実績" },
  { href: "/contacts", label: "お問い合わせ" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollDirection, isScrollTop] = useScrollStatus();
  const onNavigate = () => setIsOpen(false);

  return (
    <>
      <div
        id="mobile-menu-bg"
        className={`${
          isOpen ? "opacity-100 z-5" : "opacity-0 -z-1"
        } h-screen w-screen fixed top-0 bg-background`}
      />
      <header
        className={`flex justify-center w-full top-0 px-4 z-20 border-b transition-all duration-300 ${
          isScrollTop
            ? "border-transparent bg-transparent"
            : "border-foreground/20 bg-background"
        } ${scrollDirection === "up" ? "fixed" : "absolute"}`}
      >
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } fixed h-screen w-screen z-20 bg-background`}
        >
          <div className="flex flex-col h-full justify-between pt-48 pb-24">
            <ul className="flex flex-col text-sm font-medium px-8">
              <li>
                <Link
                  onNavigate={onNavigate}
                  href="/blog"
                  className="flex items-center min-h-[44px] py-2"
                >
                  ブログ
                </Link>
              </li>
              <li className="font-bold text-muted-foreground mt-4 mb-1">
                プロジェクト
              </li>
              <ul className="pl-4">
                <li>
                  <Link
                    onNavigate={onNavigate}
                    href="/projects#apps"
                    className="flex items-center min-h-[44px] py-2"
                  >
                    アプリ開発
                  </Link>
                </li>
                <li>
                  <Link
                    onNavigate={onNavigate}
                    href="/projects#web"
                    className="flex items-center min-h-[44px] py-2"
                  >
                    ホームページ制作
                  </Link>
                </li>
              </ul>
              <li>
                <Link
                  onNavigate={onNavigate}
                  href="/contacts"
                  className="flex items-center min-h-[44px] py-2 mt-4"
                >
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link
                  onNavigate={onNavigate}
                  href="/join"
                  className="flex items-center min-h-[44px] py-2"
                >
                  入会案内
                </Link>
              </li>
            </ul>
            <footer className="flex flex-col text-zinc-500 text-xs px-8 my-8 gap-8">
              <SnsLinks
                iconSize={28}
                className="flex justify-center flex-wrap max-w-7xl gap-6"
                linkClassName="flex items-center justify-center min-w-[44px] min-h-[44px] p-2"
              />
              <section className="flex flex-wrap gap-3">
                <Link onNavigate={onNavigate} href="">
                  プライバシーポリシー
                </Link>
                <Link onNavigate={onNavigate} href="">
                  利用規約
                </Link>
              </section>
              <section className="w-full max-w-7xl text-end">
                <p>© 2026 WINC</p>
              </section>
            </footer>
          </div>
        </div>
        <div className="flex w-full justify-between items-center gap-3 max-w-7xl top-0 z-30 relative py-2">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-colored.svg"
              width={220}
              height={100}
              alt="WINCロゴ"
              className="filter-invert object-cover hidden lg:block"
            />
            <Image
              src="/icon-colored.svg"
              width={56}
              height={56}
              alt="WINCバッジ"
              className="filter-invert object-cover lg:hidden py-2"
            />
          </Link>
          {isOpen ? (
            <button
              className="lg:hidden p-3 -mr-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="メニューを閉じる"
            >
              <X className="h-6 w-6" />
            </button>
          ) : (
            <button
              className="lg:hidden p-3 -mr-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="メニューを開く"
            >
              <Menu className="h-6 w-6" />
            </button>
          )}
          <div className="hidden lg:block">
            <div className="flex gap-6 items-center uppercase font-bold">
              {DESKTOP_NAV_ITEMS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="hover:border-b-2 border-foreground transition-all"
                >
                  {label}
                </Link>
              ))}
              <SnsLinks iconSize={24} className="flex gap-6 items-center" />
              <div className="min-w-[166px]">
                <Link href="/join">
                  <PrimaryButton>
                    入会はこちら
                    <ArrowRight />
                  </PrimaryButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
