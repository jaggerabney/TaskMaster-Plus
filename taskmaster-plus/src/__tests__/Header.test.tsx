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
    render(<Header />);
    const title = document.getElementById("header-title");

    // no act

    expect(title).toHaveClass("select-none");
  });

  it("button does nothing (for now!)", () => {
    render(<Header />);
    const loginButton = document.getElementById("header-login-button");

    // no act (for now)

    expect(loginButton).toBeEnabled(); // will be changed when auth logic is added
  });
});
