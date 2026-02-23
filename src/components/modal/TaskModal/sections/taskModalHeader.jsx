import { MdChecklist } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";


export default function TaskModalHeader({closeModal, formatted, group, project, task}){
    return(
        <section className="h-[50px] shrink-0 flex items-center justify-between gap-8 px-4 bg-[#0e0e0e] border border-white/10 rounded-t-lg">

          <div className="flex items-center gap-1 text-sm leading-none text-white/60">

            {/* Group */}
            <div className="flex items-center gap-2 min-w-0">
                <div className="w-5 h-5 flex items-center justify-center rounded-md bg-[#25678d] text-[11px] font-semibold text-white shrink-0">
                {group?.name?.[0]}
                </div>

                <span className="truncate">
                {group?.name}
                </span>
            </div>

            {/* Divider */}
            <IoIosArrowForward className="text-[14px] text-white/40 shrink-0 relative top-[0.5px]" />

            {/* Project */}
            <div className="flex items-center gap-1.5 min-w-0">
                <MdChecklist className="text-[20px] text-white/70 shrink-0 relative top-[0.5px]" />
                <span className="truncate text-white/80 font-medium">
                {project?.name}
                </span>
            </div>

            </div>

         

          <div className="flex items-center gap-6">
             <span className="px-2 py-2 text-xs text-white/40 bg-white/1 border border-white/5 hover:bg-white/10 rounded-md">
                  #{task.id}
                </span>
            <p className="text-sm text-white/50">Created: {formatted}</p>

            <button
              onClick={closeModal}
              className="p-1 rounded-full bg-white/10 text-white/50 hover:bg-white/20 hover:text-white/80 transition"
            >
              <IoClose className="text-lg" />
            </button>
          </div>
        </section>
    )
}