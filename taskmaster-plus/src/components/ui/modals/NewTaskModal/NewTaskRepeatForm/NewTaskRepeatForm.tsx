import React, { useState, useRef } from "react";
import WeekdayPicker from "./WeekdayPicker";
import MonthlyOptions from "./MonthlyOptions";

interface RepeatFormStateType {
  isVisible: boolean;
  freq: string;
  interval: number;
  weekly: {
    byDay: string[];
  };
  monthly: {
    basis: string;
    byMonthDay: number;
    bySetPos: number;
    byDay: string;
  };
}

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
  }
};

const NewTaskRepeatForm: React.FC = () => {
  const [repeatFormState, setRepeatFormState] = useState(
    defaultRepeatFormState
  );
  const freqDropdownRef = useRef<HTMLSelectElement>(null);
  const intervalInputRef = useRef<HTMLInputElement>(null);

  const freqDict = new Map<string, string>([
    ["DAILY", "day"],
    ["WEEKLY", "week"],
    ["MONTHLY", "month"],
    ["YEARLY", "year"]
  ]);

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

  function repeatFormChangeHandler() {
    const freq = freqDropdownRef.current?.value || "NULL";
    const interval = Number(intervalInputRef.current?.value) || -1;

    setRepeatFormState((prevState) => {
      return {
        ...prevState,
        freq,
        interval
      };
    });
  }

  function monthlyOptionsChangeHandler(
    basis: string,
    byMonthDay: number,
    bySetPos: number,
    byDay: string
  ) {
    setRepeatFormState((prevState) => {
      return {
        ...prevState,
        monthly: {
          basis,
          byMonthDay,
          bySetPos,
          byDay
        }
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
            id="freq"
            name="freq"
            ref={freqDropdownRef}
            defaultValue={"DAILY"}
            onChange={repeatFormChangeHandler}
            className="border border-black rounded p-2"
          >
            <option value="DAILY">daily</option>
            <option value="WEEKLY">weekly</option>
            <option value="MONTHLY">monthly</option>
            <option value="YEARLY">yearly</option>
          </select>
        )}
        {repeatFormState.isVisible &&
          freqDropdownRef.current?.value !== "YEARLY" && (
            <>
              <label htmlFor="interval">every</label>
              <input
                type="number"
                defaultValue={1}
                step={1}
                min={1}
                ref={intervalInputRef}
                className="border border-black rounded p-2 w-12"
              />
              <div>
                {freqDict
                  .get(repeatFormState.freq)
                  ?.concat(
                    Number(intervalInputRef.current?.value) >= 2 ? "s" : ""
                  )}
              </div>
            </>
          )}
      </div>
      {freqDropdownRef.current?.value === "WEEKLY" && (
        <WeekdayPicker
          selectedDays={repeatFormState.weekly.byDay}
          onDaySelect={byDayClickHandler}
        />
      )}
      {freqDropdownRef.current?.value === "MONTHLY" && (
        <MonthlyOptions
          data={repeatFormState.monthly}
          onChange={monthlyOptionsChangeHandler}
        />
      )}
    </>
  );
};

export default NewTaskRepeatForm;
