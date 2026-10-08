import { useLayoutEffect, useSyncExternalStore } from "react";

import { HOLDBAR_STORE } from "../store/holdbar_store.js";

export const useHoldbar = (minVisible: number) => {
  const state = useSyncExternalStore(HOLDBAR_STORE.subscribe, HOLDBAR_STORE.getState, () => "idle");

  useLayoutEffect(() => HOLDBAR_STORE.setMinVisible(minVisible), [minVisible]);

  return { state, settle: HOLDBAR_STORE.settle };
};
