import type { CSSProperties } from "react";
import { Brain, Compass, Flame, Globe, Send, Sprout, Sparkles, type LucideIcon } from "lucide-react";

/** Each project's icon and the motion that suits it (see `.glyph--*` in moves.css). */
const GLYPHS: Record<string, { Icon: LucideIcon; move: string; label: string }> = {
  algochronicle: { Icon: Flame, move: "flicker", label: "Daily streak" },
  campfirechai: { Icon: Compass, move: "swing", label: "Find your crew" },
  jobhuntos: { Icon: Send, move: "fly", label: "Apply faster" },
  neocortex: { Icon: Brain, move: "pulse", label: "15 agents" },
  agriwise: { Icon: Sprout, move: "grow", label: "Grow smarter" },
  studyglobal: { Icon: Globe, move: "spin", label: "Study abroad" },
};

/** Round sticker that sits on a project's cover; animates on reveal and on hover. */
export default function ProjectGlyph({ id, color }: { id: string; color: string }) {
  const glyph = GLYPHS[id] ?? { Icon: Sparkles, move: "pulse", label: "Project" };
  const { Icon } = glyph;
  return (
    <span
      className={`glyph glyph--${glyph.move}`}
      style={{ "--proj-color": color } as CSSProperties}
      title={glyph.label}
      aria-hidden="true"
    >
      <span className="glyph__icon">
        <Icon size={22} strokeWidth={2} />
      </span>
      <span className="glyph__label">{glyph.label}</span>
    </span>
  );
}
