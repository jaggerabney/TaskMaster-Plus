import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NewTaskRepeatForm from "@/components/ui/modals/NewTaskModal/NewTaskRepeatForm/NewTaskRepeatForm";
import {
  RepeatFormStateType,
  defaultRepeatFormState,
  freqs
} from "@/utils/Util";
import React from "react";

describe("New task repeat form component", () => {
  const mockOnChange = jest.fn();
  const mockNewTaskRepeatForm = (
    <NewTaskRepeatForm data={defaultRepeatFormState} onChange={mockOnChange} />
  );

  it("should render correctly", () => {
    const newTaskRepeatForm = render(mockNewTaskRepeatForm);

    expect(newTaskRepeatForm).toMatchSnapshot();
  });

  // Repeat checkbox

  // NewTaskRepeatForm is a controlled component, so to check that it's working correctly,
  // the data passed to mockOnChange is examined rather than the render component
  it("allows user to change repeat checkbox value", async () => {
    render(mockNewTaskRepeatForm);
    const repeatCheckbox = document.getElementById(
      "repeat-checkbox"
    ) as HTMLInputElement;

    await userEvent.click(repeatCheckbox);

    const onChangeData: RepeatFormStateType = mockOnChange.mock.calls[0][0];
    expect(onChangeData.isVisible).toBe(true);
  });

  it("shows the repeat form when the repeat checkbox is checked", () => {
    render(
      <NewTaskRepeatForm
        data={{
          ...defaultRepeatFormState,
          isVisible: true
        }}
        onChange={() => {}}
      />
    );
    const repeatCheckbox = document.getElementById(
      "repeat-checkbox"
    ) as HTMLInputElement;
    const untilOptions = document.getElementById(
      "until-wrapper"
    ) as HTMLDivElement;

    expect(repeatCheckbox.checked).toBe(true);
    expect(untilOptions).toBeInTheDocument();
  });

  it("hides the repeat form when the repeat checkbox is unchecked", () => {
    render(
      <NewTaskRepeatForm
        data={{
          ...defaultRepeatFormState,
          isVisible: false
        }}
        onChange={() => {}}
      />
    );
    const repeatCheckbox = document.getElementById(
      "repeat-checkbox"
    ) as HTMLInputElement;
    const untilOptions = document.getElementById(
      "until-wrapper"
    ) as HTMLDivElement;

    expect(repeatCheckbox.checked).toBe(false);
    expect(untilOptions).not.toBeInTheDocument();
  });

  it("leaves the repeat checkbox unchecked by default", () => {
    render(mockNewTaskRepeatForm);
    const repeatCheckbox = document.getElementById(
      "repeat-checkbox"
    ) as HTMLInputElement;

    expect(repeatCheckbox.checked).toBe(false);
  });

  // Frequency dropdown

  it("allows the user to change the frequency", async () => {
    render(
      <NewTaskRepeatForm
        data={{
          ...defaultRepeatFormState,
          isVisible: true
        }}
        onChange={() => {}}
      />
    );
    const freqDropdown = document.getElementById(
      "freq-dropdown"
    ) as HTMLSelectElement;
    const optionToSelect = freqs[2].toLowerCase(); // monthly

    await userEvent.selectOptions(
      freqDropdown,
      screen.getByRole("option", { name: optionToSelect })
    );

    const monthlyOption = screen.queryByText(optionToSelect);
    expect(monthlyOption).not.toBeNull();
  });

  it("lists four frequencies: daily, weekly, monthly, and yearly", () => {
    const newTaskRepeatForm = (
      <NewTaskRepeatForm
        data={{
          ...defaultRepeatFormState,
          isVisible: true
        }}
        onChange={() => {}}
      />
    );

    render(newTaskRepeatForm);
    const freqDropdown = document.getElementById(
      "freq-dropdown"
    ) as HTMLSelectElement;

    expect(freqs.length).toEqual(freqDropdown.children.length);
  });

  it('displays "daily" as the default frequency', () => {
    const newTaskRepeatForm = (
      <NewTaskRepeatForm
        data={{
          ...defaultRepeatFormState,
          isVisible: true
        }}
        onChange={() => {}}
      />
    );

    render(newTaskRepeatForm);
    const freqDropdown = document.getElementById(
      "freq-dropdown"
    ) as HTMLSelectElement;
    const selectedOption = freqDropdown.value.toLowerCase();

    expect(selectedOption).toEqual("daily");
  });

  it("displays the WeeklyOptions component when frequency is set to weekly", () => {
    const newTaskRepeatForm = (
      <NewTaskRepeatForm
        data={{
          ...defaultRepeatFormState,
          isVisible: true,
          freq: "WEEKLY"
        }}
        onChange={() => {}}
      />
    );

    render(newTaskRepeatForm);
    const freqDropdown = document.getElementById(
      "freq-dropdown"
    ) as HTMLSelectElement;
    const weeklyOptions = document.getElementById(
      "weekly-options"
    ) as HTMLUListElement;
    const selectedOption = freqDropdown.value.toLowerCase();

    expect(selectedOption).toEqual("weekly");
    expect(weeklyOptions).toBeInTheDocument();
  });

  it("displays the MonthlyOptions component when frequency is set to monthly", () => {
    const newTaskRepeatForm = (
      <NewTaskRepeatForm
        data={{
          ...defaultRepeatFormState,
          isVisible: true,
          freq: "MONTHLY"
        }}
        onChange={() => {}}
      />
    );

    render(newTaskRepeatForm);
    const freqDropdown = document.getElementById(
      "freq-dropdown"
    ) as HTMLSelectElement;
    const monthlyOptions = document.getElementById(
      "monthly-options"
    ) as HTMLUListElement;
    const selectedOption = freqDropdown.value.toLowerCase();

    expect(selectedOption).toEqual("monthly");
    expect(monthlyOptions).toBeInTheDocument();
  });

  it("displays the YearlyOptions component when frequency is set to yearly", () => {
    const newTaskRepeatForm = (
      <NewTaskRepeatForm
        data={{
          ...defaultRepeatFormState,
          isVisible: true,
          freq: "YEARLY"
        }}
        onChange={() => {}}
      />
    );

    render(newTaskRepeatForm);
    const freqDropdown = document.getElementById(
      "freq-dropdown"
    ) as HTMLSelectElement;
    const yearlyOptions = document.getElementById(
      "yearly-options"
    ) as HTMLUListElement;
    const selectedOption = freqDropdown.value.toLowerCase();

    expect(selectedOption).toEqual("yearly");
    expect(yearlyOptions).toBeInTheDocument();
  });

  // Interval input

  it("allows user to change interval input value", async () => {
    const newTaskRepeatForm = (
      <NewTaskRepeatForm
        data={{
          ...defaultRepeatFormState,
          isVisible: true
        }}
        onChange={mockOnChange}
      />
    );

    render(newTaskRepeatForm);
    const intervalInput = document.getElementById(
      "interval-input"
    ) as HTMLInputElement;
    fireEvent.change(intervalInput, { target: { value: 5 } });

    const onChangeData: RepeatFormStateType = mockOnChange.mock.calls[1][0];
    expect(onChangeData.interval).toEqual(5);
  });

  it("sets the default interval value to 1", () => {
    const newTaskRepeatForm = (
      <NewTaskRepeatForm
        data={{
          ...defaultRepeatFormState,
          isVisible: true
        }}
        onChange={() => {}}
      />
    );

    render(newTaskRepeatForm);
    const intervalInput = document.getElementById(
      "interval-input"
    ) as HTMLInputElement;

    expect(intervalInput.value).toEqual("1");
  });
});
