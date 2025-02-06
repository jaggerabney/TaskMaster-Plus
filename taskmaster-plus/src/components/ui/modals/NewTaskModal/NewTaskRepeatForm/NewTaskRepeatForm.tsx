import React from "react";

import WeeklyOptions from "./WeeklyOptions";
import MonthlyOptions from "./MonthlyOptions";
import YearlyOptions from "./YearlyOptions";
import UntilOptions from "./UntilOptions";
import {
  RepeatFormStateType,
  MonthlyOptionsType,
  YearlyOptionsType,
  UntilOptionsType,
  freqDict
} from "@/utils/Util";

interface NewTaskRepeatFormPropsType {
  data: RepeatFormStateType;
  onChange: (data: RepeatFormStateType) => void;
}

const NewTaskRepeatForm: React.FC<NewTaskRepeatFormPropsType> = ({
  data,
  onChange
}) => {
  const { isVisible, freq, interval, weekly, monthly, yearly, until } = data;

  function byDayClickHandler(day: string) {
    const dayIsSelected = weekly.byDay.includes(day);

    if (dayIsSelected) {
      return onChange({
        ...data,
        weekly: {
          byDay: weekly.byDay.filter((element) => element !== day)
        }
      });
    } else {
      return onChange({
        ...data,
        weekly: {
          byDay: weekly.byDay.concat(day)
        }
      });
    }
  }

  function repeatFormVisibilityHandler() {
    onChange({
      ...data,
      isVisible: !isVisible
    });
  }

  function freqIntervalChangeHandler(
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) {
    switch (event.target.id) {
      case "freq-dropdown":
        return onChange({
          ...data,
          freq: event.target.value
        });
      case "interval-input":
        return onChange({
          ...data,
          interval: Number(event.target.value)
        });
    }
  }

  function monthlyOptionsChangeHandler(monthData: MonthlyOptionsType) {
    onChange({
      ...data,
      monthly: monthData
    });
  }

  function yearlyOptionsChangeHandler(yearData: YearlyOptionsType) {
    onChange({
      ...data,
      yearly: yearData
    });
  }

  function untilOptionsChangeHandler(untilData: UntilOptionsType) {
    onChange({
      ...data,
      until: untilData
    });
  }

  return (
    <>
      <div
        id="repeat-checkbox-wrapper"
        className="text-xl flex flex-row gap-4 items-center"
      >
        <input
          id="repeat-checkbox"
          type="checkbox"
          checked={isVisible}
          onChange={repeatFormVisibilityHandler}
        />
        <label htmlFor="repeat-checkbox">Repeat</label>
        {isVisible && (
          <select
            id="freq-dropdown"
            name="freq-dropdown"
            value={freq}
            onChange={freqIntervalChangeHandler}
            className="border border-black rounded p-2"
          >
            <option value="DAILY">daily</option>
            <option value="WEEKLY">weekly</option>
            <option value="MONTHLY">monthly</option>
            <option value="YEARLY">yearly</option>
          </select>
        )}
        {isVisible && freq !== "YEARLY" && (
          <>
            <label htmlFor="interval-input">every</label>
            <input
              id="interval-input"
              type="number"
              step={1}
              min={1}
              value={interval}
              onChange={freqIntervalChangeHandler}
              className="border border-black rounded p-2 w-16"
            />
            <div>
              {freqDict.get(freq)?.concat(Number(interval) >= 2 ? "s" : "")}
            </div>
          </>
        )}
      </div>
      {isVisible && freq === "WEEKLY" && (
        <WeeklyOptions data={weekly} onChange={byDayClickHandler} />
      )}
      {isVisible && freq === "MONTHLY" && (
        <MonthlyOptions data={monthly} onChange={monthlyOptionsChangeHandler} />
      )}
      {isVisible && freq === "YEARLY" && (
        <YearlyOptions data={yearly} onChange={yearlyOptionsChangeHandler} />
      )}
      {isVisible && (
        <UntilOptions data={until} onChange={untilOptionsChangeHandler} />
      )}
    </>
  );
};

export default NewTaskRepeatForm;
