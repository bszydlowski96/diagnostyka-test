import StudyList from "./StudyList";
import { CartProvider } from "../../context/CartContext/CartContext";

export default {
  title: "Components/StudyList",
  component: StudyList,
  parameters: {
    layout: "padded",
  },
};

export const Default = {
  render: () => (
    <CartProvider>
      <div style={{ maxWidth: "800px" }}>
        <StudyList />
      </div>
    </CartProvider>
  ),
};
