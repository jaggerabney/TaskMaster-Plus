import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MonthlyOptions from "@/components/ui/modals/NewTaskModal/NewTaskRepeatForm/MonthlyOptions";
import {
  defaultRepeatFormState,
  setPosDropdownDict,
  MonthlyOptionsType,
  daysOfTheWeek
} from "@/utils/Util";

describe("Monthly options component", () => {
  const mockOnChange = jest.fn();
  const mockMonthlyOptions = (
    <MonthlyOptions
      data={defaultRepeatFormState.monthly}
      onChange={mockOnChange}
    />
  );
  let mockOnChangeCalls = 0;

  it("should render correctly", () => {
    const monthlyOptions = render(mockMonthlyOptions);

    expect(monthlyOptions).toMatchSnapshot();
  });

  // basis checkboxes

  it("allows user to change basis", async () => {
    render(mockMonthlyOptions);
    const byMonthDayCheckbox = document.getElementById(
      "by-monthday-checkbox"
    ) as HTMLInputElement;
    const bySetPosCheckbox = document.getElementById(
      "by-setpos-checkbox"
    ) as HTMLInputElement;
    let onChangeData: MonthlyOptionsType;

    await userEvent.click(bySetPosCheckbox);
    onChangeData = mockOnChange.mock.calls[mockOnChangeCalls++][0];
    expect(onChangeData.basis).toEqual("BYSETPOS");

    await userEvent.click(byMonthDayCheckbox);
    onChangeData = mockOnChange.mock.calls[mockOnChangeCalls++][0];
    expect(onChangeData.basis).toEqual("BYMONTHDAY");
  });

  it('sets the basis to "On day" by default', () => {
    render(mockMonthlyOptions);
    const byMonthDayCheckbox = document.getElementById(
      "by-monthday-checkbox"
    ) as HTMLInputElement;

    expect(byMonthDayCheckbox.checked).toBe(true);
  });

  // BYMONTHDAY input

  it("allows user to change BYMONTHDAY input", () => {
    render(mockMonthlyOptions);
    const byMonthDayInput = document.getElementById(
      "by-monthday-input"
    ) as HTMLInputElement;

    fireEvent.change(byMonthDayInput, { target: { value: 3 } });

    const onChangeData: MonthlyOptionsType =
      mockOnChange.mock.calls[mockOnChangeCalls++][0];
    expect(onChangeData.byMonthDay).toBe(3);
  });

  it("sets BYMONTHDAY to 1 by default", () => {
    render(mockMonthlyOptions);
    const byMonthDayInput = document.getElementById(
      "by-monthday-input"
    ) as HTMLInputElement;

    expect(byMonthDayInput.value).toEqual("1");
  });

  // BYSETPOS dropdown

  it("allows user to change BYSETPOS dropdown", async () => {
    render(mockMonthlyOptions);
    const bySetPosDropdown = document.getElementById(
      "by-setpos-dropdown"
    ) as HTMLSelectElement;

    await userEvent.selectOptions(
      bySetPosDropdown,
      screen.getByRole("option", { name: "4th" })
    );

    const onChangeData: MonthlyOptionsType =
      mockOnChange.mock.calls[mockOnChangeCalls++][0];
    expect(onChangeData.bySetPos).toEqual(4);
  });

  it("only has five BYSETPOS options: 1st, 2nd, 3rd, 4th, and Last", () => {
    render(mockMonthlyOptions);
    const bySetPosDropdown = document.getElementById(
      "by-setpos-dropdown"
    ) as HTMLSelectElement;
    const setPosDropdownDictKeys = setPosDropdownDict.keys().toArray();
    const bySetPosDropdownOptions = [];

    for (const child of bySetPosDropdown.children) {
      bySetPosDropdownOptions.push(child.textContent);
    }

    expect(setPosDropdownDictKeys).toEqual(bySetPosDropdownOptions);
  });

  it('displays "1st" as the default BYSETPOS value', () => {
    render(mockMonthlyOptions);
    const bySetPosDropdown = document.getElementById(
      "by-setpos-dropdown"
    ) as HTMLSelectElement;

    expect(
      bySetPosDropdown.options[bySetPosDropdown.selectedIndex].text
    ).toEqual("1st");
  });

  // BYDAY dropdown

  it("allows user to change BYDAY dropdown", async () => {
    render(mockMonthlyOptions);
    const byDayDropdown = document.getElementById(
      "by-day-dropdown"
    ) as HTMLSelectElement;

    await userEvent.selectOptions(
      byDayDropdown,
      screen.getByRole("option", { name: "Friday" })
    );

    const onChangeData: MonthlyOptionsType =
      mockOnChange.mock.calls[mockOnChangeCalls++][0];
    expect(onChangeData.byDay).toEqual("FR");
  });

  it("only has seven BYDAY options - one for each day of the week", () => {
    render(mockMonthlyOptions);
    const byDayDropdown = document.getElementById(
      "by-day-dropdown"
    ) as HTMLSelectElement;
    const byDayDropdownOptions = [];

    for (const child of byDayDropdown.children) {
      byDayDropdownOptions.push(child.textContent);
    }

    expect(daysOfTheWeek).toEqual(byDayDropdownOptions);
  });

  it('displays "Sunday" as the default BYDAY value', () => {
    render(mockMonthlyOptions);
    const byDayDropdown = document.getElementById(
      "by-day-dropdown"
    ) as HTMLSelectElement;

    expect(byDayDropdown.options[byDayDropdown.selectedIndex].text).toEqual(
      "Sunday"
    );
  });
});
