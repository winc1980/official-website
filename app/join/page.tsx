import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronDown, TriangleAlert } from "lucide-react";
import PageHeader from "@/components/page-header";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { SNS_LINKS } from "@/components/sns-links";

export const metadata: Metadata = {
  title: "入会案内",
  description:
    "早稲田大学公認ITサークルWINCの入会案内です。体験入会の申し込み方法、会則、年会費の振込先、入会申込書の提出方法をご案内します。",
  alternates: {
    canonical: "/join",
  },
};

const RULES_PDF_URL =
  "https://drive.google.com/file/d/1dlff6pIei06CNiRyBMBkqpD2rYV5up0S/preview";
const APPLICATION_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScfK6bjzBVz98HpJs3a-ngNvFGEbu0zcbPLj8OPn-tq75Uyfw/viewform?usp=header";

const STEPS = [
  { id: "rules", num: "01", label: "会則の確認" },
  { id: "account", num: "02", label: "振込先の確認" },
  { id: "payment", num: "03", label: "振り込み" },
  { id: "application", num: "04", label: "入会申込書を提出" },
  { id: "faq", num: "★", label: "よくあるご質問（FAQ）" },
] as const;

const BANK_ACCOUNT = [
  { label: "金融機関名", value: "みずほ銀行" },
  { label: "金融機関コード", value: "0001" },
  { label: "支店名", value: "津田沼支店" },
  { label: "支店コード", value: "334" },
  { label: "預金種目", value: "普通" },
  { label: "口座番号", value: "1993031" },
  { label: "受取人名", value: "ワセタ゛タ゛イカ゛クコンヒ゜ユ－タケンキユウカイＷＩＮＣ" },
];

const FAQS = [
  {
    q: "新歓に参加しなくても体験入会と本入会はできますか？",
    a: "できます。体験入会はXやInstagramのDMまたはお問い合わせから受け付けています。",
  },
  {
    q: "会費はどのようなことに使われますか？",
    a: "部門のメンバー共通で使用する教材やレンタル費用、部門で必要な備品、サーバー代、新歓、会議室代などに使われます。",
  },
];

const xLink = SNS_LINKS.find((l) => l.label === "公式X")!;
const instagramLink = SNS_LINKS.find((l) => l.label === "公式Instagram")!;

const GUTTER =
  "grow-[1] border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-lg:hidden [--pattern-fg:var(--foreground)]/10";

function Block({
  id,
  titleEn,
  title,
  children,
}: {
  id?: string;
  titleEn: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-b border-foreground/10 px-8 py-12 lg:py-16"
    >
      <h2 className="text-2xl lg:text-4xl font-light mb-8">
        <span className="block font-mono text-sm opacity-60 px-1 uppercase">
          {titleEn}
        </span>
        {title}
      </h2>
      <div className="flex flex-col gap-6 leading-8">{children}</div>
    </section>
  );
}

function StepTitle({ num, label }: { num: string; label: string }) {
  return (
    <span className="flex items-baseline gap-4">
      <span className="font-mono font-bold text-foreground/30">{num}</span>
      {label}
    </span>
  );
}

const textLink = "underline underline-offset-4 hover:text-secondary transition-colors";

