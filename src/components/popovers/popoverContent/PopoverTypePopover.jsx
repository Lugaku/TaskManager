import { useContext } from "react";
import { ProjectsContext } from "../../../context/ProjectsContext";
import { TASK_TYPES } from "../../../constants/taskTypes";

export default function PopoverTypeContent({
  task,
  projectId,
  closePopover,
}) {
  const { dispatch } = useContext(ProjectsContext);

  function setType(type) {
    dispatch({
      type: "UPDATE_TASK_TYPE",
      payload: {
        projectId,
        taskId: task.id,
        type,
      },
    });
    closePopover();
  }

  return (
    <div className="w-52 bg-[#1b1c1d] border border-white/10 rounded-lg flex flex-col shadow-xl">
      <section className="flex flex-col gap-1 p-4">
        <p className="text-white/40 text-xs pb-2">Task Types</p>

        {TASK_TYPES.map((p) => (
          <button
            key={p.key}
            onClick={() => setType(p.key)}
            className="flex items-center gap-4 rounded text-sm hover:bg-white/10 transition text-white/90 p-1"
          >
            {p.icon}
            {p.title}
          </button>
        ))}
      </section>

      <hr className="border-white/10" />
      <section className="bg-[#171819] h-5" />
    </div>
  );
}