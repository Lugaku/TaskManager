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
    <div className="relative" ref={ref}>
      {/* кнопка */}
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1 px-1 h-6 rounded-md hover:bg-white/10 text-white/70"
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