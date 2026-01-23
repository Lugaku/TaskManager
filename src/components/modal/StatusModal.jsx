// src/components/modal/StatusModal.jsx
import { useEffect, useRef } from "react";
import { useProjects } from "../../context/useProjects";
import { TASK_STATUSES } from "../../constants/taskStatuses";

export default function StatusModal({ task, projectId, onClose }) {
  const { dispatch } = useProjects();
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

  function setStatus(statusKey) {
    dispatch({
      type: "UPDATE_TASK_STATUS",
      payload: {
        projectId,
        taskId: task.id,
        status: statusKey,
      },
    });
    onClose();
  }

  return (
    <div
      ref={ref}
      className="
        absolute top-8 right-0
        w-60 bg-[#1c1f22] border border-white/10
        rounded-lg p-2 shadow-xl
        flex flex-col gap-1 z-[999]
      "
    >
      {TASK_STATUSES.map((s) => (
        <button
          key={s.key}
          onClick={() => setStatus(s.key)}
          className={`
            flex items-center gap-2 px-2 py-1 rounded text-sm
            hover:bg-white/10 transition
            ${s.key === task.status ? "bg-white/5 text-white/90" : "text-white/70"}
          `}
        >
          {s.icon}
          {s.title}
        </button>
      ))}
    </div>
  );
}