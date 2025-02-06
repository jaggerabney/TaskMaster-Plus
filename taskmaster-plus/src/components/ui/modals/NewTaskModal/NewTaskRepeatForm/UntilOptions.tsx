import { UntilOptionsType, formatDate } from "@/utils/Util";

interface UntilOptionsPropsType {
  data: UntilOptionsType;
  onChange: (data: UntilOptionsType) => void;
}

const UntilOptions: React.FC<UntilOptionsPropsType> = ({ data, onChange }) => {
  const { basis, count, until } = data;

  function inputChangeHandler(
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) {
    switch (event.target.id) {
      case "until-basis-dropdown":
        return onChange({
          ...data,
          basis: event.target.value
        });
      case "count-input":
        return onChange({
          ...data,
          count: Number(event.target.value)
        });
      case "until-datepicker":
        const [year, month, day] = event.target.value.split("-");

        return onChange({
          ...data,
          until: new Date(Number(year), Number(month) - 1, Number(day))
        });
    }
  }

  return (
    <>
      <div
        id="until-wrapper"
        className="flex flex-row gap-4 text-xl items-center"
      >
        <input type="checkbox" className="opacity-0" />
        <label htmlFor="until-basis-dropdown">until</label>
        <select
          id="until-basis-dropdown"
          name="until-basis-dropdown"
          value={basis}
          onChange={inputChangeHandler}
          className="border border-black rounded p-2"
        >
          <option value="COUNT">after</option>
          <option value="UNTIL">date</option>
        </select>
        {basis === "COUNT" && (
          <div
            id="count-input-wrapper"
            className="flex flex-row gap-4 text-xl items-center"
          >
            <input
              id="count-input"
              type="number"
              step={1}
              min={1}
              value={count}
              onChange={inputChangeHandler}
              className="border border-black rounded p-2 w-16"
            />
            <label htmlFor="count-input">{`day${count > 1 ? "s" : ""}`}</label>
          </div>
        )}
        {basis === "UNTIL" && (
          <div
            id="until-datepicker-wrapper"
            className="flex flex-row gap-4 text-xl items-center"
          >
            <input
              id="until-datepicker"
              type="date"
              value={formatDate(until)}
              onChange={inputChangeHandler}
              className="border border-black rounded p-2"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default UntilOptions;
