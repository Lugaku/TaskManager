// src/components/modal/useModal.js
import { useContext } from "react";
import { ModalContext } from "../components/modal/ModalProvider";

export function useModal() {
  return useContext(ModalContext);
}