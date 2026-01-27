// src/components/mainTask/TaskOptionsMenu.jsx
import { useRef, useContext } from "react";
import { IoIosMore } from "react-icons/io";
import OptionsPopoverContent from "../popoverContent/OptionsPopoverContent";
import { PopoverContext } from "../../../context/PopoverProvider";
import { useProjects } from "../../../context/useProjects";

export default function TaskOptionsMenu({ task, projectId }) {
  const { dispatch } = useProjects();
  const { openPopover, closePopover } = useContext(PopoverContext);
  const btnRef = useRef(null);

  function handleDelete(taskId) {
    dispatch({ type: "DELETE_TASK", payload: { projectId, taskId } });
  }

  const handleClick = () => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();

    openPopover(
      <OptionsPopoverContent
        task={task}
        onDelete={handleDelete}
        onClose={closePopover}
      />,
      {
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      }
    );
  };

  return (
    <div className="relative w-full">
      <button
        ref={btnRef}
        onClick={handleClick}
        className="flex items-center gap-2 px-2 py-2 w-full h-full rounded-sm text-white/70 text-xl transition"
      >
        <IoIosMore />
      </button>
    </div>
  );
}