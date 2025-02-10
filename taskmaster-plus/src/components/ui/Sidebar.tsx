"use client";

import React, { useContext } from "react";

import Button from "./Button";
import { List, ListContext } from "@/contexts/ListContext";
import { ListActions } from "@/contexts/ListContext";

export interface SidebarProps {
  onNewList: () => void;
  onNewTask: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  onNewList,
  onNewTask
}: SidebarProps) => {
  const listContext = useContext(ListContext);

  function newListHandler() {
    onNewList();
  }

  function listVisibilityToggleHandler(list: List) {
    listContext.dispatch({
      type: ListActions.UPDATE,
      payload: {
        ...list,
        visible: !list.visible
      }
    });
  }

  return (
    <nav className="bg-cosmicLatte w-1/5 p-8 flex flex-col gap-8 justify-between">
      {listContext.state.lists.length > 0 && (
        <Button
          text="New task"
          textColor="text-redNCS"
          borderColor="border-redNCS"
          onClick={onNewTask}
        />
      )}
      <div
        id="list-view-pane"
        className="grow bg-white rounded p-8 flex flex-col gap-2"
      >
        {listContext.state.lists.map((list) => (
          <div
            key={list.id}
            id={list.id.toString()}
            className="flex flex-row gap-4"
          >
            <input
              type="checkbox"
              name={list.title}
              checked={list.visible}
              onChange={() => {
                listVisibilityToggleHandler(list);
              }}
            />
            <div className={`w-full pr-4 inline-block break-words`}>
              {list.title}
            </div>
          </div>
        ))}
      </div>
      <Button
        text="New list"
        textColor="text-redNCS"
        borderColor="border-redNCS"
        onClick={newListHandler}
      />
    </nav>
  );
};

export default Sidebar;
