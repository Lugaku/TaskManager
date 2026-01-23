import TaskStatusSelector from "../modals/ListStatusSelector";
import TaskOptionsMenu from "../modals/ListOptionsMenu";
import { useProjects } from "../../context/useProjects";
import TaskPrioritySelector from "../modals/ListPrioritySelector";
import { useContext } from "react";
import { ModalContext } from "../modal/ModalProvider";
import TaskModal from "../modal/TaskModal";


export default function TaskItem({ task, group, projectId }) {
  const { dispatch } = useProjects();
  const { openModal } = useContext(ModalContext);

  function handleDelete(taskId) {
    dispatch({ type: "DELETE_TASK", payload: { projectId, taskId } });
  }

  function openTaskModal() {
    openModal(
      <TaskModal
        projectId={projectId}
        taskId={task.id}
        group={group}
      />
    );
  }

  const hoverBorderClass =
    "border border-transparent hover:border-white/20 transition-colors duration-150 rounded-sm";

  return (
    <div className="w-full relative">
      <div className="absolute top-0 left-16 right-16 h-[1px] bg-white/10" />

      {/* 👇 ВОТ ОН — ЕДИНЫЙ КЛИКАБЕЛЬНЫЙ КОНТЕЙНЕР */}
      <div
        onClick={openTaskModal}
        className="flex flex-row items-center px-24 hover:bg-white/5 rounded cursor-pointer"
      >
        {/* Name */}
        <div className="flex items-center gap-3 w-4/10">
          {group.icon}
          <span className="text-white/80 text-sm">{task.title}</span>
        </div>

        {/* Priority */}
        <div
          className={`flex w-2/10 items-center ${hoverBorderClass}`}
          onClick={(e) => e.stopPropagation()}
        >
          <TaskPrioritySelector projectId={projectId} task={task} />
        </div>

        {/* Status */}
        <div
          className={`flex w-2/10 items-center ${hoverBorderClass}`}
          onClick={(e) => e.stopPropagation()}
        >
          <TaskStatusSelector projectId={projectId} task={task} />
        </div>

        {/* Options */}
        <div
          className={`flex w-2/10 items-center ${hoverBorderClass}`}
          onClick={(e) => e.stopPropagation()}
        >
          <TaskOptionsMenu
            task={task}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}