import { TbProgress } from "react-icons/tb";
import { RiProgress8Fill, RiProgress8Line } from "react-icons/ri";
import { RiProgress5Line } from "react-icons/ri";
import { RiProgress2Line } from "react-icons/ri";
import { RiProgress4Line } from "react-icons/ri";

export const TASK_STATUSES = [
  {
    key: "todo",
    title: "To Do",
    icon: <TbProgress className="text-white/40 text-lg" />,
    color: "bg-gray-800/50",
    bgColor: "bg-gray-800/10",
    blockColor: "bg-white/10",
    textColor: "text-gray-300/50"
  },
  {
    key: "planning",
    title: "Planning",
    icon: <RiProgress2Line className="text-white/40 text-lg" />,
    color: "bg-sky-900/50",
    bgColor: "bg-sky-900/10",
    blockColor: "bg-white/10",
    textColor: "text-sky-300/50"
  },
  {
    key: "inprogress",
    title: "In Progress",
    icon: <RiProgress4Line className="text-white/40 text-lg"/>,
    color: "bg-blue-800/50",
    bgColor: "bg-blue-800/10",
    blockColor: "bg-white/10",
    textColor: "text-blue-300/50"
  },
  {
    key: "ready for rewiew",
    title: "Ready For Review",
    icon: <RiProgress5Line className="text-white/40 text-lg" />,
    color: "bg-purple-900/50",
    bgColor: "bg-purple-900/10",
    blockColor: "bg-white/10",
    textColor: "text-purple-300/50"
  },
  {
    key: "to QA",
    title: "Done",
    icon: <RiProgress8Line className="text-white/40 text-lg" />,
    color: "bg-green-900/50",
    bgColor: "bg-green-900/10",
    blockColor: "bg-white/10",
    textColor: "text-green-300/50"
  },
  
  
];