import { useRef, useContext } from "react";
import { IoIosMore } from "react-icons/io";

import { useProjects } from "../../../context/useProjects";
import { PopoverContext } from "../../../context/PopoverProvider";

import OptionsPopover from "../popoverContent/OptionsPopover";

export default function GlobalGroupOptions({ groupId }) {
  const { dispatch } = useProjects();
  const { openPopover, closePopover } = useContext(PopoverContext);
  const btnRef = useRef(null);

  return (
    <button
      ref={btnRef}
      onClick={() => {
        const r = btnRef.current.getBoundingClientRect();

        openPopover(
          <OptionsPopover
            onDelete={() => {
              dispatch({
                type: "DELETE_GROUP",
                payload: { groupId },
              });
              closePopover();
            }}
          />,
          {
            top: r.bottom + 4,
            left: r.right - 150,
          }
        );
      }}
      className="text-white hover:bg-white/20 p-1 rounded-sm transition"
    >
      <IoIosMore />
    </button>
  );
}