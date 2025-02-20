"use client";

import React, { useContext, useRef, useState } from "react";

import Button from "../../Button";
import NewTaskRepeatForm from "./NewTaskRepeatForm/NewTaskRepeatForm";
import { ListContext, Task } from "@/contexts/ListContext";
import { buildRRuleStr, defaultRepeatFormState } from "@/utils/Util";

export interface NewTaskModalFormType {
  onSubmit: (task: Task) => void;
  onCancel: () => void;
}

const NewTaskModalForm: React.FC<NewTaskModalFormType> = ({
  onSubmit,
  onCancel
}) => {
  const [error, setError] = useState<string>("");
  const [repeatFormState, setRepeatFormState] = useState(
    defaultRepeatFormState
  );
  const listContext = useContext(ListContext);
  const listDropdownRef = useRef<HTMLOptionElement>(null);

  function formIsValid() {
    return error.length === 0;
  }

  function formChangeHandler() {
    setError("");
  }

  function formSubmitHandler(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    // the below line used to be:
    // const payload = event.target as typeof event.target & {
    // ...but was changed because extracting the values this way led to null values being
    // returned in the unit test that ensures you can't set a due date in the past.
    // isn't programming lovely?
    const payload = event.currentTarget
      .elements as typeof event.currentTarget.elements & {
      title: { value: string };
      date: { value: string };
      time: { value: string };
      description: { value: string };
    };

    const taskId = Math.random();
    const listId = Number(listDropdownRef.current?.id);
    const taskTitle = payload.title.value;
    let taskDueDate = undefined;
    let taskDescription = undefined;

    // If listId doesn't match any IDs in ListContext
    if (!listContext.state.lists.map((list) => list.id).includes(listId)) {
      return setError("Error: invalid list.");
    }

    // If title is empty
    if (!taskTitle) {
      return setError("Error: title is required.");
    }

    // If time is set and date is not
    if (payload.time.value && !payload.date.value) {
      return setError("Error: time cannot be set without date.");
    }

    if (payload.date.value) {
      const dateValues = payload.date.value.split("-");
      const year = Number(dateValues[0]);
      const month = Number(dateValues[1]) - 1; // months are 0-indexed in JavaScript :(
      const day = Number(dateValues[2]);
      const utcDueDate = new Date(year, month, day);

      if (utcDueDate.getTime() < Date.now()) {
        return setError("Error: due date cannot be in the past.");
      }

      taskDueDate = new Date(
        utcDueDate.getTime() + utcDueDate.getTimezoneOffset() * 60000
      );
    }

    if (payload.time.value) {
      // eventTarget.time.value format: HH:MM <- military time!
      // e.g., 20:20 for 8:20pm
      const hoursAndMinutes = payload.time.value.split(":");
      const hours = Number(hoursAndMinutes[0]);
      const minutes = Number(hoursAndMinutes[1]);

      taskDueDate?.setHours(hours, minutes);
    }

    if (payload.description.value) {
      taskDescription = payload.description.value;
    }

    if (formIsValid()) {
      const rruleStr: string = buildRRuleStr(repeatFormState);

      onSubmit({
        id: taskId,
        listId,
        title: taskTitle,
        completed: false,
        dueDate: taskDueDate,
        description: taskDescription,
        rrule: rruleStr
      });
    }
  }

  return (
    <form
      id="new-task-modal-form"
      onSubmit={formSubmitHandler}
      onChange={formChangeHandler}
      className="flex flex-col gap-4"
    >
      <div
        id="list-dropdown-wrapper"
        className="flex flex-row gap-4 items-center"
      >
        <label htmlFor="list" className="text-xl">
          List:
        </label>
        <select
          id="list"
          name="list"
          className="border border-black rounded text-xl p-2"
        >
          {listContext.state.lists.map((list) => (
            <option
              key={list.id}
              id={list.id.toString()}
              value={list.title}
              ref={listDropdownRef}
            >
              {list.title}
            </option>
          ))}
        </select>
      </div>
      <input
        id="title"
        placeholder="Task title"
        className="p-4 border border-black rounded text-xl"
        type="text"
      />
      <div
        id="datetime-wrapper"
        className="text-xl flex flex-row gap-4 items-center"
      >
        Due:
        <input
          id="date"
          type="date"
          className="border border-black rounded p-2"
        />
        <input
          id="time"
          type="time"
          className="border border-black rounded p-2"
        />
      </div>
      <textarea
        id="description"
        name="description"
        rows={3}
        placeholder="Task description"
        className="border border-black rounded p-4 resize-none"
      />
      <NewTaskRepeatForm data={repeatFormState} onChange={setRepeatFormState} />
      <div className="flex flex-row justify-center text-redNCS">
        {error.length > 0 && error}
      </div>
      <div id="button-wrapper" className="w-[80%] ml-[20%] flex flex-row gap-4">
        <Button
          text="Cancel"
          textColor="text-redNCS"
          borderColor="border-redNCS"
          bgColor="bg-white"
          onClick={onCancel}
        />
        <Button
          text="Create new task"
          textColor="text-white"
          borderColor="border-redNCS"
          bgColor="bg-redNCS"
          type="submit"
        />
      </div>
    </form>
  );
};

export default NewTaskModalForm;
