import { useState, useRef, useEffect, useContext } from "react";
import { IoFlag } from "react-icons/io5";
import TaskPriorityModal from "../modal/TaskPriorityModal";
import { ProjectsContext } from "../../context/ProjectsContext";

export default function TaskPrioritySelector({ projectId, task }) {
  const { dispatch } = useContext(ProjectsContext);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const priority = task.priority || "Low"; // дефолт

  // закрытие при клике вне
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 px-2 py-2 w-full h-full rounded-sm text-white/70 text-sm transition"
      >
        <IoFlag className={`${priority === "Low" ? "text-white/90" : priority === "Normal" ? "text-yellow-300/90" : "text-red-400/90"}`} />
        {priority}
      </button>

      {open && (
        <TaskPriorityModal
          projectId={projectId}
          task={task}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}