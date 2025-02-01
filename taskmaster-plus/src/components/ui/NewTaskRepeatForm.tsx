import React, { useState, useRef } from "react";
import Button from "./Button";

const NewTaskRepeatForm: React.FC = () => {
  const [repeatFormState, setRepeatFormState] = useState({
    freq: "DAILY",
    interval: 1,
    byDay: new Array<string>()
  });
  const freqDropdownRef = useRef<HTMLSelectElement>(null);
  const intervalInputRef = useRef<HTMLInputElement>(null);

  const freqDict = new Map<string, string>([
    ["DAILY", "day"],
    ["WEEKLY", "week"],
    ["MONTHLY", "month"],
    ["YEARLY", "year"]
  ]);

  function byDayClickHandler(day: string) {
    const dayIsSelected = repeatFormState.byDay.includes(day.toUpperCase());

    if (dayIsSelected) {
      return setRepeatFormState((prevState) => {
        return {
          ...prevState,
          byDay: prevState.byDay.filter(
            (element) => element !== day.toUpperCase()
          )
        };
      });
    } else {
      return setRepeatFormState((prevState) => {
        return {
          ...prevState,
          byDay: prevState.byDay.concat(day.toUpperCase())
        };
      });
    }
  }

  function repeatFormChangeHandler() {
    const freq = freqDropdownRef.current?.value || "NULL";
    const interval = Number(intervalInputRef.current?.value) || -1;

    setRepeatFormState({
      freq,
      interval,
      byDay: []
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
        <ul className="flex flex-row justify-between gap-2 ml-8 mr-8">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <Button
              key={day}
              text={day}
              type="button"
              textColor={
                repeatFormState.byDay.includes(day.toUpperCase())
                  ? "text-white"
                  : "text-redNCS"
              }
              borderColor="border-redNCS"
              bgColor={
                repeatFormState.byDay.includes(day.toUpperCase())
                  ? "bg-redNCS"
                  : "bg-white"
              }
              onClick={() => byDayClickHandler(day)}
            />
          ))}
        </ul>
      )}
      {freqDropdownRef.current?.value === "MONTHLY" && (
        <ul className="flex flex-col text-xl gap-4">
          <li className="flex flex-row items-center gap-4 ml-8">
            <input id="by-monthday-checkbox" type="checkbox" />
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
            <input id="by-setpos-checkbox" type="checkbox" />
            <label htmlFor="by-setpos-checkbox">On the</label>
            <select
              id="by-setpos-dropdown"
              className="border border-black rounded p-2"
            >
              <option>1st</option>
              <option>2nd</option>
              <option>3rd</option>
              <option>4th</option>
              <option>Last</option>
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
                <option key={day}>{day}</option>
              ))}
            </select>
          </li>
        </ul>
      )}
    </>
  );
};

export default NewTaskRepeatForm;
