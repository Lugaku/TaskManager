import { useState, useRef, useEffect } from "react";
import { IoIosMore } from "react-icons/io";
import TaskOptionsModal from "../modal/TaskOptionsModal";

export default function TaskOptionsMenu({ task, onDelete, onInfo }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!task) return null;

  return (
    <div className="relative w-full" ref={ref}>
      {/* кнопка */}
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 px-2 py-2 w-full h-full rounded-sm text-white/70 text-xl transition"
      >
        <IoIosMore />
      </button>

      {/* модалка с опциями */}
      {open && (
        <TaskOptionsModal
          task={task}
          onClose={() => setOpen(false)}
          onDelete={onDelete}
          onInfo={onInfo}
        />
      )}
    </div>
  );
}