import type { ReactNode } from "react";

/** Section header: lap number, eyebrow, serif title, and an optional lede. */
export default function LapHeader({
  lap,
  eyebrow,
  title,
  lede,
  id,
  align = "start",
  children,
}: {
  lap: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  id?: string;
  align?: "start" | "center";
  children?: ReactNode;
}) {
  return (
    <header className={`lap-head${align === "center" ? " lap-head--center" : ""}`} data-reveal suppressHydrationWarning>
      <span className="lap-head__num" aria-hidden="true">
        {lap}
      </span>
      <p className="lap-head__eyebrow">
        <span className="lap-head__lap">Lap {lap}</span>
        <span className="lap-head__rule" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className="lap-head__title">
        {title}
      </h2>
      {lede ? <p className="lap-head__lede">{lede}</p> : null}
      {children}
    </header>
  );
}
