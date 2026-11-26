import type { ComponentProps } from "react";

export type HoldbarProps = ComponentProps<"div"> & {
  height?: number;
  fillDuration?: number;
  minVisible?: number;
  detachFromViewTransition?: boolean;
};

export type HoldbarHoldProps = {
  delay?: number;
};
