import { MdDelete } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";

export default function OptionsPopover({
  onDelete,
  onInfo,
}) {
  return (
    <div className="bg-[#1c1f22] border border-white/10 rounded-lg p-2 w-36 flex flex-col gap-1">
      <button
        onClick={onDelete}
        className="flex items-center gap-2 px-2 py-1 rounded text-sm hover:bg-white/10 text-white/70"
      >
        <MdDelete className="text-white/50 text-lg" />
        Delete
      </button>

      {onInfo && (
        <button
          onClick={onInfo}
          className="flex items-center gap-2 px-2 py-1 rounded text-sm hover:bg-white/10 text-white/70"
        >
          <FaInfoCircle className="text-white/50 text-lg" />
          Info
        </button>
      )}
    </div>
  );
}