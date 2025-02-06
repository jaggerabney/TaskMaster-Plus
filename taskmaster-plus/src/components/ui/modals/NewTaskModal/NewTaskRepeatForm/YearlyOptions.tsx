import {
  YearlyOptionsType,
  daysOfTheWeek,
  monthsOfTheYear,
  daysPerMonth,
  setPosDropdownDict
} from "@/utils/Util";

interface YearlyOptionsPropsType {
  data: YearlyOptionsType;
  onChange: (data: YearlyOptionsType) => void;
}

const YearlyOptions: React.FC<YearlyOptionsPropsType> = ({
  data,
  onChange
}) => {
  const { basis, byMonth, byMonthDay, bySetPos, byDay, bySetMonth } = data;

  function inputChangeHandler(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const targetComponentId = event.target.id;
    let newBasis: string = basis;
    let newByMonth: number = byMonth;
    let newByMonthDay: number = byMonthDay;
    let newBySetPos: number = bySetPos;
    let newByDay: string = byDay;
    let newBySetMonth: number = bySetMonth;

    switch (targetComponentId) {
      case "by-month-checkbox":
        newBasis = "BYMONTH";
        break;
      case "by-month-dropdown":
        newByMonth = monthsOfTheYear.indexOf(event.target.value) + 1;
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
      case "by-set-month-dropdown":
        newBySetMonth = monthsOfTheYear.indexOf(event.target.value) + 1;
    }

    onChange({
      basis: newBasis,
      byMonth: newByMonth,
      byMonthDay: newByMonthDay,
      bySetPos: newBySetPos,
      byDay: newByDay,
      bySetMonth: newBySetMonth
    });
  }

  return (
    <ul className="flex flex-col text-xl gap-4">
      <li className="flex flex-row items-center gap-4 ml-8">
        <input
          id="by-month-checkbox"
          type="checkbox"
          onChange={inputChangeHandler}
          checked={basis === "BYMONTH"}
        />
        <label htmlFor="by-month-checkbox">On</label>
        <select
          id="by-month-dropdown"
          value={monthsOfTheYear[byMonth - 1]}
          onChange={inputChangeHandler}
          className="border border-black rounded p-2"
        >
          {monthsOfTheYear.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <input
          id="by-monthday-input"
          type="number"
          step={1}
          min={1}
          value={byMonthDay}
          onChange={inputChangeHandler}
          max={daysPerMonth.get(monthsOfTheYear[byMonthDay - 1])}
          className="border border-black rounded p-2 w-16"
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
        <label htmlFor="by-set-month-dropdown">of</label>
        <select
          id="by-set-month-dropdown"
          value={monthsOfTheYear[bySetMonth - 1]}
          onChange={inputChangeHandler}
          className="border border-black rounded p-2"
        >
          {monthsOfTheYear.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </li>
    </ul>
  );
};

export default YearlyOptions;
