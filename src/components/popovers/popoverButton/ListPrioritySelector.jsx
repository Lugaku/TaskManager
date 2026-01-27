import {useRef, useContext } from "react";
import { IoFlag } from "react-icons/io5";
import PopoverPriorityContent from "../popoverContent/PopoverPriorityContent";
import { PopoverContext } from "../../../context/PopoverProvider";

export default function TaskPrioritySelector({ projectId, task }) {
  const { openPopover, closePopover } = useContext(PopoverContext);
  const btnRef = useRef(null); // ссылка на кнопку

  const priority = task.priority || "Low";

  const handleClick = () => {
    if (!btnRef.current) return;

    // получаем позицию кнопки
    const rect = btnRef.current.getBoundingClientRect();

    openPopover(
      <PopoverPriorityContent
        task={task}
        projectId={projectId}
        closePopover={closePopover}
      />,
      {
        top: rect.bottom + window.scrollY + 4, // чуть ниже кнопки
        left: rect.left + window.scrollX,  // по левому краю кнопки
      }
    );
  };

  return (
    <div className="relative w-full">
      <button
        ref={btnRef}
        onClick={handleClick}
        className="flex items-center gap-2 px-2 py-2 w-full h-full rounded-sm text-white/70 text-sm transition"
      >
        <IoFlag
          className={`${
            priority === "Low"
              ? "text-white/90"
              : priority === "Normal"
              ? "text-yellow-300/90"
              : "text-red-400/90"
          }`}
        />
        {priority}
      </button>
    </div>
  );
}