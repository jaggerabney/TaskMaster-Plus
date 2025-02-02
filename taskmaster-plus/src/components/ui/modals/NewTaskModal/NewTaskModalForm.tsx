"use client";

import React, { useContext, useRef, useState } from "react";

import Button from "../../Button";
import { ListContext, Task } from "@/contexts/ListContext";
import NewTaskRepeatForm from "./NewTaskRepeatForm/NewTaskRepeatForm";

export interface NewTaskModalFormType {
  onSubmit: (task: Task) => void;
  onCancel: () => void;
}

const NewTaskModalForm: React.FC<NewTaskModalFormType> = ({
  onSubmit,
  onCancel
}) => {
  const [errors, setErrors] = useState<string[]>([]);
  const listContext = useContext(ListContext);
  const listDropdownRef = useRef<HTMLOptionElement>(null);

  function formIsValid() {
    return errors.length === 0;
  }

  function formChangeHandler() {
    setErrors([]);
  }

  function formSubmitHandler(event: React.FormEvent) {
    event.preventDefault();

    const eventTarget = event.target as typeof event.target & {
      title: { value: string };
      date: { value: Date };
      time: { value: string };
      description: { value: string };
    };

    const taskId = Math.random();
    const listId = Number(listDropdownRef.current?.id);
    const taskTitle = eventTarget.title.value;
    let taskDueDate = undefined;
    let taskDescription = undefined;

    // If listId doesn't match any IDs in ListContext
    if (!listContext.state.lists.map((list) => list.id).includes(listId)) {
      return setErrors((prevErrors) => [...prevErrors, "Error: invalid list."]);
    }

    // If title is empty
    if (taskTitle.trim().length === 0) {
      return setErrors((prevErrors) => [
        ...prevErrors,
        "Error: title is required."
      ]);
    }

    // If time is set and date is not
    if (eventTarget.time.value && !eventTarget.date.value) {
      return setErrors((prevErrors) => [
        ...prevErrors,
        "Error: time cannot be set without date."
      ]);
    }

    if (eventTarget.date.value) {
      taskDueDate = new Date(eventTarget.date.value);
    }

    if (eventTarget.time.value) {
      // eventTarget.time.value format: HH:MM
      // e.g., 20:20 for 8:20pm

      const hoursAndMinutes = eventTarget.time.value.split(":");
      const hours = Number(hoursAndMinutes[0]);
      const minutes = Number(hoursAndMinutes[1]);

      taskDueDate?.setHours(hours, minutes);
    }

    if (eventTarget.description.value) {
      taskDescription = eventTarget.description.value;
    }

    if (formIsValid()) {
      onSubmit({
        id: taskId,
        listId,
        title: taskTitle,
        completed: false,
        dueDate: taskDueDate,
        description: taskDescription
      });
    }
  }

  return (
    <form
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
      <NewTaskRepeatForm />
      <ul className="flex flex-row justify-center text-redNCS">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
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
