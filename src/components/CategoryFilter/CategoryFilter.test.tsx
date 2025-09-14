import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CategoryFilter from "./CategoryFilter";

describe("CategoryFilter", () => {
  const mockOptions = ["Wszystkie", "Krew", "Hormony", "Mocz"];

  it("renders with label", () => {
    render(
      <CategoryFilter
        value="Wszystkie"
        options={mockOptions}
        onChange={() => {}}
      />
    );

    const label = screen.getByText("Kategoria");
    expect(label).toBeInTheDocument();
  });

  it("displays all options", () => {
    render(
      <CategoryFilter
        value="Wszystkie"
        options={mockOptions}
        onChange={() => {}}
      />
    );

    const select = screen.getByRole("combobox");
    const options = select.querySelectorAll("option");

    expect(options).toHaveLength(4);
    expect(options[0]).toHaveTextContent("Wszystkie");
    expect(options[1]).toHaveTextContent("Krew");
    expect(options[2]).toHaveTextContent("Hormony");
    expect(options[3]).toHaveTextContent("Mocz");
  });

  it("shows current selected value", () => {
    render(
      <CategoryFilter
        value="Hormony"
        options={mockOptions}
        onChange={() => {}}
      />
    );

    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("Hormony");
  });

  it("calls onChange when selection changes", () => {
    const onChange = vi.fn();

    render(
      <CategoryFilter
        value="Wszystkie"
        options={mockOptions}
        onChange={onChange}
      />
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "Krew" } });

    expect(onChange).toHaveBeenCalledWith("Krew");
  });

  it("has correct aria-label", () => {
    render(
      <CategoryFilter
        value="Wszystkie"
        options={mockOptions}
        onChange={() => {}}
      />
    );

    const select = screen.getByLabelText("Filtruj po kategorii");
    expect(select).toBeInTheDocument();
  });

  it("handles empty options array", () => {
    render(<CategoryFilter value="" options={[]} onChange={() => {}} />);

    const select = screen.getByRole("combobox");
    const options = select.querySelectorAll("option");

    expect(options).toHaveLength(0);
  });

  it("handles single option", () => {
    render(
      <CategoryFilter
        value="Wszystkie"
        options={["Wszystkie"]}
        onChange={() => {}}
      />
    );

    const select = screen.getByRole("combobox");
    const options = select.querySelectorAll("option");

    expect(options).toHaveLength(1);
  });

  it("handles rapid selection changes", () => {
    const onChange = vi.fn();

    render(
      <CategoryFilter
        value="Wszystkie"
        options={mockOptions}
        onChange={onChange}
      />
    );

    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: "Krew" } });
    fireEvent.change(select, { target: { value: "Hormony" } });
    fireEvent.change(select, { target: { value: "Mocz" } });

    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenNthCalledWith(1, "Krew");
    expect(onChange).toHaveBeenNthCalledWith(2, "Hormony");
    expect(onChange).toHaveBeenNthCalledWith(3, "Mocz");
  });

  it("maintains selection when options change", () => {
    const { rerender } = render(
      <CategoryFilter value="Krew" options={mockOptions} onChange={() => {}} />
    );

    let select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("Krew");

    const newOptions = ["Wszystkie", "Krew", "Hormony", "Mocz", "Biochemia"];

    rerender(
      <CategoryFilter value="Krew" options={newOptions} onChange={() => {}} />
    );

    select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("Krew");

    const options = select.querySelectorAll("option");
    expect(options).toHaveLength(5);
  });

  it("is accessible via keyboard", () => {
    const onChange = vi.fn();

    render(
      <CategoryFilter
        value="Wszystkie"
        options={mockOptions}
        onChange={onChange}
      />
    );

    const select = screen.getByRole("combobox");

    // Focus na select
    select.focus();
    expect(document.activeElement).toBe(select);

    // Symulacja nawigacji klawiaturą
    fireEvent.keyDown(select, { key: "ArrowDown" });
    fireEvent.change(select, { target: { value: "Krew" } });

    expect(onChange).toHaveBeenCalledWith("Krew");
  });
});
