import { useState, useRef } from "react";
import StatusModal from "../modal/StatusModal";
import { TASK_STATUSES } from "../../constants/taskStatuses";

export default function TaskStatusSelector({ projectId, task }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = TASK_STATUSES.find((s) => s.key === task.status);

  return (
    <div className="relative w-full" ref={ref}>
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 px-2 py-2 w-full h-full rounded-sm text-white/70 text-sm transition"
      >
        {current.icon}
        {current.title}
      </button>

      {open && (
        <StatusModal
          task={task}
          projectId={projectId}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}