import { useRef, useContext } from "react";
import { IoIosMore } from "react-icons/io";
import { useProjects } from "../../../hooks/useProjects";
import { PopoverContext } from "../../../context/PopoverProvider";
import OptionsPopoverContent from "../popoverContent/OptionsPopoverContent";
import DescriptionPopoverContent from "../popoverContent/DescriptionPopoverContent";

export default function TaskOptionsMenu({ task, projectId, mode="", setIsEditing}) {
  const { dispatch } = useProjects();
  const { openPopover, closePopover } = useContext(PopoverContext);
  const btnRef = useRef(null);

  return (
    <button
      ref={btnRef}
      onClick={(e) => {
      e.stopPropagation();

      const r = btnRef.current.getBoundingClientRect();

      if (mode === "forDesc") {
        openPopover(
          <DescriptionPopoverContent
            task={task}
            setEditing={() => setIsEditing(true)}
            onClose={closePopover}
          />,
          {
            top: r.bottom + window.scrollY,
            left: r.left + window.scrollX,
            scrollContainer: document.querySelector(".tasksContainer"),
          }
        );
      } else {
        openPopover(
          <OptionsPopoverContent
            task={task}
            onDelete={(taskId) => {
              dispatch({
                type: "DELETE_TASK",
                payload: { projectId, taskId },
              });
              closePopover();
            }}
            onClose={closePopover}
          />,
          {
            top: r.bottom + window.scrollY,
            left: r.left + window.scrollX,
            scrollContainer: document.querySelector(".tasksContainer"),
          }
        );
      }
    }}
      className="flex items-center w-full px-2 py-2 text-white/70 text-xl rounded-sm transition"
    >
      <IoIosMore />
    </button>
  );
}