import { useState } from "react";
import { useProjects } from "../../hooks/useProjects";
import { IoAddOutline } from "react-icons/io5";

export default function TaskAddInput({ group, projectId }) {
  const { dispatch } = useProjects();

  const [adding, setAdding] = useState(false);
  const [localTitle, setLocalTitle] = useState("");
  const [ignoreBlur, setIgnoreBlur] = useState(false);

  const handleAdd = () => {
    if (!localTitle.trim()) return;
    dispatch({
      type: "ADD_TASK",
      payload: {
        projectId,
        title: localTitle,
        status: group.key,
        priority: "Empty",
      },
    });
    setLocalTitle("");
    setAdding(false);
  };

  return (
    <div className="relative">
      {/* Абсолютная линия */}
      <div className="absolute top-0 left-12 right-16 h-[1px] bg-white/10" />

      {/* Общий grid как у TaskItem */}
      <div className="grid grid-cols-[1fr_0.5fr_0.5fr_0.5fr_auto] items-center h-10 px-24 hover:bg-white/5 cursor-pointer rounded">
        {/* Name column */}
        <div className="flex items-center gap-3 min-w-0">
          <IoAddOutline className={`text-sm ${adding ? "text-white/40" : "text-white/50"}`} />
          {!adding ? (
            <button
              onClick={() => setAdding(true)}
              className="text-sm text-white/50 text-left flex-1"
            >
              Add new task...
            </button>
          ) : (
            <input
              autoFocus
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              placeholder="New task"
              className="flex-1 bg-transparent text-white text-sm outline-none"
              onBlur={() => {
                if (ignoreBlur) {
                  setIgnoreBlur(false);
                  return;
                }
                setAdding(false);
                setLocalTitle("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAdd();
              }}
            />
          )}
        </div>

        {/* Priority column — пусто */}
        <div className="flex items-center justify-start"></div>

        {/* Status column — кнопка Add при добавлении */}
        <div className="flex items-center justify-start">
          {adding && (
            <button
              onMouseDown={() => setIgnoreBlur(true)}
              onClick={handleAdd}
              className="px-3 py-[3px] bg-white/80 text-black text-xs rounded hover:bg-white"
            >
              Add
            </button>
          )}
        </div>

        {/* Options column — пусто */}
        <div></div>

        {/* Extra column — оставляем пустой для grid alignment */}
        <div></div>
      </div>
    </div>
  );
}