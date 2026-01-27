import { useContext } from "react";
import { IoFlag } from "react-icons/io5";
import { ProjectsContext } from "../../../context/ProjectsContext";

const Priorities = [
  { key: "Low", color: "text-white/90" },
  { key: "Normal", color: "text-yellow-300/90" },
  { key: "High", color: "text-red-400/90" },
];

export default function PopoverPriorityContent({ task, projectId, closePopover }) {
  const { dispatch } = useContext(ProjectsContext);

  function setPriority(priorityKey) {
    dispatch({
      type: "UPDATE_TASK_PRIORITY",
      payload: { projectId, taskId: task.id, priority: priorityKey },
    });
    closePopover();
  }

  return (
    <div className="w-52 bg-[#28292a] border border-white/10 rounded-lg p-2 flex flex-col gap-1 shadow-xl z-[999]">
      {Priorities.map((p) => (
        <button
          key={p.key}
          onClick={() => setPriority(p.key)}
          className={`
            flex items-center gap-2 px-2 py-1 rounded text-sm hover:bg-white/10 transition
            ${task.priority === p.key ? "text-white border border-white/20" : "text-white/70"}
          `}
        >
          <IoFlag className={p.color} />
          {p.key}
        </button>
      ))}
    </div>
  );
}