import { MdDelete } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";

export default function DescriptionPopoverContent({ task, onClose, setEditing }) {

  function HandleEdit(){
    setEditing()
    onClose()
  }

  return (
    <div className="w-52 bg-[#1b1c1d] border border-white/10 rounded-lg flex flex-col shadow-xl z-[999]">
      
      <section className="flex flex-col gap-1 p-4">
        <p className="text-white/40 text-xs pb-2">Description Options</p>
        <div className="flex flex-col gap-1">
          <button
            onClick={HandleEdit}
            className="flex items-center gap-4 rounded text-sm hover:bg-white/10 transition text-white/90 p-1"
          >
            <MdDelete className="text-white/50 text-lg" /> Edit
          </button>

          <button
            onClick={() => { onClose(); }}
            className="flex items-center gap-4 rounded text-sm hover:bg-white/10 transition text-white/90 p-1"
          >
            <FaInfoCircle className="text-white/50 text-lg" /> Info
          </button>
        </div>
      </section>

      <hr className="border-white/10" />

      <section className="bg-[#171819] h-5"></section>

    </div>
  );
}