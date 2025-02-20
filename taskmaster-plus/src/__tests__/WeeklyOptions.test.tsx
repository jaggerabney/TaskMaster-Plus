import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import WeeklyOptions from "@/components/ui/modals/NewTaskModal/NewTaskRepeatForm/WeeklyOptions";

describe("Weekly options component", () => {
  const mockOnSubmit = jest.fn();
  const mockWeeklyOptions = (
    <WeeklyOptions data={{ byDay: [] }} onChange={mockOnSubmit} />
  );

  it("should render correctly", () => {
    const weeklyOptions = render(mockWeeklyOptions);

    expect(weeklyOptions).toMatchSnapshot();
  });

  it("allows user to change values", async () => {
    render(mockWeeklyOptions);
    const thuButton = screen.getByText("Thu");
    await userEvent.click(thuButton);

    const onChangeData: string = mockOnSubmit.mock.calls[0][0];
    expect(onChangeData).toEqual("Thu");
  });

  it("should have no days selected by default", () => {
    render(mockWeeklyOptions);
    const weeklyOptions = document.getElementById(
      "weekly-options"
    ) as HTMLUListElement;

    for (const option of weeklyOptions.children) {
      expect(option).toHaveClass("text-redNCS");
    }
  });
});
