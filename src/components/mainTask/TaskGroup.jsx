import TaskItem from "./TaskItem";
import TaskAddInput from "./TaskAddInput";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";


export default function TaskGroup({ group, items, projectId, open, toggle }) {
  return (
    <div className="flex flex-col gap-2">

      {/* Заголовок */}
      <div className="flex justify-start items-center gap-2 text-white/60 text-sm px-8">

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
        <div className="flex flex-col ">

          {/* Хедер колонок */}
          <div className="flex flex-row pl-16 pr-24 mb-2 text-white/50 text-sm">
            <div className="flex items-center gap-3 mr-6 w-4/10">
              <p>Name</p>
            </div>
            <div className="w-2/10 flex items-center justify-start">
              <p className="text-center">Priority</p>
            </div>
            <div className="w-2/10 flex items-center justify-start">
              <p className="text-center">Status</p>
              </div>
            
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