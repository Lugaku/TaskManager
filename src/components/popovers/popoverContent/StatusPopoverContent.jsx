import { useProjects } from "../../../context/useProjects";
import { TASK_STATUSES } from "../../../constants/taskStatuses";

export default function StatusPopoverContent({ task, projectId, closePopover }) {
  const { dispatch } = useProjects();

  function setStatus(statusKey) {
    dispatch({
      type: "UPDATE_TASK_STATUS",
      payload: {
        projectId,
        taskId: task.id,
        status: statusKey,
      },
    });
    closePopover();
  }

  return (
    <div className="w-60 bg-[#28292a] border border-white/10 rounded-lg p-2 flex flex-col gap-1 shadow-xl z-[999]">
      {TASK_STATUSES.map((s) => (
        <button
          key={s.key}
          onClick={() => setStatus(s.key)}
          className={`
            flex items-center gap-2 px-2 py-1 rounded text-sm hover:bg-white/10 transition
            ${s.key === task.status ? "text-white border border-white/20" : "text-white/70"}
          `}
        >
          {s.icon}
          {s.title}
        </button>
      ))}
    </div>
  );
}