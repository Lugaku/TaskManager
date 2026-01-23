import { useEffect, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";

export default function TaskOptionsModal({ task, onClose, onDelete, onInfo }) {
  const ref = useRef(null);

  // закрытие по клику вне
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="
        absolute top-8 right-0
        w-40 bg-[#1c1f22] border border-white/10
        rounded-lg p-2 shadow-xl
        flex flex-col gap-1 z-[999]
      "
    >
      <button
        onClick={() => { onDelete(task.id); onClose(); }}
        className="flex items-center gap-2 px-2 py-1 rounded text-sm hover:bg-white/10 text-white/70"
      >
        <MdDelete className="text-white/50 text-lg" /> Delete
      </button>

      <button
        onClick={() => { onInfo(task.id); onClose(); }}
        className="flex items-center gap-2 px-2 py-1 rounded text-sm hover:bg-white/10 text-white/70"
      >
        <FaInfoCircle className="text-white/50 text-lg" /> Info
      </button>
    </div>
  );
}