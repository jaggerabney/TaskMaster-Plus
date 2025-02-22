import { useState } from "react";
import { FaCalendar, FaClock, FaCommentDots, FaRedo } from "react-icons/fa";
import { RRule } from "rrule";

import { Task } from "@/contexts/ListContext";

const TaskItem: React.FC<Task> = ({
  id,
  // listId,
  title,
  completed,
  dueDate,
  description,
  rrule
}) => {
  const [isChecked, setIsChecked] = useState(completed);

  function checkboxHandler() {
    setIsChecked((prevState) => !prevState);
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        key={id}
        id="input-wrapper"
        className="flex flex-row gap-4 items-center"
      >
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
      {!isChecked && (
        <div id="details-wrapper">
          {dueDate && (
            <div className="text-xs ml-10 flex flex-row gap-2 items-center">
              <FaCalendar />
              {dueDate.toLocaleDateString()}
            </div>
          )}
          {dueDate && (
            <div className="text-xs ml-10 flex flex-row gap-2 items-center">
              <FaClock />
              {dueDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              })}
            </div>
          )}
          {description && (
            <div className="text-xs ml-10 flex flex-row gap-2 items-center">
              <FaCommentDots />
              {description}
            </div>
          )}
          {rrule && (
            <div className="text-xs ml-10 flex flex-row gap-2 items-center">
              <FaRedo />
              {RRule.fromString(rrule).toText()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskItem;
