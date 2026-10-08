import type { ComponentPropsWithoutRef } from "react";

export type HoldbarProps = ComponentPropsWithoutRef<"div"> & {
  height?: number;
  fillDuration?: number;
  minVisible?: number;
  detachFromViewTransition?: boolean;
};
