import { useState } from "react";
import { useProjects } from "../../context/useProjects";
import { IoAddOutline } from "react-icons/io5";

export default function TaskAddInput({ group, projectId }) {
  const { dispatch } = useProjects();

  const [adding, setAdding] = useState(false);
  const [localTitle, setLocalTitle] = useState("");
  const [ignoreBlur, setIgnoreBlur] = useState(false);

  return (
    <div className="w-full relative">
      <div className="absolute top-0 left-16 right-16 h-[1px] bg-white/10" />

      {/* ОБЩИЙ GRID КАК У TASKITEM */}
      <div className="grid grid-cols-[1.3fr_1fr_1fr_1fr_0.7fr] pl-24 pr-24 py-2 hover:bg-white/5 rounded items-center h-10">

        {/* Name — ячейка первая */}
        {!adding ? (
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-3 text-white/50 w-full text-left"
          >
            <IoAddOutline className="text-lg" />
            <span className="text-sm">Add new task...</span>
          </button>
        ) : (
          <div className="flex items-center gap-3 w-full">
            <IoAddOutline className="text-sm text-white/40" />
            <input
              value={localTitle}
              autoFocus
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
                if (e.key === "Enter" && localTitle.trim()) {
                  dispatch({
                    type: "ADD_TASK",
                    payload: {
                      projectId,
                      title: localTitle,
                      status: group.key,
                    },
                  });
                  setLocalTitle("");
                  setAdding(false);
                }
              }}
            />
          </div>
        )}

        {/* Остальные колонки — пустые, чтобы сетка совпадала */}
        <div></div>
        <div></div>

        {/* Status column — сюда перемещаем кнопку Add */}
        <div className="flex items-center justify-center">
          {adding && (
            <button
              onMouseDown={() => setIgnoreBlur(true)}
              onClick={() => {
                if (!localTitle.trim()) return;

                dispatch({
                  type: "ADD_TASK",
                  payload: {
                    projectId,
                    title: localTitle,
                    status: group.key,
                  },
                });

                setLocalTitle("");
                setAdding(false);
              }}
              className="px-3 py-[3px] bg-white/80 text-black text-xs rounded hover:bg-white"
            >
              Add
            </button>
          )}
        </div>

        {/* Delete column — пустая */}
        <div></div>
      </div>
    </div>
  );
}