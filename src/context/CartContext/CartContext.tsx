import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";
import type {
  CartState,
  CartAction,
  CartContextValue,
} from "./CartContext.types";
import type { Study } from "../../../src/types/study";

const STORAGE_KEY = "lab-tests-cart";

const initialState: CartState = { items: {} };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD":
      return {
        items: { ...state.items, [action.item.id]: action.item },
      };
    case "REMOVE": {
      const { [action.id]: _, ...rest } = state.items;
      return { items: rest };
    }
    case "CLEAR":
      return { items: {} };
    case "LOAD":
      return action.state;
    default:
      return state;
  }
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartState;
        dispatch({ type: "LOAD", state: parsed });
      }
    } catch (error) {
      console.error("Failed to load cart from storage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save cart to storage:", error);
    }
  }, [state]);

  const value = useMemo<CartContextValue>(() => {
    const items = Object.values(state.items);

    return {
      state,
      add: (item: Study) => dispatch({ type: "ADD", item }),
      remove: (id: string) => dispatch({ type: "REMOVE", id }),
      clear: () => dispatch({ type: "CLEAR" }),
      count: items.length,
      totalPrice: items.reduce((sum, item) => sum + item.price, 0),
      totalEta: items.reduce((sum, item) => sum + item.etaMinutes, 0),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
