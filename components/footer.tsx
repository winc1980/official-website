import Image from "next/image";
import Link from "next/link";
import { SnsLinks } from "./sns-links";

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center px-4 gap-16 bg-gradient-to-b from-transparent to-background divide-effect">
      {/* <section className="flex flex-col lg:flex-row justify-around items-center w-full max-w-7xl text-center lg:text-end py-6 border-b border-gray-400">
        <p className="text-sm font-semibold p-3 text-gray-600 w-[-webkit-fill-available] lg:w-auto font-mono">
          Affiliated with
        </p>

        <Image
          src="/affiliates/gmo-pepabo.svg"
          width={200}
          height={31}
          alt="GMOペパボ株式会社"
          className="p-0.5"
        />
        <Image
          src="/affiliates/progate.png"
          width={200}
          height={31}
          alt="Progate株式会社"
          className="p-0.5"
        />
      </section> */}
      <section className="flex flex-col lg:flex-row gap-8 lg:gap-16 justify-between w-full max-w-7xl lg:py-16 px-4 lg:px-0 lg:pr-3">
        <Link href="/">
          <Image
            src="/badge-colored.svg"
            width={196}
            height={196}
            alt="WINCバッジ"
          />
        </Link>
        <div className="grow flex flex-col lg:flex-row gap-4 justify-around">
          <div className="flex flex-col items-start">
            <p className="font-black text-xl py-4">Projects</p>
            <Link href="/projects#apps" className="p-2 text-sm font-semibold">
              アプリ開発
            </Link>
            <Link href="/projects#web" className="p-2 text-sm font-semibold">
              ホームページ制作
            </Link>
          </div>
          <div className="flex flex-col items-start">
            <Link href="/contacts" className="p-2 text-sm font-semibold">
              お問い合わせ
            </Link>
          </div>
        </div>
        <SnsLinks iconSize={30} className="flex max-w-7xl gap-8 items-center" />
      </section>
      <section className="flex justify-between items-center w-full max-w-7xl text-end py-16 border-t border-gray-400">
        <p className="text-left text-sm text-gray-400 px-3 font-mono">
          Created and developed only by waseda students. <br />
          No other company, organization, or Waseda University is related.
        </p>
        <p className="text-sm font-semibold p-3 text-gray-600 w-[-webkit-fill-available] lg:w-auto font-mono">
          © 2025 WINC
        </p>
      </section>
    </footer>
  );
}
