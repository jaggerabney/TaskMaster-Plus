import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";

import Button from "@/components/ui/Button";

describe("Button component", () => {
  // included to make things less messy
  const mockButton = (
    <Button
      text="Login"
      textColor="text-white"
      borderColor="border-white"
      onClick={() => {}}
    />
  );

  it("renders correctly", () => {
    const button = render(mockButton);

    // no act

    expect(button).toMatchSnapshot();
  });

  it("button text is not selectable", () => {
    const { container } = render(mockButton);
    const button = container.querySelector("button");

    // no act

    expect(button).toHaveClass("select-none");
  });

  it("increases in scale when hovered over", async () => {
    const { container } = render(mockButton);
    const button = container.querySelector("button");

    fireEvent.mouseEnter(button as Element);

    expect(button).toHaveClass("hover:scale-[1.03]");
  });
});
