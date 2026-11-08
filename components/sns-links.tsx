import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";

type SnsLink = {
  href: string;
  label: string;
  renderIcon: (size: number) => React.ReactNode;
};

const SNS_LINKS: SnsLink[] = [
  {
    href: "https://x.com/WINC_waseda",
    label: "公式X - @WINC_waseda",
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
  {
    href: "https://www.instagram.com/waseda_winc/",
    label: "公式Instagram - waseda_winc",
    renderIcon: (size) => <Instagram size={size} />,
  },
  {
    href: "https://line.me/R/ti/p/@954vvdyo",
    label: "公式LINE - @954vvdyo",
    renderIcon: (size) => (
      <Image
        src="/external-assets/line-logo/line-icon.png"
        width={size}
        height={size}
        alt=""
      />
    ),
  },
];

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
