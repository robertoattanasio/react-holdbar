"use client";

import { useHoldbarHold } from "../../hooks/use-holdbar-hold.js";
import type { HoldbarHoldProps } from "./type.js";

export const HoldbarHold = ({ delay = 0 }: HoldbarHoldProps) => {
  const isHeld = useHoldbarHold(delay);

  return <span hidden data-holdbar-hold={isHeld ? "" : undefined} />;
};
