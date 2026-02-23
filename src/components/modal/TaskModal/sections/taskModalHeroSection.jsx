import { IoFlagOutline, IoDocumentTextOutline } from "react-icons/io5";
import { TbProgressBolt } from "react-icons/tb";
import TaskTypeSelector from "../../../popovers/popoverButton/TaskType";

export default function TaskModalHeroSection({
  task,
  priority,
  projectId,
}) {

    const formattedDate = task.dueDate
  ? new Date(task.dueDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
  : null;

  return (
    // TaskModalHeroSection
<section className="relative flex flex-col gap-8  p-6 rounded-xl">
  <div className="flex items-start gap-5">
    <h1 className="
      flex-1
      text-[36px]
      font-semibold
      leading-[1.15]
      tracking-tight
      text-white
      drop-shadow-md
    ">
      {task.title}
    </h1>
  </div>

  <div className="flex flex-wrap gap-3 text-sm select-none">
    {[task.type, task.status, task.priority, formattedDate].map((v, i) => (
      <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/20 rounded-full text-white/90 shadow-sm">
        {i === 0 && <IoDocumentTextOutline />}
        {i === 1 && <TbProgressBolt />}
        {i === 2 && <IoFlagOutline />}
        {i === 3 && <IoDocumentTextOutline />}
        <span>{v}</span>
      </div>
    ))}
  </div>
</section>
  );
}