import TaskOptionsMenu from "../popovers/popoverButton/ListOptionsMenu";
import TaskPrioritySelector from "../popovers/popoverButton/ListPrioritySelector";

export default function TaskBoardOptionsMenu({ projectId, task }) {

  return (
    <div className="absolute top-1 right-1 bg-[#1c1f22] justify-center items-center border border-white/10 rounded-sm p-1 flex flex-row gap-1">
      <div className="w-24">
        <TaskPrioritySelector task={task} projectId={projectId} />
      </div>

      <TaskOptionsMenu task={task} projectId={projectId} />
    </div>
  );
}