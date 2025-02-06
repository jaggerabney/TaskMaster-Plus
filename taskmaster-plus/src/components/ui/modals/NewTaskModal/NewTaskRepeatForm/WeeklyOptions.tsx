import Button from "@/components/ui/Button";

import { WeeklyOptionsType, daysOfTheWeek } from "@/utils/Util";

interface WeeklyOptionsPropsType {
  data: WeeklyOptionsType;
  onChange: (day: string) => void;
}

const WeeklyOptions: React.FC<WeeklyOptionsPropsType> = ({
  data,
  onChange
}) => {
  const { byDay } = data;
  const weekdays = daysOfTheWeek.map((day) => day.slice(0, 3));

  return (
    <ul className="flex flex-row justify-between gap-2 ml-8 mr-8">
      {weekdays.map((day) => (
        <Button
          key={day}
          text={day}
          type="button"
          textColor={byDay.includes(day) ? "text-white" : "text-redNCS"}
          borderColor="border-redNCS"
          bgColor={byDay.includes(day) ? "bg-redNCS" : "bg-white"}
          onClick={() => onChange(day)}
        />
      ))}
    </ul>
  );
};

export default WeeklyOptions;
