import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import YearlyOptions from "@/components/ui/modals/NewTaskModal/NewTaskRepeatForm/YearlyOptions";
import {
  defaultRepeatFormState,
  YearlyOptionsType,
  monthsOfTheYear,
  setPosDropdownDict,
  daysOfTheWeek
} from "@/utils/Util";

describe("Yearly options component", () => {
  const mockOnSubmit = jest.fn();
  const mockYearlyOptions = (
    <YearlyOptions
      data={defaultRepeatFormState.yearly}
      onChange={mockOnSubmit}
    />
  );
  let mockOnSubmitCalls = 0;

  it("should render correctly", () => {
    const yearlyOptions = render(mockYearlyOptions);

    expect(yearlyOptions).toMatchSnapshot();
  });

  // basis checkboxes

  it("allows user to change basis", async () => {
    render(mockYearlyOptions);
    const byMonthCheckbox = document.getElementById(
      "by-month-checkbox"
    ) as HTMLInputElement;
    const bySetPosCheckbox = document.getElementById(
      "by-setpos-checkbox"
    ) as HTMLInputElement;
    let onChangeData: YearlyOptionsType;

    await userEvent.click(bySetPosCheckbox);
    onChangeData = mockOnSubmit.mock.calls[mockOnSubmitCalls++][0];
    expect(onChangeData.basis).toEqual("BYSETPOS");

    await userEvent.click(byMonthCheckbox);
    onChangeData = mockOnSubmit.mock.calls[mockOnSubmitCalls++][0];
    expect(onChangeData.basis).toEqual("BYMONTH");
  });

  it('sets the basis to "On date" by default', () => {
    render(mockYearlyOptions);
    const byMonthCheckbox = document.getElementById(
      "by-month-checkbox"
    ) as HTMLInputElement;

    expect(byMonthCheckbox.checked).toBe(true);
  });

  // BYMONTH dropdown

  it("allows user to change BYMONTH dropdown", async () => {
    render(mockYearlyOptions);
    const byMonthDropdown = document.getElementById(
      "by-month-dropdown"
    ) as HTMLSelectElement;
    const augustOption = byMonthDropdown.children[7] as HTMLOptionElement;

    await userEvent.selectOptions(byMonthDropdown, augustOption);

    const onChangeData: YearlyOptionsType =
      mockOnSubmit.mock.calls[mockOnSubmitCalls++][0];
    expect(onChangeData.byMonth).toEqual(8);
  });

  it("only has five BYSETPOS options: 1st, 2nd, 3rd, 4th, and Last", () => {
    render(mockYearlyOptions);
    const byMonthDropdown = document.getElementById(
      "by-month-dropdown"
    ) as HTMLSelectElement;
    const byMonthDropdownOptions = [];

    for (const child of byMonthDropdown.children) {
      byMonthDropdownOptions.push(child.textContent);
    }

    expect(monthsOfTheYear).toEqual(byMonthDropdownOptions);
  });

  it('displays "January" as the default BYMONTH value (On date)', () => {
    render(mockYearlyOptions);
    const byMonthDropdown = document.getElementById(
      "by-month-dropdown"
    ) as HTMLSelectElement;

    expect(byMonthDropdown.options[byMonthDropdown.selectedIndex].text).toEqual(
      "January"
    );
  });

  // BYMONTHDAY input

  it("allows user to change BYMONTHDAY input", () => {
    render(mockYearlyOptions);
    const byMonthDayInput = document.getElementById(
      "by-monthday-input"
    ) as HTMLInputElement;

    fireEvent.change(byMonthDayInput, { target: { value: 12 } });

    const onChangeData: YearlyOptionsType =
      mockOnSubmit.mock.calls[mockOnSubmitCalls++][0];
    expect(onChangeData.byMonthDay).toBe(12);
  });

  it("sets BYMONTHDAY to 1 by default", () => {
    render(mockYearlyOptions);
    const byMonthDayInput = document.getElementById(
      "by-monthday-input"
    ) as HTMLInputElement;

    expect(byMonthDayInput.value).toEqual("1");
  });

  // BYSETPOS dropdown

  it("allows user to change BYSETPOS dropdown", async () => {
    render(mockYearlyOptions);
    const bySetPosDropdown = document.getElementById(
      "by-setpos-dropdown"
    ) as HTMLSelectElement;

    await userEvent.selectOptions(
      bySetPosDropdown,
      screen.getByRole("option", { name: "2nd" })
    );

    const onChangeData: YearlyOptionsType =
      mockOnSubmit.mock.calls[mockOnSubmitCalls++][0];
    expect(onChangeData.bySetPos).toEqual(2);
  });

  it("only has five BYSETPOS options: 1st, 2nd, 3rd, 4th, and Last", () => {
    render(mockYearlyOptions);
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
    render(mockYearlyOptions);
    const bySetPosDropdown = document.getElementById(
      "by-setpos-dropdown"
    ) as HTMLSelectElement;

    expect(
      bySetPosDropdown.options[bySetPosDropdown.selectedIndex].text
    ).toEqual("1st");
  });

  // BYDAY dropdown

  it("allows user to change BYDAY dropdown", async () => {
    render(mockYearlyOptions);
    const byDayDropdown = document.getElementById(
      "by-day-dropdown"
    ) as HTMLSelectElement;

    await userEvent.selectOptions(
      byDayDropdown,
      screen.getByRole("option", { name: "Tuesday" })
    );

    const onChangeData: YearlyOptionsType =
      mockOnSubmit.mock.calls[mockOnSubmitCalls++][0];
    expect(onChangeData.byDay).toEqual("TU");
  });

  it("only has seven BYDAY options - one for each day of the week", () => {
    render(mockYearlyOptions);
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
    render(mockYearlyOptions);
    const byDayDropdown = document.getElementById(
      "by-day-dropdown"
    ) as HTMLSelectElement;

    expect(byDayDropdown.options[byDayDropdown.selectedIndex].text).toEqual(
      "Sunday"
    );
  });

  // BYSETMONTH dropdown

  it("allows user to change BYSETMONTH dropdown", async () => {
    render(mockYearlyOptions);
    const bySetMonthDropdown = document.getElementById(
      "by-set-month-dropdown"
    ) as HTMLSelectElement;
    const aprilOption = bySetMonthDropdown.children[3] as HTMLOptionElement;

    await userEvent.selectOptions(bySetMonthDropdown, aprilOption);

    const onChangeData: YearlyOptionsType =
      mockOnSubmit.mock.calls[mockOnSubmitCalls++][0];
    expect(onChangeData.bySetMonth).toEqual(4);
  });

  it("has twelve BYSETMONTH options - one for each month of the year", () => {
    render(mockYearlyOptions);
    const bySetMonthDropdown = document.getElementById(
      "by-set-month-dropdown"
    ) as HTMLSelectElement;
    const bySetMonthDropdownOptions = [];

    for (const child of bySetMonthDropdown.children) {
      bySetMonthDropdownOptions.push(child.textContent);
    }

    expect(monthsOfTheYear).toEqual(bySetMonthDropdownOptions);
  });

  it('displays "January" as the default BYSETMONTH value (On date)', () => {
    render(mockYearlyOptions);
    const bySetMonthDropdown = document.getElementById(
      "by-month-dropdown"
    ) as HTMLSelectElement;

    expect(
      bySetMonthDropdown.options[bySetMonthDropdown.selectedIndex].text
    ).toEqual("January");
  });
});
