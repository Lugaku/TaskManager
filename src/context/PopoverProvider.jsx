import { createContext, useState, useRef, useEffect } from "react";

export const PopoverContext = createContext();

export function PopoverProvider({ children }) {
  const [popover, setPopover] = useState(null);
  const ref = useRef();

  const openPopover = (content, options = {}) => {
    setPopover({ content, options });
  };

  const closePopover = () => setPopover(null);

  // click outside для закрытия поповера
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) closePopover();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <PopoverContext.Provider value={{ openPopover, closePopover }}>
      {children}

      {popover && (
        <div
          ref={ref}
          className="absolute top-0 left-0 w-full h-full flex items-start justify-start pointer-events-none"
        >
          <div
            className="pointer-events-auto text-white rounded shadow-lg"
            style={{
              position: "absolute",
              top: popover.options.top,
              left: popover.options.left,
            }}
          >
            {popover.content}
          </div>
        </div>
      )}
    </PopoverContext.Provider>
  );
}