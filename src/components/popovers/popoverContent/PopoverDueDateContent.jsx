import { useContext, useState } from "react";
import { ProjectsContext } from "../../../context/ProjectsContext";
import { DayPicker, Month } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { b, style } from "framer-motion/client";

export default function PopoverDueDateContent({
  task,
  projectId,
  closePopover,
}) {
  const { dispatch } = useContext(ProjectsContext);
  const [hoverDate, setHoverDate] = useState(null); // для отображения результата на кнопке

  const DAY = 1000 * 60 * 60 * 24;

  const dateButton = "flex justify-between w-full hover:bg-white/10 text-left p-1 px-2 text-base rounded-lg"

  function addDays(days) {
    return new Date(Date.now() + days * DAY);
  }

  function setDueDate(date) {
    dispatch({
      type: "UPDATE_TASK_DUEDATE",
      payload: {
        projectId,
        taskId: task.id,
        dueDate: date ? date.getTime() : null,
      },
    });
    closePopover();
  }

  const buttons = [
    { label: "Today", getDate: () => new Date() },
    { label: "Tomorrow", getDate: () => addDays(1) },
    { label: "In 1 week", getDate: () => addDays(7) },
    { label: "In 1 month", getDate: () => {
        const d = new Date();
        d.setMonth(d.getMonth() + 1);
        return d;
      }
    },
  ];

  function formatDate(d) {
    return d.toLocaleDateString("en-GB"); // dd/mm/yyyy
  }

  return (
    <div className="bg-[#1b1c1d] border border-white/10 rounded-lg flex flex-col shadow-xl">
      <section className="flex gap-3 p-2">
        {/* Левая колонка */}
        <div className="flex flex-col items-start justify-start gap-1 text-sm w-50">
          {buttons.map(({ label, getDate }) => {
            const resultDate = getDate();
            return (
              <button
                key={label}
                className="w-full hover:bg-white/10 p-1 px-2 text-чы rounded-lg"
                onClick={() => setDueDate(resultDate)}
                >
                <div className="grid grid-cols-2 items-center">
                    {/* Левый столбец — текст кнопки */}
                    <span className="text-left">{label}</span>

                    {/* Правый столбец — вычисленная дата */}
                    <span className="text-right text-white/30 text-xs ">
                    {label === "Today" && resultDate.toLocaleDateString("en-US", { weekday: "short" })}
                    {label === "Tomorrow" && resultDate.toLocaleDateString("en-US", { weekday: "short" })}
                    {label === "In 1 week" && resultDate.toLocaleDateString("en-US", { day: "numeric", month: "short" })}
                    {label === "In 1 month" && resultDate.toLocaleDateString("en-US", { day: "numeric", month: "short" })}
                    </span>
                </div>
                </button>
  
            );
          })}
        </div>

        {/* Календарь */}
        <DayPicker
            animate
            className="bg-white/10 p-2 rounded-lg"
            classNames={{
                day: 'rounded-lg hover:bg-white/10',
                today: 'text-gray-900 font-semibold text-lg',
                selected: ' bg-white/50 hover:bg-white/45', 
            }}
            mode="single"
            selected={task.dueDate ? new Date(task.dueDate) : undefined}
            onSelect={setDueDate}
            />
      </section>
    </div>
  );
}

