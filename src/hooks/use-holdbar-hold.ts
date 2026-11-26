import { useLayoutEffect, useState } from "react";

import { HOLDBAR_STORE } from "../store/holdbar-store.js";

export const useHoldbarHold = (delay: number) => {
  const [isHeld, setIsHeld] = useState(delay === 0);

  useLayoutEffect(() => {
    let held = delay === 0;
    if (held) HOLDBAR_STORE.hold();

    const timeout = window.setTimeout(() => {
      if (held) return;

      held = true;
      HOLDBAR_STORE.hold();
      setIsHeld(true);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      if (held) HOLDBAR_STORE.release();
      setIsHeld(delay === 0);
    };
  }, [delay]);

  return isHeld;
};
