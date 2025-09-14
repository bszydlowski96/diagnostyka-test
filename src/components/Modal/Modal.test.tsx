import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal", () => {
  it("renders nothing when closed", () => {
    const { container } = render(
      <Modal open={false} onClose={() => {}}>
        <div>Modal content</div>
      </Modal>
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders content when open", () => {
    render(
      <Modal open={true} onClose={() => {}}>
        <div>Modal content</div>
      </Modal>
    );

    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("displays title when provided", () => {
    render(
      <Modal open={true} title="Test Modal" onClose={() => {}}>
        <div>Modal content</div>
      </Modal>
    );

    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn();

    render(
      <Modal open={true} onClose={onClose}>
        <div>Modal content</div>
      </Modal>
    );

    const closeButton = screen.getByLabelText("Zamknij");
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when clicking outside modal", () => {
    const onClose = vi.fn();

    const { container } = render(
      <Modal open={true} onClose={onClose}>
        <div>Modal content</div>
      </Modal>
    );

    const overlay = container.querySelector(".overlay");
    if (overlay) {
      fireEvent.mouseDown(overlay);
      expect(onClose).toHaveBeenCalledTimes(1);
    }
  });

  it("does not call onClose when clicking inside modal", () => {
    const onClose = vi.fn();

    render(
      <Modal open={true} onClose={onClose}>
        <div>Modal content</div>
      </Modal>
    );

    const content = screen.getByText("Modal content");
    fireEvent.mouseDown(content);

    expect(onClose).not.toHaveBeenCalled();
  });

  it("sets body overflow when modal opens and closes", () => {
    const { rerender } = render(
      <Modal open={false} onClose={() => {}}>
        <div>Modal content</div>
      </Modal>
    );

    expect(document.body.style.overflow).toBe("");

    rerender(
      <Modal open={true} onClose={() => {}}>
        <div>Modal content</div>
      </Modal>
    );

    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <Modal open={false} onClose={() => {}}>
        <div>Modal content</div>
      </Modal>
    );

    waitFor(() => {
      expect(document.body.style.overflow).toBe("");
    });
  });

  it("has correct ARIA attributes", () => {
    render(
      <Modal open={true} title="Accessible Modal" onClose={() => {}}>
        <div>Modal content</div>
      </Modal>
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });
});
