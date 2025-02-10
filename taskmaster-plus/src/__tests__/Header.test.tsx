import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import Header from "@/components/ui/Header";

describe("Header component", () => {
  it("renders correctly", () => {
    const header = render(<Header />);

    // no act

    expect(header).toMatchSnapshot();
  });

  it("title component is not selectable", () => {
    const { container } = render(<Header />);
    const title = container.querySelector("h1");

    // no act

    expect(title).toHaveClass("select-none");
  });

  it("button does nothing (for now!)", () => {
    const { container } = render(<Header />);
    const loginButton = container.querySelector("button");

    // no act (for now)

    expect(loginButton).toBeInTheDocument(); // will be changed when auth logic is added
  });
});
