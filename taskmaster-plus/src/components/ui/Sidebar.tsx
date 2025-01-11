"use client";

import React from "react";

import Button from "./Button";

export interface SidebarProps {
  onNewList: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNewList }: SidebarProps) => {
  function newListHandler() {
    onNewList();
  }

  return (
    <nav className="bg-cosmicLatte w-1/6 p-8 flex flex-col gap-8 justify-between">
      <Button
        text="New task"
        textColor="text-redNCS"
        borderColor="border-redNCS"
        onClick={() => {}}
      />
      <div className="grow" />
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
