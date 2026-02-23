import { useRef, useContext } from "react";
import { PopoverContext } from "../../../context/PopoverProvider";
import PopoverDueDateContent from "../popoverContent/PopoverDueDateContent";
import { MdOutlineDateRange } from "react-icons/md";
import { formatCaption } from "react-day-picker";

export default function TaskDueDateSelector({ projectId, task, mode }) {
  const { openPopover, closePopover } = useContext(PopoverContext);
  const btnRef = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();
    if (!btnRef.current) return;

    const r = btnRef.current.getBoundingClientRect();

    openPopover(
      <PopoverDueDateContent
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

  const formattedDate = task.dueDate
  ? new Date(task.dueDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
  : null;


  if(mode === "taskModal"){
    return(
        <button
      ref={btnRef}
      onClick={handleClick}
      className="flex flex-row items-center justify-start gap-2 p-2 w-full h-full rounded-sm text-white/70 text-sm transition"
    >
        <div className="pointer-events-none text-lg select-none">
            <MdOutlineDateRange/>
        </div>
        <span className="">
            {formattedDate}
        </span>
      
    </button>
    )
  } else{
        return(
        <button
        ref={btnRef}
        onClick={handleClick}
        className="flex items-center gap-2 p-2 w-full h-full rounded-sm text-white/70 text-base transition"
        >
        <div className="flex flex-row text-base gap-2 items-center justify-start pointer-events-none select-none">
            <MdOutlineDateRange/>
            <span className="">
                {formattedDate}
            </span>
        </div>
        </button>
        )
    }

    
  }
