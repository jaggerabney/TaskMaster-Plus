import React from "react";

interface MonthlyOptionsPropsType {
  data: {
    basis: string;
    byMonthDay: number;
    bySetPos: number;
    byDay: string;
  };
  onChange: (
    monthlyBasis: string,
    monthlyByMonthDay: number,
    monthlyBySetPos: number,
    monthlyByDay: string
  ) => void;
}

const MonthlyOptions: React.FC<MonthlyOptionsPropsType> = ({
  data,
  onChange
}) => {
  // const monthDayInputRef = useRef<HTMLInputElement>(null);
  // const setPosDropdownRef = useRef<HTMLSelectElement>(null);
  // const byDayDropdownRef = useRef<HTMLSelectElement>(null);
  const { basis, byMonthDay, bySetPos, byDay } = data;

  const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const setPosDropdownDict = new Map<string, number>([
    ["1st", 1],
    ["2nd", 2],
    ["3rd", 3],
    ["4th", 4],
    ["Last", -1]
  ]);

  function inputChangeHandler(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const targetComponentId = event.target.id;
    let newBasis: string = basis;
    let newByMonthDay: number = byMonthDay;
    let newBySetPos: number = bySetPos;
    let newByDay: string = byDay;

    switch (targetComponentId) {
      case "by-monthday-checkbox":
        newBasis = "BYMONTHDAY";
        break;
      case "by-setpos-checkbox":
        newBasis = "BYSETPOS";
        break;
      case "by-monthday-input":
        newByMonthDay = Number(event.target.value);
        break;
      case "by-setpos-dropdown":
        newBySetPos = Number(event.target.value);
        break;
      case "by-day-dropdown":
        newByDay = event.target.value.slice(0, 2).toUpperCase();
        break;
    }

    onChange(newBasis, newByMonthDay, newBySetPos, newByDay);
  }

  return (
    <ul className="flex flex-col text-xl gap-4">
      <li className="flex flex-row items-center gap-4 ml-8">
        <input
          id="by-monthday-checkbox"
          type="checkbox"
          onChange={inputChangeHandler}
          checked={basis === "BYMONTHDAY"}
        />
        <label htmlFor="by-monthday-checkbox">On day</label>
        <input
          id="by-monthday-input"
          onChange={inputChangeHandler}
          className="border border-black rounded p-2"
          type="number"
          step={1}
          min={1}
          max={31}
          value={byMonthDay}
        />
      </li>
      <li className="flex flex-row items-center gap-4 ml-8">
        <input
          id="by-setpos-checkbox"
          type="checkbox"
          onChange={inputChangeHandler}
          checked={basis === "BYSETPOS"}
        />
        <label htmlFor="by-setpos-checkbox">On the</label>
        <select
          id="by-setpos-dropdown"
          value={bySetPos}
          onChange={inputChangeHandler}
          className="border border-black rounded p-2"
        >
          {Array.from(setPosDropdownDict.keys()).map((key) => (
            <option key={key} value={setPosDropdownDict.get(key)}>
              {key}
            </option>
          ))}
        </select>
        <select
          id="by-day-dropdown"
          value={daysOfTheWeek.find((day) =>
            day.toUpperCase().startsWith(byDay)
          )}
          onChange={inputChangeHandler}
          className="border border-black rounded p-2"
        >
          {daysOfTheWeek.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </li>
    </ul>
  );
};

export default MonthlyOptions;
