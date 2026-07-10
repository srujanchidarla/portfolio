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
        className="exp-logo__img"
        onError={() => setImgFailed(true)}
      />
    );
  }

  return (
    <span className="exp-logo__initials" style={{ color: exp.color }}>
      {exp.companyShort}
    </span>
  );
}
