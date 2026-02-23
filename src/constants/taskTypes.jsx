import { MdOutlineTask } from "react-icons/md";
import { RiBugFill } from "react-icons/ri";

export const TASK_TYPES = [
  {
    key: "Task",
    title: "Task",
    icon: <MdOutlineTask className="text-lg text-gray-400/70" />,
    textColor: "text-gray-400/70",
    line: "bg-gray-400/30",
  },
  {
    key: "Bug",
    title: "Bug",
    icon: <RiBugFill className="text-lg text-green-700/90" />,
    textColor: "text-white/90",
    line: "bg-green-700/30",
  },
];