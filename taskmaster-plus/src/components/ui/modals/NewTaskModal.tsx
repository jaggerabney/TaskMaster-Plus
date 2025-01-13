"use client";

import React, { useContext, useRef } from "react";

import Modal from "../Modal";
import Button from "../Button";
import { ListActions, ListContext } from "@/contexts/ListContext";

export interface ModalProps {
  onClose: () => void;
}

const NewTaskModal: React.FC<ModalProps> = ({ onClose }: ModalProps) => {
  const listContext = useContext(ListContext);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const listDropdownRef = useRef<HTMLOptionElement>(null);

  //   function onNewList() {
  //     listContext.dispatch({
  //       type: ListActions.CREATE,
  //       payload: {
  //         id: Math.random(),
  //         title: inputRef.current?.value || "Untitled list",
  //         visible: true,
  //         tasks: []
  //       }
  //     });

  //     onClose();
  //   }

  function onNewTask() {
    const listId = Number(listDropdownRef.current?.id);
    const list = listContext.state.lists.find((list) => list.id === listId);
    const newTask = {
      id: Math.random(),
      listId,
      title: titleInputRef.current?.value || "Untitled task",
      completed: false
    };

    // If no option is selected
    if (listId === 0 || list === undefined) {
      // TODO: find out why adding a new task doesn't work!
    }

    console.log(list);

    listContext.dispatch({
      type: ListActions.UPDATE,
      payload: {
        ...list!,
        tasks: [...list!.tasks, newTask]
      }
    });

    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <div id="wrapper" className="h-full flex flex-col justify-between gap-8">
        <h1 className="text-4xl select-none font-bold text-night">New Task</h1>
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
          className="p-4 border border-black rounded text-2xl"
          type="text"
          ref={titleInputRef}
        />
        <div
          id="button-wrapper"
          className="w-[80%] ml-[20%] flex flex-row gap-4"
        >
          <Button
            text="Cancel"
            textColor="text-redNCS"
            borderColor="border-redNCS"
            bgColor="bg-white"
            onClick={onClose}
          />
          <Button
            text="Create new task"
            textColor="text-white"
            borderColor="border-redNCS"
            bgColor="bg-redNCS"
            onClick={onNewTask}
          />
        </div>
      </div>
    </Modal>
  );
};

export default NewTaskModal;
