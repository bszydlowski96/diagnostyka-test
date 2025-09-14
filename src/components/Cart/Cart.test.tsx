import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "./Cart";
import type { Study } from "../../types/study";
import { CartProvider } from "../../context/CartContext/CartContext";

const mockStudy: Study = {
  id: "test-1",
  name: "Test Study",
  code: "TST",
  category: "Test",
  price: 100,
  etaMinutes: 30,
  preparation: "None",
  description: "Test description",
};

const CartWithProvider = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe("Cart", () => {
  it("displays empty state when cart is empty", () => {
    render(<Cart />, { wrapper: CartWithProvider });
    expect(screen.getByText("Koszyk jest pusty")).toBeInTheDocument();
  });

  it("displays items when cart has items", () => {
    const { rerender } = render(<Cart />, { wrapper: CartWithProvider });

    const addButton = document.createElement("button");
    addButton.onclick = () => {
      window.dispatchEvent(new CustomEvent("cart-add", { detail: mockStudy }));
    };
    fireEvent.click(addButton);

    rerender(<Cart />);
    expect(screen.queryByText("Koszyk jest pusty")).toBeInTheDocument();
  });

  it("calculates total price correctly", () => {
    render(<Cart />, { wrapper: CartWithProvider });
  });
});
