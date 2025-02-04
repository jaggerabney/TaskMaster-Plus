import Button from "@/components/ui/Button";
import { WeeklyOptionsType } from "./NewTaskRepeatForm";
import { daysOfTheWeek } from "./NewTaskRepeatForm";

interface WeeklyOptionsPropsType {
  data: WeeklyOptionsType;
  onChange: (day: string) => void;
}

const WeeklyOptions: React.FC<WeeklyOptionsPropsType> = ({
  data,
  onChange
}) => {
  const { byDay } = data;

  return (
    <ul className="flex flex-row justify-between gap-2 ml-8 mr-8">
      {daysOfTheWeek.map((day) => (
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
