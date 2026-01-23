import { useRef, useEffect, useContext } from "react";
import { IoFlag } from "react-icons/io5";
import { ProjectsContext } from "../../context/ProjectsContext";

const Priorities = [
  { key: "Low", color: "text-white/90" },
  { key: "Normal", color: "text-yellow-300/90" },
  { key: "High", color: "text-red-400/90" },
];

export default function TaskPriorityModal({ task, projectId, onClose }) {
  const { dispatch } = useContext(ProjectsContext);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  function setPriority(priorityKey) {
    dispatch({
      type: "UPDATE_TASK_PRIORITY",
      payload: { projectId, taskId: task.id, priority: priorityKey },
    });
    onClose();
  }

  return (
    <div
      ref={ref}
      className="absolute top-8 right-0 w-52 bg-[#1c1f22] border border-white/10 rounded-lg p-2 flex flex-col gap-1 shadow-xl z-[999]"
    >
      {Priorities.map((p) => (
        <button
          key={p.key}
          onClick={() => setPriority(p.key)}
          className={`
            flex items-center gap-2 px-2 py-1 rounded text-sm hover:bg-white/10 transition
            ${task.priority === p.key ? "bg-white/5 text-white/90" : "text-white/70"}
          `}
        >
          <IoFlag className={p.color} />
          {p.key}
        </button>
      ))}
    </div>
  );
}