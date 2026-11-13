import Image from "next/image";
import Link from "next/link";

type SnsLink = {
  href: string;
  label: string;
  renderIcon: (size: number) => React.ReactNode;
};

export const SNS_LINKS: SnsLink[] = [
  {
    href: "https://x.com/waseda_WINC",
    label: "公式X",
    renderIcon: (size) => (
      <Image
        src="/external-assets/x-logo/logo-black.png"
        width={size}
        height={size}
        alt=""
        className="p-0.5"
      />
    ),
  },
];

// LINEは新歓窓口のため、ヘッダー・フッターには出さず入会案内ページ(/join)でのみ使う
export const LINE_LINK: SnsLink = {
  href: "https://line.me/R/ti/p/@954vvdyo",
  label: "公式LINE",
  renderIcon: (size) => (
    <Image
      src="/external-assets/line-logo/line-icon.png"
      width={size}
      height={size}
      alt=""
    />
  ),
};

type Props = {
  iconSize: number;
  className?: string;
  linkClassName?: string;
};

export function SnsLinks({ iconSize, className, linkClassName }: Props) {
  return (
    <div className={className}>
      {SNS_LINKS.map(({ href, label, renderIcon }) => (
        <Link
          key={href}
          href={href}
          aria-label={label}
          className={linkClassName}
          target="_blank"
          rel="noopener noreferrer"
        >
          {renderIcon(iconSize)}
        </Link>
      ))}
    </div>
  );
}
