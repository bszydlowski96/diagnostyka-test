import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext";
import type { Study } from "../../types/study";

const mockStudy: Study = {
  id: "1",
  name: "Test",
  code: "TST",
  category: "Test",
  price: 100,
  etaMinutes: 30,
  preparation: "None",
  description: "Test",
};

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds item to cart", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.add(mockStudy);
    });

    expect(result.current.count).toBe(1);
    expect(result.current.totalPrice).toBe(100);
  });

  it("removes item from cart", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.add(mockStudy);
      result.current.remove("1");
    });

    expect(result.current.count).toBe(0);
  });

  it("clears cart", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.add(mockStudy);
      result.current.clear();
    });

    expect(result.current.count).toBe(0);
  });
});
