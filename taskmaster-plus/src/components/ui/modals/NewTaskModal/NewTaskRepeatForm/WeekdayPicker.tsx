import Button from "@/components/ui/Button";

interface WeekdayPickerType {
  selectedDays: string[];
  onDaySelect: (day: string) => void;
}

const WeekdayPicker: React.FC<WeekdayPickerType> = ({
  selectedDays,
  onDaySelect
}) => {
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <ul className="flex flex-row justify-between gap-2 ml-8 mr-8">
      {weekdays.map((day) => (
        <Button
          key={day}
          text={day}
          type="button"
          textColor={selectedDays.includes(day) ? "text-white" : "text-redNCS"}
          borderColor="border-redNCS"
          bgColor={selectedDays.includes(day) ? "bg-redNCS" : "bg-white"}
          onClick={() => onDaySelect(day)}
        />
      ))}
    </ul>
  );
};

export default WeekdayPicker;
