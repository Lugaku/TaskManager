import { useProjects } from "../../../hooks/useProjects";
import { useMemo, useContext, useCallback } from "react";
import { ModalContext } from "../../modal/ModalProvider";
import TaskModal from "../../modal/TaskModal/TaskModal";

export default function MyTasks() {
  const { projectGroups } = useProjects();
  const { openModal } = useContext(ModalContext);

  const allTasks = useMemo(
    () =>
      projectGroups.flatMap(group =>
        group.projects.flatMap(project =>
          project.tasks.map(task => ({
            ...task,
            projectId: project.id,
          }))
        )
      ),
    [projectGroups]
  );

  const tasksWithDate = useMemo(
    () => allTasks.filter(t => t.dueDate && !isNaN(new Date(t.dueDate).getTime())),
    [allTasks]
  );

  const priorityMap = { Urgent: 4, High: 3, Normal: 2, Low: 1, Empty: 0 };

  const overdueTasks = useMemo(() => {
    const now = Date.now();
    return tasksWithDate
      .filter(t => new Date(t.dueDate).getTime() < now)
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 8);
  }, [tasksWithDate]);

  const upcomingTasks = useMemo(() => {
    const now = Date.now();
    return tasksWithDate
      .filter(t => new Date(t.dueDate).getTime() >= now)
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 8);
  }, [tasksWithDate]);

  const priorityTasks = useMemo(
    () =>
      [...allTasks]
        .sort((a, b) => (priorityMap[b.priority] || 0) - (priorityMap[a.priority] || 0))
        .slice(0, 8),
    [allTasks]
  );

  const openTaskFromBlock = useCallback(
    task => {
      if (!task.projectId) return;
      openModal(<TaskModal projectId={task.projectId} taskId={task.id} />);
    },
    [openModal]
  );

  const blocks = [
    { type: "overdue", title: "Overdue", data: overdueTasks },
    { type: "upcoming", title: "Upcoming", data: upcomingTasks },
    { type: "priority", title: "By Priority", data: priorityTasks },
  ];

  const renderTask = (task, blockType) => (
    <div
      key={task.id}
      onClick={() => openTaskFromBlock(task)}
      className="w-full p-2 px-4 flex justify-between items-center border-t border-white/10 hover:bg-white/10 transition cursor-pointer"
    >
      <p className="text-sm truncate w-1/2">{task.title}</p>
      {blockType === "priority" ? (
        <p className="text-xs">{task.priority}</p>
      ) : (
        task.dueDate && (
          <p className="text-xs">
            {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </p>
        )
      )}
    </div>
  );

  return (
    <section className="flex-1 h-full flex flex-col">
      <div className="w-full border-b p-3 border-white/20 flex justify-between items-center">
        <p className="text-white/90 text-lg">My Tasks</p>
        <div className="h-7 px-2 rounded-lg flex items-center justify-center bg-white/80 hover:bg-white text-black/80">
          BUTTON
        </div>
      </div>

      <section className="w-full max-h-[85vh] grid grid-cols-2 gap-4 p-4 text-white/60 overflow-y-scroll">
        {blocks.map((block, index) => (
          <div
            key={index}
            className="border bg-[#141414] min-h-[40vh] rounded-lg flex flex-col border-white/20"
          >
            <p className="text-white/80 p-2 text-lg">{block.title}</p>
            {block.data.length === 0 ? (
              <p className="text-white/30 text-xs px-4 pb-4">No tasks</p>
            ) : (
              block.data.map(task => renderTask(task, block.type))
            )}
          </div>
        ))}
      </section>
    </section>
  );
}