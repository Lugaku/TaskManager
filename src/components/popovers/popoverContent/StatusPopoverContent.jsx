import { useProjects } from "../../../hooks/useProjects";
import { TASK_STATUSES } from "../../../constants/taskStatuses";
import { useMemo } from "react";

export default function StatusPopoverContent({ taskId, projectId, closePopover }) {
  const { projectGroups, dispatch } = useProjects();

  const task = useMemo(() => {
    for (const group of projectGroups) {
      const project = group.projects.find(p => p.id === projectId);
      if (project) {
        const t = project.tasks.find(t => t.id === taskId);
        if (t) return t;
      }
    }
    return null;
  }, [projectGroups, projectId, taskId]);

  if (!task) return null;

  function setStatus(statusKey) {
    console.log("Before update:", projectId, task.id, task.status);

    dispatch({
      type: "UPDATE_TASK_STATUS",
      payload: {
        projectId,
        taskId: task.id,
        status: statusKey,
      },
    });

    console.log("After dispatch");
    closePopover();
  }

  return (
    <div className="w-52 bg-[#1b1c1d] border border-white/10 rounded-lg flex flex-col shadow-xl z-[999]">
      <section className="flex flex-col gap-1 p-4">
        <p className="text-white/40 text-xs pb-2">Task Status</p>
        <div className="flex flex-col gap-1">
          {TASK_STATUSES.map((s) => (
            <button
              key={s.key}
              onClick={() => setStatus(s.key)}
              className={`
                flex items-center gap-4 rounded text-sm hover:bg-white/10 transition
                ${s.key === task.status ? "text-white" : "text-white/90"} p-1
              `}
            >
              {s.icon}
              {s.title}
            </button>
          ))}
        </div>
      </section>
      <hr className="border-white/10"/>
      <section className="bg-[#171819] h-5"></section>
    </div>
  );
}