import { useState, useContext } from "react";
import SimpleButton from "../buttons/SimpleButton";
import TaskGroup from "./TaskGroup";
import { TASK_STATUSES } from "../../constants/taskStatuses";
import { ModalContext } from "../modal/ModalProvider";
import UniversalModal from "../modal/UniversalModal";
import { useProjects } from "../../hooks/useProjects";

const groups = TASK_STATUSES;

export default function TaskList({ project }) {
  const { openModal, closeModal } = useContext(ModalContext);
  const { dispatch } = useProjects();

  // состояние открытости категорий
  const [openGroups, setOpenGroups] = useState(
    Object.fromEntries(TASK_STATUSES.map((s) => [s.key, true]))
  );

  function handleAddTask(statusKey) {
    openModal(
      <UniversalModal
        title="Create task"
        submitText="Create"
        onClose={closeModal}
        fields={[
          { name: "title", placeholder: "Task title", label: "Create name for your task"},
          { name: "description", placeholder: "Description", label: "Add to description", optional: "(optional)"},
        ]}
        desc="Create your task and use our tools to manage it"
        onSubmit={(data) => {
          dispatch({
            type: "ADD_TASK",
            payload: {
              projectId: project.id,
              title: data.title,
              description: data.description,
              status: statusKey,
              priority: "Empty",
            },
          });
        }}
      />
    );
  }
  
  return (
    <main className="flex flex-col gap-6">
      {/* Верхний блок */}
      <section className="sticky
        
        top-0
        z-20
        bg-[#121212]
        flex justify-between items-end
        px-4
        py-1 pb-3
        border-b border-white/10">
        <p className="text-white/50 text-sm">Add new task</p>

        <SimpleButton
          onClick={() => handleAddTask("todo")}
          size="none"
          color="none"
          className="h-7 px-3 rounded-lg flex items-center justify-center bg-white/80 hover:bg-white text-black/80 transition"
        >
          <div className="text-xs tracking-wide">Add Task</div>
        </SimpleButton>
      </section>

      {/* Категории */}
      <section className="flex flex-col gap-8 pb-40">
        {groups.map((group) => {
          const items = project.tasks.filter((t) => t.status === group.key);
          if (items.length === 0) return null;

          return (
            <TaskGroup
              key={group.key}
              group={group}
              items={items}
              projectId={project.id}
              open={openGroups[group.key]}
              toggle={() =>
                setOpenGroups((prev) => ({
                  ...prev,
                  [group.key]: !prev[group.key],
                }))
              }
              onAddTask={() => handleAddTask(group.key)}
            />
          );
        })}
      </section>
    </main>
  );
}