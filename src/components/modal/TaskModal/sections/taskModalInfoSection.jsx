import { IoFlagOutline } from "react-icons/io5";
import { TbProgressBolt } from "react-icons/tb";
import { BsCalendarDate } from "react-icons/bs";
import { MdOutlineTypeSpecimen } from "react-icons/md";
import { SiSpeedtest } from "react-icons/si";


import TaskStatusSelector from "../../../popovers/popoverButton/TaskStatusSelector";
import TaskPrioritySelector from "../../../popovers/popoverButton/TaskPrioritySelector";
import TaskDueDateSelector from "../../../popovers/popoverButton/TaskDueDateSelector";
import TaskTypeSelector from "../../../popovers/popoverButton/TaskType";

export default function TaskModalInfoSection({ projectId, task }) {
  // Массив секций
  const sections = [

    {
      key: "taskType",
      label: "TaskType",
      icon: <MdOutlineTypeSpecimen size={18} />,
      component: (
        <TaskTypeSelector
          projectId={projectId}
          task={task}
          mode="taskModal"
        />
      ),
    },
    {
      key: "status",
      label: "Status",
      icon: <TbProgressBolt size={18} />,
      component: (
        <TaskStatusSelector
          mode="taskModal"
          projectId={projectId}
          taskId={task.id}
        />
      ),
    },
    {
      key: "priority",
      label: "Priority",
      icon: <SiSpeedtest size={18} />,
      component: (
        <TaskPrioritySelector
          projectId={projectId}
          task={task}
          mode="taskModal"
        />
      ),
    },

    {
      key: "dueDate",
      label: "Duedate",
      icon: <BsCalendarDate size={18} />,
      component: (
        <TaskDueDateSelector
          projectId={projectId}
          task={task}
          mode="taskModal"
        />
      ),
    },

    

    // Если захотим, просто добавим сюда новые секции
    // { key: "assignee", label: "Assignee", icon: <IoPerson />, component: <TaskAssigneeSelector /> },
  ];

  return (
    <section className="px-6 py-6 grid gap-6  border-white/10 rounded-2xl shadow-lg backdrop-blur-sm">
  <div className="grid grid-cols-2 gap-x-8 gap-y-6">
    {sections.map((s) => (
      <div key={s.key} className="flex items-center justify-between group">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/20 text-white/80 shadow-sm">
            {s.icon}
          </div>
          <span className="text-sm font-medium tracking-wide text-white/70">
            {s.label}
          </span>
        </div>
        <div className="flex items-center gap-2 border border-white/20 rounded-lg text-white/90 font-medium text-sm hover:bg-white/10 hover:text-white transition relative shadow-inner">
          {s.component}
        </div>
      </div>
    ))}
  </div>
</section>
  );
}