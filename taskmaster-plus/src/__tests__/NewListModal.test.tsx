import { render, fireEvent } from "@testing-library/react";

import NewListModal from "@/components/ui/modals/NewListModal";

describe("New list modal component", () => {
  it("renders correctly", () => {
    const newListModal = render(<NewListModal onClose={() => {}} />);

    // no act

    expect(newListModal).toMatchSnapshot();
  });

  it("cancel button should call onClose", () => {
    const mockOnClose = jest.fn();
    const { container } = render(<NewListModal onClose={mockOnClose} />);
    const closeButton = container.querySelector("button") as HTMLButtonElement;

    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("create list button should close modal", () => {
    const mockOnClose = jest.fn();
    const { container } = render(<NewListModal onClose={mockOnClose} />);
    const createButton = container.querySelectorAll(
      "button"
    )[1] as HTMLButtonElement;

    fireEvent.click(createButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
