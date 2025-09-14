import { describe, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import StudyList from "./StudyList";
import * as useStudiesHook from "../../hooks/useStudies/useStudies";
import { CartProvider } from "../../context/CartContext";

const mockStudies = [
  {
    id: "1",
    name: "Morfologia",
    code: "MORF",
    category: "Krew",
    price: 29,
    etaMinutes: 15,
    preparation: "Na czczo",
    description: "Test",
  },
  {
    id: "2",
    name: "TSH",
    code: "TSH",
    category: "Hormony",
    price: 39,
    etaMinutes: 20,
    preparation: "Brak",
    description: "Test 2",
  },
];

vi.mock("../../hooks/useStudies");

describe("StudyList", () => {
  it("filters studies by search query", async () => {
    vi.spyOn(useStudiesHook, "useStudies").mockReturnValue({
      data: mockStudies,
      loading: false,
      error: null,
      reload: vi.fn(),
    });

    render(
      <CartProvider>
        <StudyList />
      </CartProvider>
    );

    const searchInput = screen.getByPlaceholderText(/szukaj/i);
    fireEvent.change(searchInput, { target: { value: "TSH" } });
  });
});
