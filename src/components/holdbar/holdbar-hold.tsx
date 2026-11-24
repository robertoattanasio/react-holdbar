"use client";

import { useHoldbarHold } from "../../hooks/use-holdbar-hold.js";

export const HoldbarHold = () => {
  useHoldbarHold();

  return <span hidden data-holdbar-hold="" />;
};
