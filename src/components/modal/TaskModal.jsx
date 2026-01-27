// src/components/modal/TaskModal.jsx
import { useProjects } from "../../context/useProjects";
import { useContext } from "react";
import { ModalContext } from "./ModalProvider";
import { IoClose } from "react-icons/io5";
import { MdChecklist } from "react-icons/md";
import TaskStatusSelector from "../popovers/popoverButton/ListStatusSelector";
import TaskPrioritySelector from "../popovers/popoverButton/ListPrioritySelector";
import { TbProgressBolt } from "react-icons/tb";
import { IoFlagOutline } from "react-icons/io5";
import { PopoverProvider } from "../../context/PopoverProvider";

export default function TaskModal({ projectId, taskId }) {
  const { projectGroups } = useProjects();
  const { closeModal } = useContext(ModalContext);

  const group = projectGroups.find(g =>
    g.projects.some(p => p.id === projectId)
  );

  const project = projectGroups
    .flatMap(g => g.projects)
    .find(p => p.id === projectId);

  const task = project?.tasks.find(t => t.id === taskId);
  if (!task) return null;

  const creationDate = new Date(task.id);
  const formatted = creationDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <PopoverProvider>
      <div
        className="
          flex flex-col
          text-white/90
          w-[95vw]
          max-w-[1300px]
          h-[90vh]
        "
      >
        {/* HEADER */}
        <section className="shrink-0 flex items-center justify-between gap-8 bg-[#0e0e0e] rounded-t-lg border border-b-0 border-white/10 p-4 h-[50px]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 text-base rounded-sm bg-[#25678d] flex items-center justify-center text-white">
              {group?.name?.[0]}
            </div>

            <div className="flex items-center gap-1 text-white/50 text-base leading-none">
              <span className="max-w-[120px] truncate">
                  {group?.name}
              </span>
              <span>/</span>
              <MdChecklist className="text-2xl text-white/70 shrink-0" />
              <span className="max-w-[180px] truncate text-white/90">
                  {project?.name}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <p className="text-white/50 text-sm">Created: {formatted}</p>
            <button
              onClick={closeModal}
              className="p-1 rounded-full bg-white/10 text-white/50 hover:bg-white/20 hover:text-white/80"
            >
              <IoClose className="text-lg" />
            </button>
          </div>
        </section>

        {/* Main */}
        <section className="flex-1 w-full flex flex-row bg-[#121212] border border-white/10 overflow-y-auto">
          {/* Left content */}
          <div className="flex flex-col w-3/5 items-center gap-8">
            {/* Title */}
            <div className="flex w-full items-center pt-4 px-8">
              <h2 className="text-2xl font-semibold">{task.title}</h2>
            </div>

            {/* Meta / selectors */}
            <div className="px-8 w-full">
              <div
                className="
                  grid
                  grid-cols-[100px_1fr]
                  gap-y-4
                  gap-x-6
                  items-center
                "
              >
                {/* Status */}
                <p className="text-white text-base flex flex-row gap-2 items-center">
                  <TbProgressBolt/>
                  Status
                </p>
                <div className="h-8 flex items-center border-1 rounded-lg border-white/20 hover:border-white/50 w-fit">
                  <TaskStatusSelector projectId={projectId} task={task} />
                </div>

                {/* Priority */}
                <p className="text-white text-base flex flex-row gap-2 items-center">
                  <IoFlagOutline/>
                  Priority
                </p>
                <div className="h-8 flex items-center border-1 rounded-lg border-white/20 hover:border-white/50 w-fit">
                  <TaskPrioritySelector projectId={projectId} task={task} />
                </div>
              </div>
            </div>

            <div className="w-[90%] rounded-xl border-1 border-white/15 p-8 h-60">
              <p className="text-white/60">{task.description}</p>
            </div>
          </div>

          {/* Right content */}
          <div className="flex w-2/5 border-l-1 border-white/10"></div>
        </section>
      </div>
    </PopoverProvider>
  );
}