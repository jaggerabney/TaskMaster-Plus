"use client";

import { useContext, useState } from "react";

import Header from "@/components/ui/Header";
import Sidebar from "@/components/ui/Sidebar";
import NewListModal from "@/components/ui/modals/NewListModal";
import ListItem from "@/components/ui/ListItem";
import { ListContext } from "@/contexts/ListContext";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const listContext = useContext(ListContext);

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
          <div className="bg-white p-8 flex flex-row gap-8">
            {listContext.state.lists.map((list) => (
              <ListItem
                key={list.id}
                id={list.id}
                title={list.title}
                tasks={[]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
