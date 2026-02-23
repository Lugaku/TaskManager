import { useRef } from "react";
import { MdExpandMore } from "react-icons/md";
import { CgOptions } from "react-icons/cg";

import { useProjects } from "../../../hooks/useProjects";
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
            top: r.bottom + 2,
            left: r.left,
          }
        );
      }}
      className="hover:bg-white/10 p-0.5 rounded-sm"
    >
      <CgOptions size={16} />
    </button>
  );
}