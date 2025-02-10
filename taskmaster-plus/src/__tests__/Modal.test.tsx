import { fireEvent, render } from "@testing-library/react";

import Modal from "@/components/ui/Modal";

describe("NewListModal component", () => {
  it("renders correctly", () => {
    const modal = render(<Modal onClose={() => {}} />);

    // no act

    expect(modal).toMatchSnapshot();
  });

  it("closes when the background is clicked", () => {
    const mockOnClose = jest.fn();
    render(<Modal onClose={mockOnClose} />);
    const background = document.getElementById("background");

    fireEvent.click(background as Element);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
