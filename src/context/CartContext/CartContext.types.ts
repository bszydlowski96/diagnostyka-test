import type { Study } from "../../../src/types/study";

export interface CartState {
  items: Record<string, Study>;
}

export type CartAction =
  | { type: "ADD"; item: Study }
  | { type: "REMOVE"; id: string }
  | { type: "CLEAR" }
  | { type: "LOAD"; state: CartState };

export interface CartContextValue {
  state: CartState;
  add: (item: Study) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
  totalPrice: number;
  totalEta: number;
}
