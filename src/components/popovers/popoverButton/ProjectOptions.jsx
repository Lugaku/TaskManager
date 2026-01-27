import { useRef } from "react";
import { MdExpandMore } from "react-icons/md";

import { useProjects } from "../../../context/useProjects";
import { useContext } from "react";
import { PopoverContext } from "../../../context/PopoverProvider";

import OptionsPopover from "../popoverContent/OptionsPopover";

export default function ProjectOption({ groupId, projectId }) {
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
                type: "DELETE_PROJECT",
                payload: { groupId, projectId },
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
      className="hover:bg-white/10 p-0.5 rounded-sm"
    >
      <MdExpandMore size={16} />
    </button>
  );
}