import { useState } from "react";
import { RRule } from "rrule";

export interface TaskItemType {
  id: number;
  listId: number;
  title: string;
  completed: boolean;
  dueDate?: Date;
  occurrance?: RRule;
  description?: string;
}

const TaskItem: React.FC<TaskItemType> = ({ id, listId, title, completed }) => {
  const [isChecked, setIsChecked] = useState(completed);

  function checkboxHandler() {
    setIsChecked((prevState) => !prevState);
  }

  return (
    <div key={id} className="flex flex-row gap-4">
      <input
        className=""
        type="checkbox"
        id={id.toString()}
        name={title}
        checked={isChecked}
        onChange={checkboxHandler}
      />
      <div
        className={`w-full pr-4 inline-block break-words ${
          isChecked && "line-through"
        }`}
      >
        {title}
      </div>
    </div>
  );
};

export default TaskItem;
