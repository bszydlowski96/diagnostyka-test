import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("renders with default placeholder", () => {
    render(<SearchBar value="" onChange={() => {}} />);

    const input = screen.getByPlaceholderText("Szukaj po nazwie lub kodzie...");
    expect(input).toBeInTheDocument();
  });

  it("renders with custom placeholder", () => {
    render(
      <SearchBar
        value=""
        onChange={() => {}}
        placeholder="Custom placeholder"
      />
    );

    const input = screen.getByPlaceholderText("Custom placeholder");
    expect(input).toBeInTheDocument();
  });

  it("displays the current value", () => {
    render(<SearchBar value="test query" onChange={() => {}} />);

    const input = screen.getByDisplayValue("test query");
    expect(input).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);

    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "new search" } });

    expect(onChange).toHaveBeenCalledWith("new search");
  });

  it("shows clear button when value is not empty", () => {
    render(<SearchBar value="test" onChange={() => {}} />);

    const clearButton = screen.getByLabelText("Wyczyść wyszukiwanie");
    expect(clearButton).toBeInTheDocument();
  });

  it("hides clear button when value is empty", () => {
    render(<SearchBar value="" onChange={() => {}} />);

    const clearButton = screen.queryByLabelText("Wyczyść wyszukiwanie");
    expect(clearButton).not.toBeInTheDocument();
  });

  it("clears value when clear button is clicked", () => {
    const onChange = vi.fn();
    render(<SearchBar value="test" onChange={onChange} />);

    const clearButton = screen.getByLabelText("Wyczyść wyszukiwanie");
    fireEvent.click(clearButton);

    expect(onChange).toHaveBeenCalledWith("");
  });

  it("displays keyboard shortcut hint", () => {
    render(<SearchBar value="" onChange={() => {}} />);

    const shortcut = screen.getByText("Ctrl + /");
    expect(shortcut).toBeInTheDocument();
  });

  it("focuses input when Ctrl+/ is pressed", () => {
    render(<SearchBar value="" onChange={() => {}} />);

    const input = screen.getByRole("searchbox") as HTMLInputElement;

    fireEvent.keyDown(window, { key: "/", ctrlKey: true });

    waitFor(() => {
      expect(document.activeElement).toBe(input);
    });
  });

  it("has correct aria-label", () => {
    render(<SearchBar value="" onChange={() => {}} />);

    const input = screen.getByLabelText("Szukaj badań");
    expect(input).toBeInTheDocument();
  });

  it("handles rapid value changes", () => {
    const onChange = vi.fn();
    const { rerender } = render(<SearchBar value="" onChange={onChange} />);

    const input = screen.getByRole("searchbox");

    fireEvent.change(input, { target: { value: "a" } });
    rerender(<SearchBar value="a" onChange={onChange} />);

    fireEvent.change(input, { target: { value: "ab" } });
    rerender(<SearchBar value="ab" onChange={onChange} />);

    fireEvent.change(input, { target: { value: "abc" } });

    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenNthCalledWith(1, "a");
    expect(onChange).toHaveBeenNthCalledWith(2, "ab");
    expect(onChange).toHaveBeenNthCalledWith(3, "abc");
  });
});
