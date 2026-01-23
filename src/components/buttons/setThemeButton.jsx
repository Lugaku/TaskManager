import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { BiSolidColor } from "react-icons/bi";

export default function Header() {
  const [openColors, setOpenColors] = useState(false);
  const { theme, setCurrentTheme, themes, currentTheme } =
    useContext(AppContext);

  function OpenColors() {
    setOpenColors(true);
  }

  function CloseColors() {
    setOpenColors(false);
  }

  return (
    <div
      onMouseEnter={OpenColors}
      onMouseLeave={CloseColors}
      className="relative p-4 flex flex-row justify-center items-center gap-3"
    >
      {/* Список тем */}
      <AnimatePresence>
        {openColors && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-row gap-2 items-center justify-center"
          >
            {Object.keys(themes)
                .filter((key) => key !== currentTheme)
                .map((key) => (
                    <motion.div
                    key={key}
                    onClick={() => setCurrentTheme(key)}
                    whileHover={{ scale: 1.1 }}
                    className={`${themes[key].accentBg} w-8 h-8 rounded-full border-dashed border-2 border-black opacity-50 hover:opacity-100 cursor-pointer
                                flex justify-center items-center`}
                    >
                    <BiSolidColor color="black" size={32} />
                    </motion.div>
                ))}
              
          </motion.div>
        )}
      </AnimatePresence>

      {/* Текущая тема */}
      <div
        className={`
            ${theme.accentBg} w-10 h-10 rounded-full border-dashed border-2 border-black
            flex justify-center items-center
            shadow-lg
            text-lg text-white
            transition-all duration-300
            ${openColors ? "rotate-360 scale-105" : ""}
        `}
        >
        <BiSolidColor color="black" size={40}/>
        </div>
    </div>
  );
}