export default function Join() {
  return (
    <main className="flex flex-col items-center">
      <PageHeader
        titleJa="入会案内"
        titleEn="join us"
        desc="Since 1967 / International Students Welcome / Recognized by Waseda University"
      />
      <section className="w-full flex flex-col items-center bg-background">
        <div className="w-full max-w-[1440px] flex flex-row items-stretch relative">
          <div className={GUTTER}></div>
          <div className="w-full max-w-7xl">
            <Block titleEn="trial" title="体験入会希望の方">
              <p>
                WINCの
                <Link href={xLink.href} target="_blank" rel="noopener noreferrer" className={textLink}>
                  公式X
                </Link>
                、または
                <Link href={instagramLink.href} target="_blank" rel="noopener noreferrer" className={textLink}>
                  公式Instagram
                </Link>
                に、「体験したい」という旨のメッセージをDMで送ってください。
              </p>
              <div className="flex gap-4">
                {[xLink, instagramLink].map(({ href, label, renderIcon }) => (
                  <Link
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border-2 border-foreground px-4 py-2 font-semibold hover:bg-foreground hover:text-background transition-colors"
                  >
                    {renderIcon(20)}
                    {label}
                  </Link>
                ))}
              </div>
            </Block>

            <Block titleEn="registration" title="入会希望の方">
              <p>以下の手順で入会手続きを行ってください。</p>
              <ol className="flex flex-col border-t border-foreground/10">
                {STEPS.map(({ id, num, label }) => (
                  <li key={id} className="border-b border-foreground/10">
                    <a
                      href={`#${id}`}
                      className="group flex items-center gap-6 py-3 text-lg lg:text-2xl font-bold hover:text-secondary transition-colors"
                    >
                      <span className="font-mono text-4xl lg:text-5xl font-light text-foreground/20 w-16 lg:w-20 group-hover:text-secondary transition-colors">
                        {num}
                      </span>
                      {label}
                    </a>
                  </li>
                ))}
              </ol>
            </Block>

            <Block id="rules" titleEn="step 01" title={<StepTitle num="01" label="会則の確認" />}>
              <p>フォームを提出する前に会則を確認してください。</p>
              <details className="group border-2 border-foreground">
                <summary className="flex items-center justify-between gap-2 p-4 font-semibold cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  会則を確認する
                  <ChevronDown className="transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t-2 border-foreground">
                  <iframe
                    src={RULES_PDF_URL}
                    title="WINC会則"
                    className="w-full h-[500px] lg:h-[700px]"
                    allow="autoplay"
                  />
                </div>
              </details>
            </Block>

            <Block id="account" titleEn="step 02" title={<StepTitle num="02" label="振込先の確認" />}>
              <table className="w-full border-collapse text-sm lg:text-base">
                <tbody>
                  {BANK_ACCOUNT.map(({ label, value }) => (
                    <tr key={label} className="border-y border-foreground/10 even:bg-foreground/[0.03]">
                      <th scope="row" className="w-1/3 py-3 px-4 text-left font-semibold whitespace-nowrap">
                        {label}
                      </th>
                      <td className="py-3 px-4 font-mono break-all">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Block>

            <Block id="payment" titleEn="step 03" title={<StepTitle num="03" label="振り込み" />}>
              <dl className="flex items-baseline gap-6 border-y border-foreground/10 py-4 px-4">
                <dt className="font-semibold">年会費</dt>
                <dd className="text-3xl font-light font-mono">
                  5,000<span className="text-base ml-1">円</span>
                </dd>
              </dl>
              <div role="alert" className="flex gap-3 border-l-4 border-destructive bg-destructive/5 p-4 text-sm leading-7">
                <TriangleAlert className="shrink-0 text-destructive mt-1" size={20} />
                <div>
                  <p>※ 振込手数料は振込人負担となります。</p>
                  <p>
                    ※ 領収書を写真に撮ってください。インターネットで振り込んだ場合は振り込んだことがわかるスクリーンショットを撮ってください。
                  </p>
                </div>
              </div>
            </Block>

            <Block id="application" titleEn="step 04" title={<StepTitle num="04" label="入会申込書の提出" />}>
              <p>
                領収書の画像が用意できたら、以下の振り込み確認フォームを提出してください。このフォームを提出したら、入会手続きは完了です。会費を手渡しされた方は、画像を用意する必要はありません。
              </p>
              <Link href={APPLICATION_FORM_URL} target="_blank" rel="noopener noreferrer" className="w-fit">
                <PrimaryButton>
                  入会申込書を提出する
                  <ArrowRight />
                </PrimaryButton>
              </Link>
            </Block>

            <Block id="faq" titleEn="faq" title={<StepTitle num="★" label="よくあるご質問" />}>
              <div className="flex flex-col border-t border-foreground/10">
                {FAQS.map(({ q, a }) => (
                  <details key={q} className="group border-b border-foreground/10">
                    <summary className="flex items-center justify-between gap-4 py-4 font-semibold cursor-pointer list-none hover:text-secondary transition-colors [&::-webkit-details-marker]:hidden">
                      <span>
                        <span className="font-mono mr-2">Q.</span>
                        {q}
                      </span>
                      <ChevronDown className="shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="pb-4 pl-6">
                      <span className="font-mono mr-2">A.</span>
                      {a}
                    </p>
                  </details>
                ))}
              </div>
            </Block>
          </div>
          <div className={GUTTER}></div>
        </div>
      </section>
    </main>
  );
}
