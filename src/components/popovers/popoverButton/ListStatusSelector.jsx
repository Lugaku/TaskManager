import { useRef, useContext } from "react";
import { PopoverContext } from "../../../context/PopoverProvider";
import StatusPopoverContent from "../popoverContent/StatusPopoverContent";
import { TASK_STATUSES } from "../../../constants/taskStatuses";

export default function TaskStatusSelector({ projectId, task }) {
  const { openPopover, closePopover } = useContext(PopoverContext);
  const btnRef = useRef(null);
  console.log(btnRef.current); // должно быть HTMLElement

  const handleClick = () => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();

    openPopover(
      <StatusPopoverContent
        task={task}
        projectId={projectId}
        closePopover={closePopover}
      />,
      {
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
      }
    );
  };

  const current = TASK_STATUSES.find((s) => s.key === task.status);

  return (
    <div className="relative w-full">
      <button
        ref={btnRef}
        onClick={handleClick}
        className="flex items-center gap-2 px-2 py-2 w-full h-full rounded-sm text-white/70 text-sm transition"
      >
        {current.icon}
        {current.title}
      </button>
    </div>
  );
}