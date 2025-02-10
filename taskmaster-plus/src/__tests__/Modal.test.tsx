import { fireEvent, render } from "@testing-library/react";

import Modal from "@/components/ui/Modal";

describe("NewListModal component", () => {
  it("renders correctly", () => {
    const modal = render(<Modal onClose={() => {}} />);

    // no act

    expect(modal).toMatchSnapshot();
  });

  it("calls onClose when background is clicked", () => {
    const mockOnClose = jest.fn();
    const { container } = render(<Modal onClose={mockOnClose} />);
    const background = container.querySelector("div") as HTMLDivElement;

    fireEvent.click(background);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
