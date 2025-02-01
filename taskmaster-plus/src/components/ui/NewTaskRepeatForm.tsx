import React, { useState, useRef } from "react";
import Button from "./Button";

const NewTaskRepeatForm: React.FC = () => {
  const [repeatIsChecked, setRepeatIsChecked] = useState(true);
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

  function repeatCheckboxHandler() {
    setRepeatIsChecked((prevState) => !prevState);
  }

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
        id="repeat-checkbox-wrapper"
        className="text-xl flex flex-row gap-4 items-center"
      >
        <input
          id="repeat-checkbox"
          type="checkbox"
          checked={repeatIsChecked}
          onChange={repeatCheckboxHandler}
        />
        <label htmlFor="repeat-checkbox">Repeats</label>
      </div>
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
        <ul className="flex flex-row justify-between gap-4">
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
    </>
  );
};

export default NewTaskRepeatForm;
