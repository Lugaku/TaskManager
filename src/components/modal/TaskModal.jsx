// src/components/modal/TaskModal.jsx
import { useProjects } from "../../context/useProjects";
import { useContext } from "react";
import { ModalContext } from "./ModalProvider";
import { IoClose } from "react-icons/io5";
import { MdChecklist } from "react-icons/md";

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

  const creationDate = new Date(task.id);
    const formatted = creationDate.toLocaleDateString("ru-RU");
    
    const path = `${group?.name} > ${<MdChecklist/>}${project?.name}`;

  if (!task) return null;



  return (
    <div className="flex flex-col text-white/90 w-[110vh] h-[80vh]">
        <section className="h-1/10 flex flex-row items-center justify-between gap-8 bg-[#141414] rounded-t-lg border border-b-0 border-white/10 p-4">
            <div className="flex flex-row justify-center items-center gap-2">
                <div className="w-6 h-6 text-base rounded-sm bg-[#25678d] flex items-center justify-center text-white">
                {group?.name?.[0]}
                </div>

                {/* breadcrumb */}
                <div className="flex items-center gap-1 text-white/50 text-base">
                <span>{group?.name}</span>
                <span> &gt; </span>
                <MdChecklist className="inline text-xl text-white/90" />
                <span className="text-white/90">{project?.name}</span>
                </div>
            </div>

            <div className="flex flex-row justify-center gap-8 items-center">
                <p className="text-white/50 text-sm">Created: {formatted}</p>
                <button
                onClick={closeModal}
                className="p-1 rounded-full bg-white/10 text-white/50 hover:bg-white/20 hover:text-white/80"
                >
                <IoClose className="text-lg" />
                </button>
            </div>
            </section>
      <section className="flex flex-col gap-3 bg-[#1b1c1c] border border-white/10 p-4 h-6/10">
        <h2 className="text-lg mb-2">{task.title}</h2>

      </section>
      <section className="flex flex-col gap-3 bg-[#141414] rounded-b-lg border border-t-0 border-white/10 p-4 h-1/10">
      </section>
    </div>
  );
}