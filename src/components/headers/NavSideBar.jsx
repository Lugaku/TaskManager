import { NavLink } from "react-router-dom";
import { GoTasklist } from "react-icons/go";
import { IoStatsChart } from "react-icons/io5";

export default function NavSideBar() {
  const links = [
    { label: "Projects", path: "/", icon: <GoTasklist size={18} /> },
    { label: "Statistics", path: "/about", icon: <IoStatsChart size={18} /> },
  ];

  return (
    <aside
      className="
        w-14 h-full
        ml-2
        rounded-lg
        flex flex-col items-center
        py-4
        bg-[#232525]/20 
        backdrop-blur-xl
      "
    >
      {/* NAV */}
      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `
              w-11 h-11
              flex items-center justify-center
              rounded-xl
              transition-colors
              ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:bg-white/5 hover:text-white/80"
              }
            `
            }
          >
            {link.icon}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}