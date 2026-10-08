import type { HoldbarState } from "./type.js";

let state: HoldbarState = "idle";
let holds = 0;
let startedAt = 0;
let minVisible = 0;
let finishTimeout: number | undefined;

const listeners = new Set<() => void>();

const setState = (next: HoldbarState) => {
  state = next;
  listeners.forEach((listener) => listener());
};

const start = () => {
  startedAt = Date.now();
  setState("loading");
};

const finish = () => {
  if (state === "loading") setState("finishing");
};

export const HOLDBAR_STORE = {
  hold: () => {
    holds += 1;
    window.clearTimeout(finishTimeout);
    if (state === "idle") start();
  },
  release: () => {
    holds -= 1;
    if (holds === 0) finishTimeout = window.setTimeout(finish, minVisible - (Date.now() - startedAt));
  },
  settle: () => (holds > 0 ? start() : setState("idle")),
  setMinVisible: (ms: number) => {
    minVisible = ms;
  },
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => void listeners.delete(listener);
  },
  getState: () => state,
};
