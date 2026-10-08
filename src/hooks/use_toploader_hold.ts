import { useLayoutEffect } from "react";

import { TOPLOADER_STORE } from "../store/toploader_store.js";

export const useToploaderHold = () => {
  useLayoutEffect(() => {
    TOPLOADER_STORE.hold();
    return TOPLOADER_STORE.release;
  }, []);
};
