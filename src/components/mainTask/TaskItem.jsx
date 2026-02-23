import { useContext, useCallback } from "react";
import TaskStatusSelector from "../popovers/popoverButton/TaskStatusSelector";
import TaskOptionsMenu from "../popovers/popoverButton/TaskOptionsMenu";
import TaskPrioritySelector from "../popovers/popoverButton/TaskPrioritySelector";
import TaskDueDateSelector from "../popovers/popoverButton/TaskDueDateSelector";
import { ModalContext } from "../modal/ModalProvider";
import TaskModal from "../modal/TaskModal/TaskModal";

export default function TaskItem({ task, group, projectId }) {
  const { openModal } = useContext(ModalContext);

  const openTaskModal = useCallback(() => {
    openModal(
      <TaskModal
        projectId={projectId}
        taskId={task.id}
        style={group}
      />
    );
  }, [openModal, projectId, task.id, group]);

  const cellClass =
    "flex items-center h-10 px-2 rounded-md border text-sm border-transparent hover:border-white/20 transition-colors";

  const stop = (e) => e.stopPropagation();

  return (
    <div className=" relative">
      {/* Абсолютная линия */}
      <div className="absolute top-0 left-12 right-16 h-[1px] bg-white/10" />

      <div
        onClick={openTaskModal}
        className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] items-center h-10 px-24 hover:bg-white/5 cursor-pointer"
      >
        {/* Name */}
        <div className={`flex items-center gap-3 min-w-0  ${group.textColor}`}>
          <span className="text-lg">
            {group.icon}
          </span>
          <span className="text-sm font-medium text-white/90 truncate">
            {task.title}
          </span>
        </div>
        <div></div>

        {/* Priority */}
        <div className={`${cellClass} text-xs`} onClick={stop}>
          <TaskDueDateSelector projectId={projectId} task={task} />
        </div>

        <div className={`${cellClass} text-xs`} onClick={stop}>
          <TaskPrioritySelector projectId={projectId} task={task} />
        </div>

        {/* Status */}
        <div className={`${cellClass} py-1 px-2 truncate`} onClick={stop}>
          <TaskStatusSelector projectId={projectId} taskId={task.id} />
        </div>

        {/* Options */}
        <div className={` opacity-0 hover:opacity-100`} onClick={stop}>
          <TaskOptionsMenu
            task={task}
            projectId={projectId}
          />
        </div>
      </div>
    </div>
  );
}