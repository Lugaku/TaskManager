import { useRef, useContext, useMemo } from "react";
import { TASK_STATUSES } from "../../../constants/taskStatuses";
import { PopoverContext } from "../../../context/PopoverProvider";
import StatusPopoverContent from "../popoverContent/StatusPopoverContent";
import { useProjects } from "../../../hooks/useProjects";

export default function TaskStatusSelector({ projectId, taskId, mode = "" }) {
  const { openPopover, closePopover } = useContext(PopoverContext);
  const { projectGroups } = useProjects();
  const btnRef = useRef(null);

  // Берём свежую таску из projectGroups
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

  // Динамический текущий статус
  const current = TASK_STATUSES.find((s) => s.key === task.status);

  const handleClick = (e) => {
    e.stopPropagation();
    if (!btnRef.current) return;

    const r = btnRef.current.getBoundingClientRect();

    openPopover(
      <StatusPopoverContent
        taskId={taskId}
        projectId={projectId}
        closePopover={closePopover}
      />,
      {
        top: r.bottom + window.scrollY,
        left: r.left + window.scrollX,
        scrollContainer: document.querySelector(".tasksContainer"),
      }
    );
  };

  console.log("Selector render, status:", task.status);

  // ==== ЛОГИКА С МОДОМ ====
  if (mode === "taskModal") {
    return (
      <button
        ref={btnRef}
        onClick={handleClick}
        className="flex items-center gap-2 text-sm py-2 px-4"
          >
        {current?.iconModal}
        {current?.title}
        
      </button>
    );

  } else {
    return (
      <button
        ref={btnRef}
        onClick={handleClick}
        className={`${current.bgColorLight} flex items-center gap-1 p-2 pr-6 w-full h-full rounded-md font-semibold text-white transition`}
      >
        <div className="text-lg">
          {current?.icon}
        </div>
        <span className="truncate min-w-0 text-xs">
          {current?.title}
        </span>
      </button>
    );
  }
}

// return (
//       <button
//         ref={btnRef}
//         onClick={handleClick}
//         className={`flex items-center gap-2 px-2 py-2 w-full h-full rounded-sm text-white/70 text-sm transition`}
//       >
//         {current?.icon}
//         {current?.title}
//       </button>
//     );