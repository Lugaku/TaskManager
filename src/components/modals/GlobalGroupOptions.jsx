import { useState, useRef } from "react";
import { useProjects } from "../../context/useProjects";
import { IoIosMore } from "react-icons/io";
import GlobalGroupOptionsModal from "../modal/GlobalGroupOptionsModal";

export default function GlobalGroupOptions({ groupId}) {
  const [rect, setRect] = useState(null);
  const btnRef = useRef(null);
  const { dispatch } = useProjects();

   function handleDelete(groupId) {
    dispatch({ type: "DELETE_GROUP", payload: { groupId } });
  }

  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={() => {
          const r = btnRef.current.getBoundingClientRect();
          setRect(r);
        }}
        className="text-white hover:bg-white/20 p-1 rounded-sm transition"
      >
        <IoIosMore />
      </button>

      {rect && (
        <GlobalGroupOptionsModal
          anchorRect={rect}
          groupId={groupId}
          onDelete={handleDelete}
          onClose={() => setRect(null)}
        />
      )}
    </div>
  );
}