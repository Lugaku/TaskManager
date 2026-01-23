// src/components/modal/ModalBase.jsx
import { useEffect, useRef } from "react";

export default function ModalBase({ children, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[9999] p-4">
      <div
        ref={ref}
        className="rounded-lg p-4 shadow-xl min-w-[280px]"
      >
        {children}
      </div>
    </div>
  );
}