"use client";

import React, { useContext } from "react";
import Button from "./Button";
import { ModalContext } from "@/contexts/ModalContext";

const Sidebar: React.FC = () => {
  const { openModal } = useContext(ModalContext);

  function newListHandler() {
    openModal();
  }

  return (
    <nav className=" bg-cosmicLatte w-1/6 h-full p-8 flex flex-col gap-8">
      <Button
        text="New task"
        textColor="text-redNCS"
        borderColor="border-redNCS"
        onClick={() => {}}
      />
      <h2 className="text-night text-2xl">Lists</h2>
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
