import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import UntilOptions from "@/components/ui/modals/NewTaskModal/NewTaskRepeatForm/UntilOptions";
import {
  defaultRepeatFormState,
  getTomorrowsDate,
  UntilOptionsType
} from "@/utils/Util";

describe("Until options component", () => {
  const mockOnChange = jest.fn();
  const mockUntilOptions = (
    <UntilOptions data={defaultRepeatFormState.until} onChange={mockOnChange} />
  );
  let mockOnChangeCalls = 0;

  it("should render correctly", () => {
    const untilOptions = render(mockUntilOptions);

    expect(untilOptions).toMatchSnapshot();
  });

  // Basis dropdown

  it("allows user to change basis dropdown", async () => {
    render(mockUntilOptions);
    const basisDropdown = document.getElementById(
      "until-basis-dropdown"
    ) as HTMLSelectElement;

    await userEvent.selectOptions(
      basisDropdown,
      screen.getByRole("option", { name: "date" })
    );

    const onChangeData: UntilOptionsType =
      mockOnChange.mock.calls[mockOnChangeCalls++][0];
    expect(onChangeData.basis).toEqual("UNTIL");
  });

  it("only has two basis options: after and date", () => {
    render(mockUntilOptions);
    const basisDropdown = document.getElementById(
      "until-basis-dropdown"
    ) as HTMLSelectElement;
    const basisDropdownOptions = [];

    for (const child of basisDropdown.children) {
      basisDropdownOptions.push(child.textContent);
    }

    expect(["after", "date"]).toEqual(basisDropdownOptions);
  });

  it('displays "after" as the default basis value', () => {
    render(mockUntilOptions);
    const basisDropdown = document.getElementById(
      "until-basis-dropdown"
    ) as HTMLSelectElement;

    expect(basisDropdown.options[basisDropdown.selectedIndex].text).toEqual(
      "after"
    );
  });

  it('displays the COUNT input when basis is "after"', async () => {
    render(mockUntilOptions);
    const countInput = document.getElementById(
      "count-input-wrapper"
    ) as HTMLDivElement;

    expect(countInput).toBeInTheDocument();
  });

  it('displays the UNTIL datepicker when basis is "date"', async () => {
    const mockUntilOptionsDateBasis = (
      <UntilOptions
        data={{
          ...defaultRepeatFormState.until,
          basis: "UNTIL"
        }}
        onChange={mockOnChange}
      />
    );

    render(mockUntilOptionsDateBasis);
    const untilDatepicker = document.getElementById(
      "until-datepicker-wrapper"
    ) as HTMLDivElement;

    expect(untilDatepicker).toBeInTheDocument();
  });

  // COUNT input

  it("allows user to change COUNT input", () => {
    render(mockUntilOptions);
    const countInput = document.getElementById(
      "count-input"
    ) as HTMLInputElement;

    fireEvent.change(countInput, { target: { value: 4 } });

    const onChangeData: UntilOptionsType =
      mockOnChange.mock.calls[mockOnChangeCalls++][0];
    expect(onChangeData.count).toBe(4);
  });

  it("sets COUNT input to 1 by default", () => {
    render(mockUntilOptions);
    const countInput = document.getElementById(
      "count-input"
    ) as HTMLInputElement;

    expect(countInput.value).toEqual("1");
  });

  // UNTIL datepicker

  it("allows user to change UNTIL datepicker", () => {
    const mockUntilOptionsDateBasis = (
      <UntilOptions
        data={{
          ...defaultRepeatFormState.until,
          basis: "UNTIL"
        }}
        onChange={mockOnChange}
      />
    );

    render(mockUntilOptionsDateBasis);
    const untilDatepicker = document.getElementById(
      "until-datepicker"
    ) as HTMLInputElement;
    fireEvent.change(untilDatepicker, { target: { value: "2030-03-14" } });

    const onChangeData: UntilOptionsType =
      mockOnChange.mock.calls[mockOnChangeCalls++][0];
    expect(onChangeData.until).toEqual(new Date(2030, 2, 14));
  });

  it("sets UNTIL datepicker to tomorrow by default", () => {
    const mockUntilOptionsDateBasis = (
      <UntilOptions
        data={{
          ...defaultRepeatFormState.until,
          basis: "UNTIL"
        }}
        onChange={mockOnChange}
      />
    );
    const tomorrowAsString = getTomorrowsDate().toISOString().split("T")[0];

    render(mockUntilOptionsDateBasis);
    const untilDatepicker = document.getElementById(
      "until-datepicker"
    ) as HTMLInputElement;

    expect(untilDatepicker.value).toMatch(tomorrowAsString);
  });
});
