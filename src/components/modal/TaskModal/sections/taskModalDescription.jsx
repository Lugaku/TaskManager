import { IoDocumentTextOutline } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import TaskOptionsMenu from "../../../popovers/popoverButton/TaskOptionsMenu";

export default function TaskModalDescription({ task, dispatch, projectId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [descValue, setDescValue] = useState(task?.description || "");
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setDescValue(task?.description || "");
  }, [task]);

  // Закрытие при клике вне блока
  useEffect(() => {
    function handleClickOutside(e) {
      if (isEditing && containerRef.current && !containerRef.current.contains(e.target)) {
        setIsEditing(false);
        setDescValue(task?.description || "");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEditing, task]);

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_TASK_DESCRIPTION',
      payload: { projectId, taskId: task.id, description: descValue }
    });
    setIsEditing(false);
  };

  // Кнопка "Add description"
  if (!task?.description && !isEditing) {
    return (
      <section className="py-2 border-y border-white/10">
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 flex w-full items-center gap-2 text-sm text-white/50 rounded-md hover:text-white/90 hover:bg-white/10 transition shadow-sm"
        >
          <IoDocumentTextOutline />
          Add description
        </button>
      </section>
    );
  }

  // Блок с описанием + кнопка Edit при hover
  if (!isEditing) {
    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="p-3 border border-white/10 rounded-md bg-white/2 flex flex-col gap-2 shadow-inner relative"
      >
        <p className="text-white/90 text-sm">{task.description}</p>
        <button
          className={`absolute top-1 right-1 text-sm bg-white/5 rounded-md hover:bg-white/20 transition ${hovered ? "opacity-100" : "opacity-0"}`}
        //   onClick={() => setIsEditing(true)}
        >
                  <TaskOptionsMenu mode="forDesc" task={task} projectId={projectId} setIsEditing={setIsEditing}/>

        </button>
      </div>
    );
  }

  // Редактируемое поле
  return (
    <div
      className="p-3 flex flex-col gap-2  border border-white/40 rounded-md shadow-md backdrop-blur-sm"
      ref={containerRef}
    >
      <textarea
        value={descValue}
        onChange={(e) => setDescValue(e.target.value)}
        placeholder="Write a description..."
        className="h-20 resize-none bg-transparent text-sm text-white/90 outline-none p-2 rounded-md transition"
      />
      <button
        className="self-end px-4 py-1.5 text-sm bg-white/10 text-white/90 rounded-md hover:bg-white/20 hover:text-white font-medium transition"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
}