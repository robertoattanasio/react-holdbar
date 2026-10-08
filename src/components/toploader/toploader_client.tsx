"use client";

import type { CSSProperties } from "react";

import { useToploader } from "../../hooks/use_toploader.js";
import type { ToploaderProps } from "./type.js";

export const ToploaderClient = ({
  height,
  fillDuration,
  minVisible = 0,
  detachFromViewTransition = false,
  style,
  onAnimationEnd,
  children,
  ...rest
}: ToploaderProps) => {
  const { state, settle } = useToploader(minVisible);

  return (
    <div
      {...rest}
      style={
        {
          ...style,
          "--toploader-height": height === undefined ? undefined : `${height}px`,
          "--toploader-fill-duration": fillDuration === undefined ? undefined : `${fillDuration}ms`,
        } as CSSProperties
      }
      onAnimationEnd={(event) => {
        if (event.animationName === "toploader-finish") settle();
        onAnimationEnd?.(event);
      }}
      aria-hidden={true}
      data-toploader=""
      data-toploader-state={state}
      data-toploader-detached={detachFromViewTransition ? "" : undefined}
    >
      {children}
    </div>
  );
};
