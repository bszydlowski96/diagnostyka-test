import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
  useRef,
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
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          items: { ...state.items, [action.item.id]: action.item },
        })
      );
      return {
        items: { ...state.items, [action.item.id]: action.item },
      };
    case "REMOVE": {
      const { [action.id]: _, ...rest } = state.items;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: rest }));
      return { items: rest };
    }
    case "CLEAR":
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: {} }));
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
  const isInitialized = useRef(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartState;
        dispatch({ type: "LOAD", state: parsed });
      }
    } catch (error) {
      console.error("Failed to load cart from storage:", error);
    } finally {
      isInitialized.current = true;
    }
  }, []);

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
