"use client";

import React, { useContext } from "react";

import Button from "./Button";
import { ListContext } from "@/contexts/ListContext";
import { ListActions } from "@/contexts/ListContext";
import { ListItemType } from "./ListItem";

export interface SidebarProps {
  onNewList: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNewList }: SidebarProps) => {
  const listContext = useContext(ListContext);

  function newListHandler() {
    onNewList();
  }

  function listVisibilityToggleHandler(list: ListItemType) {
    listContext.dispatch({
      type: ListActions.UPDATE,
      payload: {
        ...list,
        visible: !list.visible
      }
    });
  }

  return (
    <nav className="bg-cosmicLatte w-1/6 p-8 flex flex-col gap-8 justify-between">
      <Button
        text="New task"
        textColor="text-redNCS"
        borderColor="border-redNCS"
        onClick={() => {}}
      />
      <div className="grow bg-white rounded p-8 flex flex-col gap-4">
        {listContext.state.lists.map((list) => (
          <div key={list.id} className="flex flex-row gap-4">
            <input
              type="checkbox"
              id={list.id.toString()}
              name={list.title}
              checked={list.visible}
              onChange={() => {
                listVisibilityToggleHandler({
                  id: list.id,
                  title: list.title,
                  tasks: list.tasks,
                  visible: list.visible
                });
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
