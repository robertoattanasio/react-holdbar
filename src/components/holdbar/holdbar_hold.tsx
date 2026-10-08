"use client";

import { useHoldbarHold } from "../../hooks/use_holdbar_hold.js";

export const HoldbarHold = () => {
  useHoldbarHold();

  return <span hidden data-holdbar-hold="" />;
};
