import { useLayoutEffect } from "react";

import { HOLDBAR_STORE } from "../store/holdbar-store.js";

export const useHoldbarHold = () => {
  useLayoutEffect(() => {
    HOLDBAR_STORE.hold();
    return HOLDBAR_STORE.release;
  }, []);
};
