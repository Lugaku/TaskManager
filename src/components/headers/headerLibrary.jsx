import { FiBell } from "react-icons/fi";
import { MdOutlineAddChart } from "react-icons/md";

export default function Header({ className = "" }) {

  return (
    <header
      className={`
        flex items-center pt-1 justify-between
        w-full h-10
        px-3
        bg-[#0A0F0F]/70
        backdrop-blur-xl
         border-white/10
        ${className}
      `}
    >
      <h1 className="text-sm tracking-[0.35em] uppercase text-white/50 select-none">
        Dev//State
      </h1>

      <div className="flex items-center gap-3">
        <section className="flex items-center gap-1">
          <div className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-white/70 cursor-pointer">
            <FiBell size={18} />
          </div>
          <div className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-white/70 cursor-pointer">
            <MdOutlineAddChart size={18} />
          </div>
        </section>

        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/60 text-sm">
          P
        </div>
      </div>
    </header>
  );
}