import React from "react";

import Modal from "../Modal";
import Button from "../Button";

export interface ModalProps {
  onClose: () => void;
}

const NewListModal: React.FC<ModalProps> = ({ onClose }: ModalProps) => {
  return (
    <Modal onClose={onClose}>
      <div id="wrapper" className="h-full flex flex-col justify-between">
        <h1 className="text-4xl select-none font-bold text-night">New List</h1>
        <input
          className="p-4 border-2 border-black rounded text-2xl"
          type="text"
        ></input>
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
            text="Create new list"
            textColor="text-white"
            borderColor="border-redNCS"
            bgColor="bg-redNCS"
            onClick={onClose}
          />
        </div>
      </div>
    </Modal>
  );
};

export default NewListModal;
