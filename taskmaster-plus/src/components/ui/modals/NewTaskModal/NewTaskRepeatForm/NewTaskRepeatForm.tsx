import React, { useState } from "react";
import WeeklyOptions from "./WeeklyOptions";
import MonthlyOptions from "./MonthlyOptions";
import YearlyOptions from "./YearlyOptions";

export interface WeeklyOptionsType {
  byDay: string[];
}

export interface MonthlyOptionsType {
  basis: string;
  byMonthDay: number;
  bySetPos: number;
  byDay: string;
}

export interface YearlyOptionsType {
  basis: string;
  byMonth: number;
  byMonthDay: number;
  bySetPos: number;
  byDay: string;
  bySetMonth: number; // same string used in RRule - BYMONTH - but different value is used to prevent crossover in form
}

export interface RepeatFormStateType {
  isVisible: boolean;
  freq: string;
  interval: number;
  weekly: WeeklyOptionsType;
  monthly: MonthlyOptionsType;
  yearly: YearlyOptionsType;
}

export const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export const setPosDropdownDict = new Map<string, number>([
  ["1st", 1],
  ["2nd", 2],
  ["3rd", 3],
  ["4th", 4],
  ["Last", -1]
]);

export const daysPerMonth = new Map<string, number>([
  ["January", 31],
  ["February", 28], // extra day will be added in input max field for leap years
  ["March", 31],
  ["April", 30],
  ["May", 31],
  ["June", 30],
  ["July", 31],
  ["August", 31],
  ["September", 30],
  ["October", 31],
  ["November", 30],
  ["December", 31]
]);

export const monthsOfTheYear = Array.from(daysPerMonth.keys());

const freqDict = new Map<string, string>([
  ["DAILY", "day"],
  ["WEEKLY", "week"],
  ["MONTHLY", "month"],
  ["YEARLY", "year"]
]);

const defaultRepeatFormState: RepeatFormStateType = {
  isVisible: false,
  freq: "DAILY",
  interval: 1,
  weekly: {
    byDay: new Array<string>()
  },
  monthly: {
    basis: "BYMONTHDAY",
    byMonthDay: 1,
    bySetPos: 1,
    byDay: "SU"
  },
  yearly: {
    basis: "BYMONTH",
    byMonth: 1,
    byMonthDay: 1,
    bySetPos: 1,
    byDay: "SU",
    bySetMonth: 1
  }
};

const NewTaskRepeatForm: React.FC = () => {
  const [repeatFormState, setRepeatFormState] = useState(
    defaultRepeatFormState
  );

  function byDayClickHandler(day: string) {
    const dayIsSelected = repeatFormState.weekly.byDay.includes(day);

    if (dayIsSelected) {
      return setRepeatFormState((prevState) => {
        return {
          ...prevState,
          weekly: {
            byDay: prevState.weekly.byDay.filter((element) => element !== day)
          }
        };
      });
    } else {
      return setRepeatFormState((prevState) => {
        return {
          ...prevState,
          weekly: {
            byDay: prevState.weekly.byDay.concat(day)
          }
        };
      });
    }
  }

  function repeatFormVisibilityHandler() {
    setRepeatFormState((prevState) => {
      return {
        ...prevState,
        isVisible: !prevState.isVisible
      };
    });
  }

  function freqIntervalChangeHandler(
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) {
    switch (event.target.id) {
      case "freq-dropdown":
        return setRepeatFormState((prevState) => {
          return {
            ...prevState,
            freq: event.target.value
          };
        });
      case "interval-input":
        return setRepeatFormState((prevState) => {
          return {
            ...prevState,
            interval: Number(event.target.value)
          };
        });
    }
  }

  function monthlyOptionsChangeHandler(data: MonthlyOptionsType) {
    setRepeatFormState((prevState) => {
      return {
        ...prevState,
        monthly: data
      };
    });
  }

  function yearlyOptionsChangeHandler(data: YearlyOptionsType) {
    setRepeatFormState((prevState) => {
      return {
        ...prevState,
        yearly: data
      };
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
          checked={repeatFormState.isVisible}
          onChange={repeatFormVisibilityHandler}
        />
        <label htmlFor="repeat-checkbox">Repeat</label>
        {repeatFormState.isVisible && (
          <select
            id="freq-dropdown"
            name="freq-dropdown"
            value={repeatFormState.freq}
            onChange={freqIntervalChangeHandler}
            className="border border-black rounded p-2"
          >
            <option value="DAILY">daily</option>
            <option value="WEEKLY">weekly</option>
            <option value="MONTHLY">monthly</option>
            <option value="YEARLY">yearly</option>
          </select>
        )}
        {repeatFormState.isVisible && repeatFormState.freq !== "YEARLY" && (
          <>
            <label htmlFor="interval-input">every</label>
            <input
              id="interval-input"
              type="number"
              step={1}
              min={1}
              value={repeatFormState.interval}
              onChange={freqIntervalChangeHandler}
              className="border border-black rounded p-2 w-12"
            />
            <div>
              {freqDict
                .get(repeatFormState.freq)
                ?.concat(Number(repeatFormState.interval) >= 2 ? "s" : "")}
            </div>
          </>
        )}
      </div>
      {repeatFormState.isVisible && repeatFormState.freq === "WEEKLY" && (
        <WeeklyOptions
          data={repeatFormState.weekly}
          onChange={byDayClickHandler}
        />
      )}
      {repeatFormState.isVisible && repeatFormState.freq === "MONTHLY" && (
        <MonthlyOptions
          data={repeatFormState.monthly}
          onChange={monthlyOptionsChangeHandler}
        />
      )}
      {repeatFormState.isVisible && repeatFormState.freq === "YEARLY" && (
        <YearlyOptions
          data={repeatFormState.yearly}
          onChange={yearlyOptionsChangeHandler}
        />
      )}
    </>
  );
};

export default NewTaskRepeatForm;
