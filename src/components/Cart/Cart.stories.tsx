import Cart from "./Cart";
import { CartProvider } from "../../context/CartContext/CartContext";

export default {
  title: "Components/Cart",
  component: Cart,
  decorators: [
    (Story: any) => (
      <CartProvider>
        <Story />
      </CartProvider>
    ),
  ],
};

export const Empty = {};
