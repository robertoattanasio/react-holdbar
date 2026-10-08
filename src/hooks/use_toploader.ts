import { useLayoutEffect, useSyncExternalStore } from "react";

import { TOPLOADER_STORE } from "../store/toploader_store.js";

export const useToploader = (minVisible: number) => {
  const state = useSyncExternalStore(TOPLOADER_STORE.subscribe, TOPLOADER_STORE.getState, () => "idle");

  useLayoutEffect(() => TOPLOADER_STORE.setMinVisible(minVisible), [minVisible]);

  return { state, settle: TOPLOADER_STORE.settle };
};
