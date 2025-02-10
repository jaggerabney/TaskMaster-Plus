import { render } from "@testing-library/react";

import Card from "@/components/ui/Card";

describe("Card component", () => {
  it("renders correctly", () => {
    const card = render(<Card />);

    // no act

    expect(card).toMatchSnapshot();
  });
});
