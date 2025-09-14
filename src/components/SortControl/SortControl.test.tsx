import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SortControl from "./SortControl";

describe("SortControl", () => {
  it("renders with label", () => {
    render(<SortControl value="asc" onChange={() => {}} />);

    const label = screen.getByText("Sortowanie");
    expect(label).toBeInTheDocument();
  });

  it("displays both sort buttons", () => {
    render(<SortControl value="asc" onChange={() => {}} />);

    const ascButton = screen.getByLabelText("Sortuj rosnąco");
    const descButton = screen.getByLabelText("Sortuj malejąco");

    expect(ascButton).toBeInTheDocument();
    expect(descButton).toBeInTheDocument();
  });

  it('calls onChange with "asc" when ascending button is clicked', () => {
    const onChange = vi.fn();

    render(<SortControl value="desc" onChange={onChange} />);

    const ascButton = screen.getByLabelText("Sortuj rosnąco");
    fireEvent.click(ascButton);

    expect(onChange).toHaveBeenCalledWith("asc");
  });

  it('calls onChange with "desc" when descending button is clicked', () => {
    const onChange = vi.fn();

    render(<SortControl value="asc" onChange={onChange} />);

    const descButton = screen.getByLabelText("Sortuj malejąco");
    fireEvent.click(descButton);

    expect(onChange).toHaveBeenCalledWith("desc");
  });

  it("displays button text", () => {
    render(<SortControl value="asc" onChange={() => {}} />);

    expect(screen.getByText("Rosnąco")).toBeInTheDocument();
    expect(screen.getByText("Malejąco")).toBeInTheDocument();
  });

  it("has correct title attributes", () => {
    render(<SortControl value="asc" onChange={() => {}} />);

    const ascButton = screen.getByTitle("Cena: rosnąco");
    const descButton = screen.getByTitle("Cena: malejąco");

    expect(ascButton).toBeInTheDocument();
    expect(descButton).toBeInTheDocument();
  });

  it("handles rapid clicks", () => {
    const onChange = vi.fn();

    render(<SortControl value="asc" onChange={onChange} />);

    const ascButton = screen.getByLabelText("Sortuj rosnąco");
    const descButton = screen.getByLabelText("Sortuj malejąco");

    fireEvent.click(descButton);
    fireEvent.click(ascButton);
    fireEvent.click(descButton);

    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenNthCalledWith(1, "desc");
    expect(onChange).toHaveBeenNthCalledWith(2, "asc");
    expect(onChange).toHaveBeenNthCalledWith(3, "desc");
  });

  it("has icons in buttons", () => {
    const { container } = render(
      <SortControl value="asc" onChange={() => {}} />
    );

    const icons = container.querySelectorAll("svg");
    expect(icons).toHaveLength(2);
  });

  it("is keyboard accessible", () => {
    const onChange = vi.fn();

    render(<SortControl value="asc" onChange={onChange} />);

    const ascButton = screen.getByLabelText("Sortuj rosnąco");
    const descButton = screen.getByLabelText("Sortuj malejąco");

    // Tab navigation
    ascButton.focus();
    expect(document.activeElement).toBe(ascButton);

    // Enter key
    fireEvent.keyDown(descButton, { key: "Enter" });
    fireEvent.click(descButton);

    expect(onChange).toHaveBeenCalledWith("desc");
  });
});
