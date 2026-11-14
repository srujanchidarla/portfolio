"use client";

import { useSyncExternalStore } from "react";

const FORMAT: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" };
const subscribe = () => () => {};

/**
 * A timestamp in the visitor's own time zone. The server can't know that zone, so it renders
 * UTC (labelled), and the browser swaps in local time right after hydration — no mismatch.
 */
export default function LocalTime({ iso }: { iso: string }) {
  const text = useSyncExternalStore(
    subscribe,
    () => new Date(iso).toLocaleString("en-US", FORMAT),
    () => `${new Date(iso).toLocaleString("en-US", { ...FORMAT, timeZone: "UTC" })} UTC`
  );
  return <time dateTime={iso}>{text}</time>;
}
