"use client";

import React, { createContext, useState } from "react";

export interface ModalContextType {
  modalIsOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  modalIsOpen: false,
  openModal: () => {},
  closeModal: () => {}
});

export const ModalContextProvider = (props: React.PropsWithChildren) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <ModalContext.Provider value={{ modalIsOpen, openModal, closeModal }}>
      {props.children}
    </ModalContext.Provider>
  );
};
