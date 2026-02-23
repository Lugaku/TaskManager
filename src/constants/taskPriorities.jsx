import { HiFlag } from "react-icons/hi";
import { GiSpeedometer } from "react-icons/gi";
import { SiSpeedtest } from "react-icons/si";

export const TASK_PRIORITIES = [
  {
    key: "Empty",
    title: "",
    icon: <SiSpeedtest className="text-white/50" />,
    textColor: "text-gray-400/70",
    bgColor: "bg-gray-500/90",
  },
  {
    key: "Low",
    title: "Low",
    icon: <SiSpeedtest className="text-white/90" />,
    textColor: "text-white/90",
    bgColor: "bg-white/90",
  },
  {
    key: "Normal",
    title: "Normal",
    icon: <SiSpeedtest className="text-blue-300/90" />,
    textColor: "text-blue-900/90",
    bgColor: "bg-blue-500/90",
  },
  {
    key: "High",
    title: "High",
    icon: <SiSpeedtest className="text-yellow-300/90" />,
    textColor: "text-yellow-300/90",
    bgColor: "bg-yellow-500/90",
  },
  {
    key: "Urgent",
    title: "Urgent",
    icon: <SiSpeedtest className="text-red-400/90" />,
    textColor: "text-red-400/90",
    bgColor: "bg-red-500/90",
  },
];