import type { ComponentPropsWithoutRef } from "react";

export type ToploaderProps = ComponentPropsWithoutRef<"div"> & {
  height?: number;
  fillDuration?: number;
  minVisible?: number;
  detachFromViewTransition?: boolean;
};
