// src/components/modal/ModalProvider.jsx
import { createContext, useState } from "react";
import ModalPortal from "./ModalPortal";
import ModalBase from "./ModalBase";

export const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);

  function openModal(content) {
    setModal(() => content);
  }

  function closeModal() {
    setModal(null);
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {modal && (
        <ModalPortal>
          <ModalBase onClose={closeModal}>
            {modal}
          </ModalBase>
        </ModalPortal>
      )}
    </ModalContext.Provider>
  );
}