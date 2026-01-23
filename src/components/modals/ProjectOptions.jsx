import { useProjects } from "../../context/useProjects";
import { useState, useRef } from "react";
import { IoIosMore } from "react-icons/io";
import ProjectOptionsModal from "../modal/ProjectOptionsModal";
import { MdExpandMore } from "react-icons/md";

export default function ProjectOption({groupId, projectId}) {
  const { dispatch } = useProjects();
  const [rect, setRect] = useState(null);
  const btnRef = useRef(null);

  function handleDelete(projectId) {
    dispatch({ type: "DELETE_PROJECT", payload: { groupId, projectId} });
  }

  return (
    <div className="relative hover:bg-white/10  flex items-center justify-center p-0.5 rounded-sm">
      <button
        ref={btnRef}
        onClick={() => {
          const r = btnRef.current.getBoundingClientRect();
          setRect(r);
        }}
        className="text-white text-sm rounded-sm transition"
      >
        <MdExpandMore size={16} />
      </button>

      {rect && (
        <ProjectOptionsModal
          anchorRect={rect}
          projectId={projectId}
          onDelete={handleDelete}
          onClose={() => setRect(null)}
        />
      )}
    </div>
  );
}