import { useRef, useContext } from "react";
import { PopoverContext } from "../../../context/PopoverProvider";
import { TASK_PRIORITIES } from "../../../constants/taskPriorities";
import PopoverPriorityContent from "../popoverContent/PopoverPriorityContent";

export default function TaskPrioritySelector({ projectId, task, mode="" }) {
  const { openPopover, closePopover } = useContext(PopoverContext);
  const btnRef = useRef(null);

  // ищем приоритет по ключу, если нет — берем Low
  const priority =
    TASK_PRIORITIES.find((p) => p.key === task.priority) ||
    TASK_PRIORITIES.find((p) => p.key === "Empty");

  const handleClick = (e) => {
    e.stopPropagation();
    if (!btnRef.current) return;

    const r = btnRef.current.getBoundingClientRect();

    openPopover(
      <PopoverPriorityContent
        task={task}
        projectId={projectId}
        closePopover={closePopover}
      />,
      {
        top: r.bottom + 2,
        left: r.left,
        scrollContainer: document.querySelector(".tasksContainer"),
      }
    );
  };

  if(mode === "taskModal"){
    return(
      <button
      ref={btnRef}
      onClick={handleClick}
      className="flex items-center gap-2 p-2 text-sm"
    >
      <div className="pointer-events-none text-lg select-none">
        {priority.icon}
      </div>
      {priority.title}
    </button>
    )
  } else{
    return(
      <button
      ref={btnRef}
      onClick={handleClick}
      className="flex items-center gap-2 p-2 w-full h-full rounded-sm text-white/70 text-base transition"
    >
      <div className="pointer-events-none text-sm select-none">
        {priority.icon}
      </div>
      
      <span className="truncate text-sm">
        {priority.title}
      </span>
    </button>
    )
  }
}