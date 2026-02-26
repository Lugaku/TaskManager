import TaskList from "../../mainTask/taskList";
import { FaList } from "react-icons/fa6";
import { MdDashboard, MdChecklist } from "react-icons/md";
import TaskBoard from "../../mainTaskBoard/TaskBoard";

export default function ProjectViewMode({
  viewMode,
  setViewMode,
  group,
  project,
  tasksScrollRef,
  dispatch,
}) {
  return (
    <main className="flex-1 h-full flex flex-col">
      {/* Header */}
      <div className="pt-4 px-4 pb-2 flex flex-row gap-1">
        <h2 className="text-white/50 text-base font-medium">
          {group?.name}
        </h2>
        <h2 className="text-white/50 text-base font-medium">/</h2>
        <h2 className="text-white/80 text-base font-medium flex items-center gap-1">
          <MdChecklist className="text-xl" />
          {project?.name}
        </h2>
      </div>

      {/* View Switch */}
      <div className="px-4 flex flex-row gap-4 relative">
        <div
          onClick={() => setViewMode("list")}
          className={`relative cursor-pointer flex items-center px-2 py-1 pb-2 gap-1 text-sm ${
            viewMode === "list"
              ? "text-white/90"
              : "hover:bg-white/10 text-white/50"
          }`}
        >
          <FaList className="text-white/90 p-[2px] bg-white/30 text-sm" />
          <span>List</span>
          {viewMode === "list" && (
            <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-white/80" />
          )}
        </div>

        <div
          onClick={() => setViewMode("board")}
          className={`relative cursor-pointer flex items-center px-2 py-1 pb-2 gap-1 text-sm ${
            viewMode === "board"
              ? "text-white/90"
              : "hover:bg-white/10 text-white/50"
          }`}
        >
          <MdDashboard className="text-sky-500/90 text-sm" />
          <span>Board</span>
          {viewMode === "board" && (
            <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-white/80" />
          )}
        </div>
      </div>

      <hr className="border-white/10 w-full pb-2" />

      {/* Content */}
      <div
        ref={tasksScrollRef}
        className="overflow-y-scroll tasksContainer max-h-[80vh]"
      >
        {viewMode === "list" && (
          <TaskList
            project={project}
          />
        )}

        {viewMode === "board" && (
          <div className="px-4">
            <TaskBoard
              tasks={project?.tasks || []}
              project={project}
              onStatusChange={(taskId, newStatus) => {
                dispatch({
                  type: "UPDATE_TASK_STATUS",
                  payload: {
                    projectId: project.id,
                    taskId,
                    status: newStatus,
                  },
                });
              }}
            />
          </div>
        )}
      </div>
    </main>
  );
}