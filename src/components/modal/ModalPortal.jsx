// src/components/modal/ModalPortal.jsx
import { createPortal } from "react-dom";

export default function ModalPortal({ children }) {
  const root = document.getElementById("modal-root");

  if (!root) {
    console.error("modal-root not found. Add <div id='modal-root'></div> in index.html");
    return null;
  }

  return createPortal(children, root);
}