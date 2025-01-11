"use client";

import { useState } from "react";

import Header from "@/components/ui/Header";
import Sidebar from "@/components/ui/Sidebar";
import NewListModal from "@/components/ui/modals/NewListModal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  function modalOpenHandler() {
    setShowModal(true);
  }

  function modalCloseHandler() {
    setShowModal(false);
  }

  return (
    <div className="h-full w-full">
      {showModal && <NewListModal onClose={modalCloseHandler} />}
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
