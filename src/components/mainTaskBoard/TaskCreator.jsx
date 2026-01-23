import { useState, useRef, useEffect } from "react";
import { useProjects } from "../../context/useProjects";
import { IoSaveOutline } from "react-icons/io5";

export default function TaskCreator({ onClose, group, projectId }) {
  const { dispatch } = useProjects();
  const [localTitle, setLocalTitle] = useState("");
  const containerRef = useRef(null);

  // — Добавление таски —
  function addTask() {
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
    onClose();
  }

  // — Сброс при клике вне —
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setLocalTitle("");
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-3 w-full h-30 bg-white/5 border border-white rounded-lg px-2 py-1 text-white/50 text-sm"
    >
      <div className="flex items-center gap-2">
        <input
          value={localTitle}
          onChange={(e) => setLocalTitle(e.target.value)}
          placeholder={`Task Name...`}
          className="
            w-full
            text-white/50 
            text-sm 
            rounded-lg
            px-1 py-1
            h-8
            placeholder:text-white/30
            placeholder:text-base
            outline-none
            border-none
            focus:border-none
            focus:ring-0
          "
        />
        <button
          onClick={addTask}
          className="
            flex items-center gap-1 px-2 py-1 
            bg-white/30 hover:brightness-110 
            rounded-md 
            text-white/50 text-xs
            transition
          "
        >
          Save
          <IoSaveOutline className="text-white/50" />
        </button>
      </div>
    </div>
  );
}