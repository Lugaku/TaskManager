// src/components/popovers/popoverContent/OptionsPopoverContent.jsx
import { MdDelete } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";

export default function OptionsPopoverContent({ task, onClose, onDelete }) {
  return (
    <div className="w-40 bg-[#28292a] border border-white/10 rounded-lg p-2 flex flex-col gap-1 shadow-xl z-[999]">
      <button
        onClick={() => { onDelete(task.id); onClose(); }}
        className="flex items-center gap-2 px-2 py-1 rounded text-sm hover:bg-white/10 text-white/70"
      >
        <MdDelete className="text-white/50 text-lg" /> Delete
      </button>

      <button
        onClick={() => { onClose(); }}
        className="flex items-center gap-2 px-2 py-1 rounded text-sm hover:bg-white/10 text-white/70"
      >
        <FaInfoCircle className="text-white/50" /> Info
      </button>
    </div>
  );
}