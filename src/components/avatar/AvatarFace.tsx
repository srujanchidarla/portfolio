"use client";

export default function AvatarFace({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="avatar-face"
    >
      <defs>
        <linearGradient id="avatar-bg" x1="0" y1="0" x2="80" y2="80">
          <stop offset="0%" stopColor="#1a3a5c" />
          <stop offset="100%" stopColor="#0e1f33" />
        </linearGradient>
        <linearGradient id="avatar-shirt" x1="20" y1="52" x2="60" y2="80">
          <stop offset="0%" stopColor="#3b9eff" />
          <stop offset="100%" stopColor="#0080FF" />
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="40" fill="url(#avatar-bg)" />
      <ellipse cx="40" cy="78" rx="28" ry="18" fill="url(#avatar-shirt)" />
      <circle cx="40" cy="32" r="18" fill="#c9a882" />
      <path
        d="M22 30c2-10 10-16 18-16s16 6 18 16c-4-2-10-3-18-3s-14 1-18 3z"
        fill="#1a1208"
      />
      <ellipse cx="33" cy="33" rx="2" ry="2.5" fill="#1a1208" />
      <ellipse cx="47" cy="33" rx="2" ry="2.5" fill="#1a1208" />
      <path
        d="M34 40c2 2 10 2 12 0"
        stroke="#9a7050"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="36" y="48" width="8" height="6" rx="2" fill="#c9a882" />
    </svg>
  );
}
