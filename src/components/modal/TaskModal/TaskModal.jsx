import { useContext, useMemo, useState } from "react";
import { useProjects } from "../../../hooks/useProjects";
import { ModalContext } from "../ModalProvider";
import { PopoverProvider } from "../../../context/PopoverProvider";

import { TASK_PRIORITIES } from "../../../constants/taskPriorities";

import TaskModalInfoSection from "./sections/taskModalInfoSection";
import TaskModalHeader from "./sections/taskModalHeader";
import TaskModalHeroSection from "./sections/taskModalHeroSection";
import TaskModalRightSection from "./sections/taskModalRightSection";
import TaskModalDescription from "./sections/taskModalDescription";

export default function TaskModal({ projectId, taskId }) {
  const { projectGroups, dispatch } = useProjects();
  const { closeModal } = useContext(ModalContext);
  const [commentText, setCommentText] = useState("");

  const group = projectGroups.find((g) =>
    g.projects.some((p) => p.id === projectId)
  );

  const project = projectGroups
    .flatMap((g) => g.projects)
    .find((p) => p.id === projectId);

  const task = useMemo(
    () => project?.tasks.find((t) => t.id === taskId),
    [project, taskId]
  );

  if (!task) return null;

  const formatted = new Date(task.id).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const priority =
    TASK_PRIORITIES.find((p) => p.key === task.priority) ||
    TASK_PRIORITIES.find((p) => p.key === "Low");

  const handleAddComment = () => {
  if (!commentText.trim()) return;

  dispatch({
    type: "ADD_TASK_COMMENT",
    payload: {
      projectId,
      taskId: task.id,
      text: commentText.trim(),
    },
  });

  setCommentText("");
};

  const handleDeleteComment = (commentId) => {
    dispatch({
      type: "DELETE_TASK_COMMENT",
      payload: {
        projectId,
        taskId: taskId,
        commentId: commentId,
      },
    });
  };

  return (
    <PopoverProvider>
      <div className="w-[100vw] max-w-[1400px] h-[92vh] flex flex-col rounded-2xl bg-[#0e0e0e] border border-white/[0.06] shadow-[0_40px_140px_rgba(0,0,0,0.85)] overflow-hidden text-white">

        <TaskModalHeader
          closeModal={closeModal}
          formatted={formatted}
          group={group}
          project={project}
          task={task}
        />

        <section className="flex flex-1 overflow-hidden">

          {/* LEFT */}
          <div className="w-3/5 p-8 flex flex-col gap-6 overflow-y-auto bg-[#0e0e0e]">

            <TaskModalHeroSection
              task={task}
              formatted={formatted}
              projectId={projectId}
              priority={priority}
            />

            <TaskModalInfoSection
              task={task}
              projectId={projectId}
            />

            <TaskModalDescription 
              task={task} 
              dispatch={dispatch}
              projectId={projectId} />

          </div>

          {/* RIGHT */}
          <TaskModalRightSection
            task={task}
            handleDeleteComment={handleDeleteComment}
            handleAddComment={handleAddComment}
            commentText={commentText}
            setCommentText={setCommentText}
          />

        </section>
      </div>
    </PopoverProvider>
  );
}