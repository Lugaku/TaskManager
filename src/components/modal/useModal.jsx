// src/components/modal/useModal.js
import { useContext } from "react";
import { ModalContext } from "./ModalProvider";

export function useModal() {
  return useContext(ModalContext);
}