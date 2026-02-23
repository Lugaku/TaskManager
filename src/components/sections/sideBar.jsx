import { useProjects } from "../../hooks/useProjects";
import { MdChecklist } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import SimpleButton from "../buttons/SimpleButton";
import GlobalGroupOptions from "../popovers/popoverButton/GroupOptions";
import { ModalContext } from "../modal/ModalProvider";
import { useContext, useState } from "react";
import UniversalModal from "../modal/UniversalModal";
import ProjectOption from "../popovers/popoverButton/ProjectOptions";

export default function SideBar() {
  const { projectGroups, selectedProjectId, dispatch } = useProjects();
  const { openModal, closeModal } = useContext(ModalContext);

  const [hoveredProjects, setHoveredProjects] = useState({});

  // Создание новой группы
  function handleAddGroup() {
    openModal(
      <UniversalModal
        title="Create a Space"
        submitText="Create Space"
        onClose={closeModal}
        fields={[{ name: "name", placeholder: "Group name", label: "Choose Name For Your Space"}]}
        desc="A Space represents teams, departments, or groups, each with its own Lists, workflows, and settings."
        onSubmit={(data) => {
          dispatch({
            type: "ADD_GROUP",
            payload: { name: data.name },
          });
          closeModal();
        }}
      />
    );
  }

  // Создание нового проекта внутри группы
  function handleAddProject(groupId) {
    openModal(
      <UniversalModal
        title="Create project"
        submitText="Create"
        onClose={closeModal}
        fields={[{ name: "name", placeholder: "Project name", label: "Select name for your project"}]}
        desc="Create new project"
        onSubmit={(data) => {
          dispatch({
            type: "ADD_PROJECT_TO_GROUP",
            payload: { groupId, name: data.name },
          });
          closeModal();
        }}
      />
    );
  }

  return (
    <aside className="bg-[#232525]/20 w-88 h-full flex flex-col px-2 py-1 overflow-y-auto border-r border-white/20">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-12 mt-2 px-2">
        <div className="text-lg text-white/80 font-medium mt-0.5">Workspace</div>

        <SimpleButton
          onClick={handleAddGroup}
          size="none"
          color="none"
          className="h-7 px-2 rounded-lg flex gap-1 items-center justify-center bg-white/80 hover:bg-white text-black/80"
        >
          <IoAddOutline />
          <div className="text-xs tracking-wide">Add Group</div>
        </SimpleButton>
      </div>

      {/* GROUPS */}
      <div className="flex-1 flex flex-col gap-1">
        {projectGroups.map((group) => (
          <div key={group.id} className="flex flex-col gap-1 relative">
            {/* Group header */}
            <div className="flex items-center justify-between px-1">
              <span className="text-sm flex items-center gap-2 text-white/80 font-medium">
                <div className="w-4 h-4 text-xs rounded-sm bg-[#25678d] flex items-center justify-center text-white">
                  {group.name?.[0]}
                </div>
                {group.name}
              </span>

              <div className="flex gap-2">
                <GlobalGroupOptions groupId={group.id} />
                <button
                  onClick={() => handleAddProject(group.id)}
                  className="text-white hover:bg-white/20 p-1 rounded-sm transition"
                >
                  <IoAddOutline size={18} />
                </button>
              </div>
            </div>

            {/* Projects + vertical line */}
            <div className="flex relative ml-7">
              <div className="absolute -left-4 w-[1px] bg-white/15 rounded-full h-full" />
              <div className="flex flex-col gap-1 w-full z-10">
                {group.projects.map((p) => {
  const isActive = p.id === selectedProjectId;
  const isHovered = hoveredProjects[p.id] || false;

  return (
    <div
      key={p.id}
      className={`flex items-center gap-2 pl-1 pr-3 py-1 rounded-md text-left text-sm transition ${
        isActive ? "bg-white/10 text-white/90" : "hover:bg-white/5 text-white/70"
      }`}
      onMouseEnter={() => setHoveredProjects(prev => ({ ...prev, [p.id]: true }))}
      onMouseLeave={() => setHoveredProjects(prev => ({ ...prev, [p.id]: false }))}
    >
      <span
        className="flex-1 flex gap-2 items-center truncate pl-2 cursor-pointer"
        onClick={() =>
          dispatch({
            type: "SELECT_PROJECT",
            payload: { projectId: p.id },
          })
        }
      >
        <MdChecklist className="text-lg" />
        {p.name}
      </span>

      {(isActive || isHovered) && (
        <ProjectOption groupId={group.id} projectId={p.id} />
      )}

      <span className="text-sm text-white/50 tabular-nums">{p.tasks.length}</span>
    </div>
  );
})}
              </div>
            </div>
          </div>
        ))}
        <h2 className="text-white/30">Add new Space</h2>
      </div>
    </aside>
  );
}