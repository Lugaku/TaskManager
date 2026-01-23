import { useEffect, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";

export default function GlobalGroupOptionsModal({
  anchorRect,
  onClose,
  onDelete,
  groupId
}) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!anchorRect) return null;

  return (
    <div
      ref={ref}
      className="fixed z-50 bg-[#1c1f22] border border-white/10 rounded-lg p-2 w-36 flex flex-col gap-1"
      style={{
        top: anchorRect.bottom + 4,
        left: anchorRect.right - 150,
      }}
    >
      <button
        onClick={() => {
          onDelete(groupId);
          onClose();
        }}
        className="flex items-center gap-2 px-2 py-1 rounded text-sm hover:bg-white/10 text-white/70"
      >
        <MdDelete className="text-white/50 text-lg" /> Delete
      </button>

      <button className="flex items-center gap-2 px-2 py-1 rounded text-sm hover:bg-white/10 text-white/70">
        <FaInfoCircle className="text-white/50 text-lg" /> Info
      </button>
    </div>
  );
}