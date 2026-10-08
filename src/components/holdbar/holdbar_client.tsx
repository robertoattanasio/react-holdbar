"use client";

import type { CSSProperties } from "react";

import { useHoldbar } from "../../hooks/use_holdbar.js";
import type { HoldbarProps } from "./type.js";

export const HoldbarClient = ({
  height,
  fillDuration,
  minVisible = 0,
  detachFromViewTransition = false,
  style,
  onAnimationEnd,
  children,
  ...rest
}: HoldbarProps) => {
  const { state, settle } = useHoldbar(minVisible);

  return (
    <div
      {...rest}
      style={
        {
          ...style,
          "--holdbar-height": height === undefined ? undefined : `${height}px`,
          "--holdbar-fill-duration": fillDuration === undefined ? undefined : `${fillDuration}ms`,
        } as CSSProperties
      }
      onAnimationEnd={(event) => {
        if (event.animationName === "holdbar-finish") settle();
        onAnimationEnd?.(event);
      }}
      aria-hidden={true}
      data-holdbar=""
      data-holdbar-state={state}
      data-holdbar-detached={detachFromViewTransition ? "" : undefined}
    >
      {children}
    </div>
  );
};
