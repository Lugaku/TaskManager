import TaskItem from "./TaskItem";
import TaskAddInput from "./TaskAddInput";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";

export default function TaskGroup({ group, items, projectId, open, toggle }) {
  return (
    <div className="flex flex-col gap-2">

      {/* Заголовок */}
      <div className="flex justify-start items-center gap-2 text-white/60 text-sm px-4">
        <button
          onClick={toggle}
          className="flex items-center justify-center w-6 h-6 rounded-md hover:bg-white/10 transition"
        >
          {open ? (
            <IoMdArrowDropdown size={16} className="text-white/50" />
          ) : (
            <IoMdArrowDropright size={16} className="text-white/50" />
          )}
        </button>

        <p
          className={`${group.color} flex items-center justify-center gap-2 px-2 h-6 rounded-md hover:brightness-110 transition`}
        >
          {group.icon}
          {group.title}
        </p>

        <p>{items.length}</p>
      </div>

      {/* Таски */}
      {open && (
        <div className="flex flex-col">

          {/* Хедер колонок на grid */}
          <div className="grid grid-cols-[3.2fr_1fr_1fr_1fr_1fr] items-center px-12 text-white/50 text-sm h-10">
            <div className="flex items-center gap-3 min-w-0">
              <p>Name</p>
            </div>

            <div className="flex items-center justify-start">
              <p className="text-center w-full flex justify-start">Due Date</p>
            </div>

            <div className="flex items-center justify-start">
              <p className="text-center w-full flex justify-start">Priority</p>
            </div>

            <div className="flex items-center justify-start">
              <p className="text-center w-full flex justify-start">Status</p>
            </div>

            

            {/* Extra column для grid alignment */}
            
          </div>

          {/* Список тасок */}
          {items.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              group={group}
              projectId={projectId}
            />
          ))}

          {/* Добавление новой таски */}
          <TaskAddInput group={group} projectId={projectId} />
        </div>
      )}
    </div>
  );
}