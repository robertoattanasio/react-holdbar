"use client";

import { useToploaderHold } from "../../hooks/use_toploader_hold.js";

export const ToploaderHold = () => {
  useToploaderHold();

  return <span hidden data-toploader-hold="" />;
};
