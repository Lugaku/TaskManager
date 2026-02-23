import { TbProgress } from "react-icons/tb";
import { RiProgress8Fill, RiProgress8Line } from "react-icons/ri";
import { RiProgress5Line } from "react-icons/ri";
import { RiProgress2Line } from "react-icons/ri";
import { RiProgress4Line } from "react-icons/ri";

export const TASK_STATUSES = [
  {
    key: "todo",
    title: "TO DO",
    icon: <TbProgress className=" text-sm" />,
    iconModal: <TbProgress className="text-sm" />,color: "bg-gray-800/50",
    bgColor: "bg-gray-800/10",
    bgColorLight: "bg-gray-600/60",
    blockColor: "bg-white/10",
    textColor: "text-gray-300/90"
  },
  {
    key: "planning",
    title: "PLANNING",
    icon: <RiProgress2Line className="text-sm" />,
    iconModal: <RiProgress2Line className="text-sm" />,    color: "bg-sky-900/50",
    bgColor: "bg-sky-900/10",
    bgColorLight: "bg-sky-600/60",
    blockColor: "bg-white/10",
    textColor: "text-sky-300/90"
  },
  {
    key: "inprogress",
    title: "IN PROGRESS",
    icon: <RiProgress4Line className=" text-sm"/>,
    iconModal: <RiProgress4Line className="text-sm" />,    color: "bg-blue-800/50",
    bgColor: "bg-blue-800/10",
    bgColorLight: "bg-blue-600/60",
    blockColor: "bg-white/10",
    textColor: "text-blue-300/90"
  },
  {
    key: "ready for rewiew",
    title: "READY FOR REVIEW",
    icon: <RiProgress5Line className=" text-sm" />,
    iconModal: <RiProgress5Line className="text-sm" />,
    color: "bg-purple-900/50",
    bgColor: "bg-purple-900/10",
    bgColorLight: "bg-purple-600/60",
    blockColor: "bg-white/10",
    textColor: "text-purple-300/90"
  },
  {
    key: "to QA",
    title: "DONE",
    icon: <RiProgress8Line className=" text-sm" />,
    iconModal: <RiProgress8Line className="text-sm" />,
    color: "bg-green-900/50",
    bgColor: "bg-green-900/10",
    bgColorLight: "bg-green-600/60",
    blockColor: "bg-white/10",
    textColor: "text-green-300/90"
  },
  
  
];