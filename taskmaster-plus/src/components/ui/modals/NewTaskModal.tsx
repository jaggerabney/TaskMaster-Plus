"use client";

import React, { useContext } from "react";

import Modal from "../Modal";
import NewTaskModalForm from "../NewTaskModalForm";
import { ListActions, ListContext, Task } from "@/contexts/ListContext";

export interface ModalProps {
  onClose: () => void;
}

const NewTaskModal: React.FC<ModalProps> = ({ onClose }: ModalProps) => {
  const listContext = useContext(ListContext);

  function onNewTask(newTask: Task) {
    const list = listContext.state.lists.find(
      (list) => list.id === newTask.listId
    );

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
        <NewTaskModalForm onSubmit={onNewTask} onCancel={onClose} />
      </div>
    </Modal>
  );
};

export default NewTaskModal;
