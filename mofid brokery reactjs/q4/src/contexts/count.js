import { createGlobalState } from "../lib/createGlobalState";

const [CountProvider, useCount] = createGlobalState((set) => ({
  count: 0,
  increment(num) {
    set((count) => count + num);
  },
  decrementByOne() {
    set((count) => count - 1);
  },
  backToZero() {
    set(0);
  },
}));

export { CountProvider, useCount };
