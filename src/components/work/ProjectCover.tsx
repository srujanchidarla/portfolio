"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const LIVE_WIDTH = 1280;

function LiveHomepage({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setSeen(true);
        observer.disconnect();
      },
      { rootMargin: "240px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [seen]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scale = box.w > 0 ? box.w / LIVE_WIDTH : 0;
  const frameHeight = scale > 0 ? Math.max(1, Math.ceil(box.h / scale)) : 0;

  return (
    <div ref={ref} className={`rh-projects__live${ready ? " is-ready" : ""}`}>
      <div className="rh-projects__live-skeleton" aria-hidden="true" />
      {seen && scale > 0 ? (
        <iframe
          title={`${title} homepage`}
          src={src}
          className="rh-projects__live-frame"
          style={{ width: LIVE_WIDTH, height: frameHeight, transform: `scale(${scale})` }}
          sandbox="allow-scripts allow-same-origin allow-forms"
          referrerPolicy="origin"
          tabIndex={-1}
          onLoad={() => setReady(true)}
        />
      ) : null}
    </div>
  );
}

export default function ProjectCover({
  title,
  image,
  liveSrc,
  color,
  sizes,
}: {
  title: string;
  image?: string;
  liveSrc?: string;
  color: string;
  sizes: string;
}) {
  if (image) {
    return (
      <Image
        src={image}
        alt=""
        fill
        className="work-card__img"
        sizes={sizes}
      />
    );
  }

  if (liveSrc) {
    return <LiveHomepage src={liveSrc} title={title} />;
  }

  return (
    <div className="work-card__fallback" style={{ background: color }} aria-hidden="true">
      <span>{title.charAt(0)}</span>
    </div>
  );
}
