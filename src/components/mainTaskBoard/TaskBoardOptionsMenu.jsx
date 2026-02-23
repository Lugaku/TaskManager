import TaskOptionsMenu from "../popovers/popoverButton/TaskOptionsMenu";
import TaskPrioritySelector from "../popovers/popoverButton/TaskPrioritySelector";
import { IoFlag } from "react-icons/io5";
import { HiFlag } from "react-icons/hi";

export default function TaskBoardOptionsMenu({ projectId, task }) {

  return (
    <div className="absolute top-1 right-1 justify-center items-center rounded-sm p-1 flex flex-row gap-1">
      <div>
        <HiFlag
            className={` text-lg
              ${task.priority === "Low"
                ? "text-white/90"
                : task.priority === "Normal"
              ? "text-yellow-300/90"
              : "text-red-400/90"}
            `}
          />
      </div>
    </div>
  );
}