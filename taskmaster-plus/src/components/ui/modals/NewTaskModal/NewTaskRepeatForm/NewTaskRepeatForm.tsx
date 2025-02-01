import React, { useState, useRef } from "react";
import WeekdayPicker from "./WeekdayPicker";

interface RepeatFormStateType {
  freq: string;
  interval: number;
  weeklyByDay: string[];
  monthlyBasis: "BYMONTHDAY" | "BYSETPOS";
  monthlyByDay: number;
  monthlyBySetPos: number;
}

const defaultRepeatFormState: RepeatFormStateType = {
  freq: "DAILY",
  interval: 1,
  weeklyByDay: new Array<string>(),
  monthlyBasis: "BYMONTHDAY",
  monthlyByDay: 1,
  monthlyBySetPos: 1
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
    const dayIsSelected = repeatFormState.weeklyByDay.includes(day);
    console.log(dayIsSelected);

    if (dayIsSelected) {
      return setRepeatFormState((prevState) => {
        return {
          ...prevState,
          weeklyByDay: prevState.weeklyByDay.filter(
            (element) => element !== day
          )
        };
      });
    } else {
      return setRepeatFormState((prevState) => {
        return {
          ...prevState,
          weeklyByDay: prevState.weeklyByDay.concat(day)
        };
      });
    }
  }

  function monthlyBasisCheckboxHandler(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const checkboxId = event.target.id;
    const monthlyBasis =
      checkboxId === "by-setpos-checkbox" ? "BYSETPOS" : "BYMONTHDAY";

    setRepeatFormState((prevState) => {
      return {
        ...prevState,
        monthlyBasis
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

  return (
    <>
      <div
        id="freq-interval-wrapper"
        className="flex flex-row gap-4 items-center text-xl"
      >
        <label htmlFor="freq">Repeat</label>
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
        {freqDropdownRef.current?.value !== "YEARLY" && (
          <>
            <label htmlFor="interval">every</label>
            <input
              type="number"
              defaultValue={1}
              step={1}
              min={1}
              ref={intervalInputRef}
              className="border border-black rounded p-2"
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
          selectedDays={repeatFormState.weeklyByDay}
          onDaySelect={byDayClickHandler}
        />
      )}
      {freqDropdownRef.current?.value === "MONTHLY" && (
        <ul className="flex flex-col text-xl gap-4">
          <li className="flex flex-row items-center gap-4 ml-8">
            <input
              id="by-monthday-checkbox"
              type="checkbox"
              onChange={monthlyBasisCheckboxHandler}
              checked={repeatFormState.monthlyBasis === "BYMONTHDAY"}
            />
            <label htmlFor="by-monthday-checkbox">On day</label>
            <input
              id="by-monthday-input"
              className="border border-black rounded p-2"
              type="number"
              step={1}
              defaultValue={1}
              min={1}
              max={31}
            />
          </li>
          <li className="flex flex-row items-center gap-4 ml-8">
            <input
              id="by-setpos-checkbox"
              type="checkbox"
              onChange={monthlyBasisCheckboxHandler}
              checked={repeatFormState.monthlyBasis === "BYSETPOS"}
            />
            <label htmlFor="by-setpos-checkbox">On the</label>
            <select
              id="by-setpos-dropdown"
              className="border border-black rounded p-2"
            >
              <option value={1}>1st</option>
              <option value={2}>2nd</option>
              <option value={3}>3rd</option>
              <option value={4}>4th</option>
              <option value={-1}>Last</option>
            </select>
            <select
              id="by-day-dropdown"
              className="border border-black rounded p-2"
            >
              {[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
              ].map((day) => (
                <option key={day} value={day.slice(0, 2).toUpperCase()}>
                  {day}
                </option>
              ))}
            </select>
          </li>
        </ul>
      )}
    </>
  );
};

export default NewTaskRepeatForm;
