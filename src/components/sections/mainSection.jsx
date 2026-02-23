import { useState } from "react";
import { useRef } from "react";
import { useProjects } from "../../hooks/useProjects";
import TaskList from "../mainTask/taskList";
import { FaList } from "react-icons/fa6";
import { MdDashboard, MdChecklist } from "react-icons/md";
import TaskBoard from "../mainTaskBoard/TaskBoard";

export default function MainSection() {
  const [taskAddModalOpen, setTaskAddModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const { dispatch } = useProjects();
  const tasksScrollRef = useRef(null);

  const { projectGroups, selectedProjectId } = useProjects();

  // ----------- НОРМАЛЬНЫЙ ПОИСК ПРОЕКТА И ГРУППЫ -----------
  let project = null;
  let group = null;

  for (const g of projectGroups) {
    const found = g.projects.find((p) => p.id === selectedProjectId);
    if (found) {
      project = found;
      group = g;
      break;
    }
  }
  // ---------------------------------------------------------

  if (!project) {
    return (
      <main className="w-full h-full flex items-center justify-center text-white/30">
        Select a project
      </main>
    );
  }

  return (
    <main className="w-full h-full flex flex-col">
      {/* Заголовок */}
      <div className="pt-4 px-4 pb-2 flex flex-row gap-1">
        <h2 className="text-white/50 text-base font-medium">{group.name}</h2>
        <h2 className="text-white/50 text-base font-medium">/</h2>
        <h2 className="text-white/80 text-base font-medium flex items-center gap-1">
          <MdChecklist className="text-xl" />
          {project.name}
        </h2>
      </div>

      {/* Переключатель List / Board */}
      <div className="px-4 flex flex-row gap-4 relative">
        <div
          onClick={() => setViewMode("list")}
          className={`relative rounded-xs cursor-pointer flex items-center px-2 py-1 pb-2 gap-1 text-sm ${
            viewMode === "list"
              ? "text-white/90"
              : "hover:bg-white/10 text-white/50"
          }`}
        >
          <FaList className="text-white/90 p-[2px] rounded-xs bg-white/30 text-sm" />
          <span>List</span>
          {viewMode === "list" && (
            <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-white/80" />
          )}
        </div>

        <div
          onClick={() => setViewMode("board")}
          className={`relative rounded-xs cursor-pointer flex items-center px-2 py-1 pb-2 gap-1 text-sm ${
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

      {/* Содержимое */}
      <div
        ref={tasksScrollRef}
        className="overflow-y-scroll tasksContainer max-h-[80vh]"
      >
        {viewMode === "list" && (
          <TaskList
            project={project}
            modalOpen={taskAddModalOpen}
            setModalOpen={setTaskAddModalOpen}
          />
        )}

        {viewMode === "board" && (
          <div className="text-white/50 tasksContainer  px-4">
            <TaskBoard
              tasks={project.tasks}
              project={project}
              onStatusChange={(taskId, newStatus) => {
                dispatch({
                  type: "UPDATE_TASK_STATUS",
                  payload: { projectId: project.id, taskId, status: newStatus },
                });
              }}
            />
          </div>
        )}
      </div>
    </main>
  );
}