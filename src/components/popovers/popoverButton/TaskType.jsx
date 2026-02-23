import { useRef, useContext } from "react";
import { PopoverContext } from "../../../context/PopoverProvider";
import { TASK_TYPES } from "../../../constants/taskTypes";
import PopoverTypeContent from "../popoverContent/PopoverTypePopover";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function TaskTypeSelector({ projectId, task }) {
  const { openPopover, closePopover } = useContext(PopoverContext);
  const btnRef = useRef(null);

  const type =
    TASK_TYPES.find((p) => p.key === task.type) ||
    TASK_TYPES.find((p) => p.key === "Task");

  const handleClick = (e) => {
    e.stopPropagation();
    if (!btnRef.current) return;

    const r = btnRef.current.getBoundingClientRect();

    openPopover(
      <PopoverTypeContent
        task={task}
        projectId={projectId}
        closePopover={closePopover}
      />,
      {
        top: r.bottom + 4,
        left: r.left,
        scrollContainer: document.querySelector(".tasksContainer"),
      }
    );
  };

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      className="
        flex items-center gap-2 p-2 text-sm
      "
    >
      <div className="flex items-center gap-2">
        <span className="text-white/70">{type.icon}</span>
        <span className="tracking-wide">{type.title}</span>
      </div>

      
    </button>
  );
}