import Image from "next/image";

/** Apple's official "Download on the App Store" badge (black), linking to the listing. */
export default function AppStoreBadge({ href, height = 40 }: { href: string; height?: number }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="appstore-badge">
      <Image
        src="/images/black.svg"
        alt="Download on the App Store"
        width={Math.round((height * 119.66407) / 40)}
        height={height}
        unoptimized
      />
    </a>
  );
}
