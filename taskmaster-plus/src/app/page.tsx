"use client";

import { useState } from "react";

import Header from "@/components/ui/Header";
import Sidebar from "@/components/ui/Sidebar";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  function modalOpenHandler() {
    setShowModal(true);
  }

  function modalCloseHandler() {
    setShowModal(false);
  }

  const newListModal = (
    <Modal>
      <div id="wrapper" className="h-full flex flex-col justify-between">
        <h1 className="text-4xl select-none font-bold text-night">New list</h1>
        <input
          className="p-4 border-2 border-black rounded text-2xl"
          type="text"
        ></input>
        <Button
          text="Create new list"
          textColor="text-black"
          borderColor="border-black"
          onClick={modalCloseHandler}
        />
      </div>
    </Modal>
  );

  return (
    <div className="h-full w-full">
      {showModal && newListModal}
      <div
        id="content-wrapper"
        className="h-full w-full flex flex-col fixed z-10"
      >
        <Header />
        <div className="grow flex flex-row">
          <Sidebar onNewList={modalOpenHandler} />
          <div className="bg-white grow" />
        </div>
      </div>
    </div>
  );
}
