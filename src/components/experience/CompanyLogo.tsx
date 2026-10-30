"use client";

import { useState } from "react";
import type { Experience } from "@/lib/experience";

export default function CompanyLogo({ exp }: { exp: Experience }) {
  const [imgFailed, setImgFailed] = useState(!exp.logoUrl);

  if (!imgFailed && exp.logoUrl) {
    return (
      <img
        src={exp.logoUrl}
        alt=""
        className="xp__logo-img"
        onError={() => setImgFailed(true)}
      />
    );
  }

  return (
    <span className="xp__logo-initials" style={{ color: exp.color }}>
      {exp.companyShort}
    </span>
  );
}
