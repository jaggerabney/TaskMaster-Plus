"use client";

import { useContext, useState } from "react";

import Header from "@/components/ui/Header";
import Sidebar from "@/components/ui/Sidebar";
import NewListModal from "@/components/ui/modals/NewListModal";
import ListItem from "@/components/ui/ListItem";
import { ListContext } from "@/contexts/ListContext";
import NewTaskModal from "@/components/ui/modals/NewTaskModal/NewTaskModal";

export default function Home() {
  const [showNewListModal, setShowNewListModal] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const listContext = useContext(ListContext);

  function listModalOpenHandler() {
    setShowNewListModal(true);
  }

  function listModalCloseHandler() {
    setShowNewListModal(false);
  }

  function taskModalOpenHandler() {
    if (listContext.state.lists.length === 0) {
      return;
    } else {
      setShowNewTaskModal(true);
    }
  }

  function taskModalCloseHandler() {
    setShowNewTaskModal(false);
  }

  return (
    <div className="h-full w-full">
      {showNewListModal && <NewListModal onClose={listModalCloseHandler} />}
      {showNewTaskModal && <NewTaskModal onClose={taskModalCloseHandler} />}
      <div
        id="content-wrapper"
        className="h-full w-full flex flex-col fixed z-10"
      >
        <Header />
        <div className="grow flex flex-row">
          <Sidebar
            onNewList={listModalOpenHandler}
            onNewTask={taskModalOpenHandler}
          />
          <div className="bg-white p-8 flex flex-row gap-8">
            {listContext.state.lists.map(
              (list) =>
                list.visible && (
                  <ListItem
                    key={list.id}
                    id={list.id}
                    title={list.title}
                    tasks={list.tasks}
                    visible={true}
                    onClick={taskModalOpenHandler}
                  />
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
